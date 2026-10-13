import { readFileSync, writeFileSync } from 'node:fs';
const data = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url)));
const header = `/* GENERATED from tokens/tokens.json. Run npm run build:tokens. Do not edit. */\n@font-face { font-family: 'Vesper Libre'; font-style: normal; font-weight: 400; font-display: swap; src: url('./assets/fonts/vesper-libre-regular.ttf') format('truetype'); }\n@font-face { font-family: 'Vesper Libre'; font-style: normal; font-weight: 700; font-display: swap; src: url('./assets/fonts/vesper-libre-bold.ttf') format('truetype'); }\n:root {\n`;
const css = header + Object.entries(data.tokens).map(([k,v]) => `  --${k}: ${v};`).join('\n') + '\n}\n';
const dest = new URL('../colors_and_type.css', import.meta.url);
if (process.argv.includes('--check')) {
  if (readFileSync(dest, 'utf8') !== css) throw new Error('Token CSS is stale. Run npm run build:tokens.');
  console.log('Generated token CSS matches JSON.');
} else { writeFileSync(dest, css); console.log('Built colors_and_type.css'); }
