import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const port = Number(process.env.PORT || 3000);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.png':'image/png', '.pdf':'application/pdf', '.ttf':'font/ttf' };
createServer(async (req,res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!(file === root || file.startsWith(root + sep))) throw new Error('Outside root');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    if (!['.html','.css','.js','.json','.png','.pdf','.ttf'].includes(extname(file))) throw new Error('Not a preview file');
    res.writeHead(200, { 'Content-Type': types[extname(file)] }); res.end(await readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Red kit: http://127.0.0.1:${port}/kit/ | Catalogue: http://127.0.0.1:${port}/preview/`));
