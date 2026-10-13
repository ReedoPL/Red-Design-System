// Optional visual/interaction check. Provide Playwright in the environment or install it separately.
import { createRequire } from 'node:module';
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..',import.meta.url));
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? resolve(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright') : 'playwright');
const browser = await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || chromium.executablePath(),args:['--no-sandbox',...JSON.parse(process.env.PLAYWRIGHT_CHROMIUM_ARGS||'[]')]});
const context = await browser.newContext({deviceScaleFactor:1});
const page = await context.newPage();
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const pages = ['kit','templates','components','preview'].flatMap(dir=>readdirSync(resolve(root,dir)).filter(n=>n.endsWith('.html')).map(n=>`${dir}/${n}`));
const problems=[];
page.on('pageerror',e=>problems.push(`Browser error: ${e.message}`));
page.on('response',r=>{if(r.status()>=400)problems.push(`HTTP ${r.status()}: ${r.url()}`);});
let checks=0;
for(const width of [320,375,768,1440]) {
  await page.setViewportSize({width,height:1000});
  for(const path of pages) {
    await page.goto(`${base}/${path}`); await page.evaluate(async()=>{await Promise.all([document.fonts.load('18px \"Vesper Libre\"'),document.fonts.load('700 20px \"Vesper Libre\"')]);await document.fonts.ready;});
    await page.evaluate(async()=>{for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
    const result=await page.evaluate(()=>{
      const broken=[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src);
      const contrast=[];
      for(const el of document.querySelectorAll('body *')) {
        if(el.closest('.red-artboard') || !el.getClientRects().length || ![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;
        const s=getComputedStyle(el),fg=s.color;
        let bg=''; for(let p=el;p;p=p.parentElement) { const c=getComputedStyle(p).backgroundColor; if(c!=='rgba(0, 0, 0, 0)') {bg=c;break;} }
        const red='rgb(206, 75, 56)',cream='rgb(253, 243, 230)';
        if((fg===red&&bg===cream)||(fg===cream&&bg===red)) {
          const size=parseFloat(s.fontSize),large=size>=24||(parseInt(s.fontWeight)>=700&&size>=18.667);
          if(!large)contrast.push({text:el.textContent.trim().slice(0,70),size,weight:s.fontWeight});
        }
      }
      return {overflow:document.documentElement.scrollWidth>innerWidth,broken,contrast,font:[...document.fonts].filter(f=>f.family==='Vesper Libre').map(f=>({weight:f.weight,status:f.status}))};
    });
    if(result.overflow)problems.push(`${path} @${width}: horizontal overflow`);
    if(result.broken.length)problems.push(`${path} @${width}: broken images ${result.broken.join(', ')}`);
    if(result.contrast.length)problems.push(`${path} @${width}: small red/cream text ${JSON.stringify(result.contrast)}`);
    if(path!=='templates/email.html' && !result.font.every(f=>f.status==='loaded'))problems.push(`${path} @${width}: font not loaded`);
    checks++;
  }
}
// Keyboard/mobile menu interaction.
await page.setViewportSize({width:375,height:900}); await page.goto(`${base}/kit/`);
const menu=page.locator('[data-menu-toggle]'); await menu.click();
if(await menu.getAttribute('aria-expanded')!=='true'||!await page.locator('#site-nav').isVisible())problems.push('Mobile menu did not open.');
await page.keyboard.press('Escape');
if(await menu.getAttribute('aria-expanded')!=='false'||await page.locator('#site-nav').isVisible())problems.push('Mobile menu did not close with Escape.');
await page.locator('summary').first().focus(); await page.keyboard.press('Enter');
if(!await page.locator('details').first().getAttribute('open').then(x=>x!==null))problems.push('FAQ did not open by keyboard.');
// Form error and honest demo-success state.
await page.goto(`${base}/templates/quote-page.html`); await page.getByRole('button',{name:'Try this demo'}).click();
if(await page.locator('#email').getAttribute('aria-invalid')!=='true'||!await page.locator('#email-error').isVisible())problems.push('Form error not associated/visible.');
await page.locator('#email').fill('example@example.com'); await page.getByRole('button',{name:'Try this demo'}).click();
if(!/not been saved or sent/.test(await page.locator('[role=status]').textContent()))problems.push('Form success misrepresents demo submission.');
// Focus and reduced motion.
await page.goto(`${base}/kit/`); await page.keyboard.press('Tab'); await page.locator('.red-btn--primary:visible').first().focus();
if(await page.locator('.red-btn--primary:visible').first().evaluate(e=>getComputedStyle(e).outlineStyle)==='none')problems.push('Focus indicator missing.');
await page.emulateMedia({reducedMotion:'reduce'});
if(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior)!=='auto')problems.push('Reduced motion not honoured.');
// No-JS navigation and FAQ remain accessible.
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});const np=await nojs.newPage();await np.goto(`${base}/kit/`);
if(!await np.locator('#site-nav').isVisible())problems.push('No-JS navigation unavailable.');
await np.locator('summary').first().click();if(await np.locator('details').first().getAttribute('open')===null)problems.push('No-JS FAQ unavailable.');// Keep this context open until browser.close(); single-process runners share a renderer.
// Screenshots and exact-size artboards.
mkdirSync(resolve(root,'qa/screenshots'),{recursive:true});
await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});await page.goto(`${base}/kit/`);await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:resolve(root,'qa/screenshots/kit-desktop.png'),fullPage:true});
await page.setViewportSize({width:375,height:900});await page.screenshot({path:resolve(root,'qa/screenshots/kit-mobile.png'),fullPage:true});
for(const n of ['slide','social-square','social-portrait','social-story']) {
  await page.setViewportSize({width:1500,height:2100});await page.goto(`${base}/templates/${n}.html`);await page.evaluate(()=>document.fonts.ready);
  await page.locator('.red-artboard').evaluate(el=>{el.style.width=el.dataset.exportWidth+'px';el.style.maxWidth='none';el.style.border='none';});
  await page.locator('.red-artboard').screenshot({path:resolve(root,`qa/screenshots/${n}.png`)});
  const box=await page.locator('.red-artboard').boundingBox(),dims=await page.locator('.red-artboard').evaluate(el=>[Number(el.dataset.exportWidth),Number(el.dataset.exportHeight)]);
  if(Math.abs(box.width-dims[0])>1||Math.abs(box.height-dims[1])>1)problems.push(`${n}: export geometry mismatch ${box.width}×${box.height}`);
}
const result={date:'2026-10-13',viewportChecks:checks,pages:pages.length,viewportWidths:[320,375,768,1440],problems};
writeFileSync(resolve(root,'qa/browser-results.json'),JSON.stringify(result,null,2));
await browser.close();console.log(JSON.stringify(result,null,2));if(problems.length)process.exit(1);
