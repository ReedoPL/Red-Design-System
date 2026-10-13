import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };
const walk = dir => readdirSync(dir).flatMap(n => {
  if (['.git', 'node_modules', 'screenshots'].includes(n)) return [];
  const p = resolve(dir,n); return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk(root);
const data = JSON.parse(readFileSync(resolve(root,'tokens/tokens.json')));
const tokens = data.tokens;
for (const [key,value] of Object.entries(tokens)) {
  for (const match of value.matchAll(/var\(--([\w-]+)\)/g)) check(match[1] in tokens, `Undefined token alias: ${key} -> ${match[1]}`);
}
for (const [key,value] of Object.entries({'color-red':'#ce4b38','color-cream':'#fdf3e6','color-ink':'#271d1d','font-weight-regular':'400','font-weight-bold':'700'})) check(tokens[key] === value, `Sourced token changed without new evidence: ${key}`);
check(tokens['font-primary'].startsWith("'Vesper Libre'"), 'Brand font must be Vesper Libre.');
check(tokens['font-size-button'] === '1.25rem', 'Default accessible CTA is 20px bold.');
for (const entry of data.restrictedPalette) check(!Object.values(tokens).includes(entry.value), `Restricted palette exported: ${entry.value}`);
const manifest = JSON.parse(readFileSync(resolve(root,'assets/manifest.json'))).assets;
const seen = new Set();
for (const asset of manifest) {
  check(!seen.has(asset.id), `Duplicate asset ID: ${asset.id}`); seen.add(asset.id);
  const p = resolve(root,asset.path);
  if (!existsSync(p)) { errors.push(`Missing asset ${asset.path}`); continue; }
  const bytes=readFileSync(p);
  check(createHash('sha256').update(bytes).digest('hex') === asset.sha256, `Original bytes changed: ${asset.path}`);
  check(bytes.length === asset.bytes, `Asset size differs: ${asset.path}`);
  check(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `Not a PNG: ${asset.path}`);
  check(bytes.readUInt32BE(16) === asset.width && bytes.readUInt32BE(20) === asset.height, `PNG dimensions differ: ${asset.path}`);
}
check(manifest.length === 28, 'Expected all 28 supplied PNG originals.');
const assetByPath = new Map(manifest.map(a=>[resolve(root,a.path),a]));
const htmlFiles = files.filter(p=>extname(p)==='.html');
const cssFiles = files.filter(p=>extname(p)==='.css');
const decode = s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"');
function localTarget(value,from) {
  if (/^(https?:|mailto:|tel:|data:)/.test(value)) return null;
  const [name, hash] = decode(value).split('#');
  return {file:name ? resolve(dirname(from),decodeURIComponent(name.split('?')[0])) : from,hash};
}
for (const file of htmlFiles) {
  const s=readFileSync(file,'utf8');
  check(/<html\s+lang="en-GB"/.test(s), `Missing British language: ${relative(root,file)}`);
  const ids = [...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  check(new Set(ids).size===ids.length, `Duplicate HTML IDs: ${relative(root,file)}`);
  let count=0;
  for (const m of s.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target=localTarget(m[1],file); if (!target) continue;
    check(existsSync(target.file), `Broken local reference ${relative(root,file)} -> ${m[1]}`);
    if (target.hash && existsSync(target.file)) check(readFileSync(target.file,'utf8').includes(`id="${target.hash}"`), `Missing anchor ${relative(root,file)} -> ${m[1]}`);
  }
  for (const m of s.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    const target=localTarget(m[1],file); const asset=target && assetByPath.get(target.file);
    if (asset?.countsAsMascot) count++;
    check(/\balt="[^"]*"/.test(m[0]), `Missing image alt: ${relative(root,file)}`);
    check(/\bwidth="\d+"/.test(m[0]), `Missing image width: ${relative(root,file)}`);
  }
  if (!s.includes('data-asset-catalogue')) check(count<=1, `More than one mascot composition: ${relative(root,file)}`);
  const inlineStyles=[...s.matchAll(/\bstyle="([^"]*)"/g)].map(m=>m[1]).join(' ') + [...s.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join(' ');
  check(!/#(?:f9d5cb|5d71ab)\b/i.test(inlineStyles), `Restricted palette in HTML: ${relative(root,file)}`);
  if (file !== resolve(root,'templates/email.html')) check(!/#[a-f\d]{3,8}\b/i.test(inlineStyles), `Hardcoded UI colour in ${relative(root,file)}`);
}
for (const file of cssFiles) {
  const s=readFileSync(file,'utf8');
  const inlineStyles=[...s.matchAll(/\bstyle="([^"]*)"/g)].map(m=>m[1]).join(' ') + [...s.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join(' ');
  check(!/#(?:f9d5cb|5d71ab)\b/i.test(inlineStyles), `Restricted CSS palette: ${relative(root,file)}`);
  if (file!==resolve(root,'colors_and_type.css')) check(!/#[a-f\d]{3,8}\b|rgba?\(|hsla?\(/i.test(s), `Hardcoded colour outside token CSS: ${relative(root,file)}`);
  for (const m of s.matchAll(/var\(--([\w-]+)\)/g)) check(m[1] in tokens, `Undefined CSS token ${m[1]} in ${relative(root,file)}`);
  for (const m of s.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
    const target=localTarget(m[1],file); if(target) check(existsSync(target.file), `Broken CSS resource: ${m[1]}`);
  }
}
for (const file of files.filter(p=>extname(p)==='.md')) {
  const s=readFileSync(file,'utf8');
  for (const m of s.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target=localTarget(m[1],file); if (target) check(existsSync(target.file), `Broken documentation link ${relative(root,file)} -> ${m[1]}`);
  }
}
for(const n of ['regular','bold']) {
  const bytes=readFileSync(resolve(root,`assets/fonts/vesper-libre-${n}.ttf`));
  check(bytes.readUInt32BE(0)===0x00010000, `Invalid TrueType file: ${n}`);
}
function luminance(hex) { return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0); }
function ratio(a,b) { const [lo,hi]=[luminance(a),luminance(b)].sort((x,y)=>x-y); return (hi+.05)/(lo+.05); }
check(ratio(tokens['color-ink'],tokens['color-cream']) >= 4.5,'Body contrast is below AA.');
check(ratio(tokens['color-red'],tokens['color-cream']) >= 3,'Large CTA contrast is below AA.');
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${htmlFiles.length} HTML pages, ${cssFiles.length} CSS files, ${manifest.length} original assets, local references, mascot limits and contrast rules.`);
