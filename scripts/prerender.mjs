/**
 * Renders every route to static HTML after `vite build`, so the page paints
 * real content before any JavaScript runs (fast LCP, crawlable copy).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://upgradevision.ai';

let template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

// Inline the stylesheet: one less render-blocking request before first paint.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await fs.readFile(path.join(dist, cssLink[1]), 'utf8');
  template = template.replace(cssLink[0], () => `<style>${css}</style>`);
}
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const routes = [
  { url: '/', out: ['index.html'] },
  { url: '/work', out: ['work.html', 'work/index.html'] },
  { url: '/bg', out: ['bg.html', 'bg/index.html'] },
  { url: '/bg/work', out: ['bg/work.html', 'bg/work/index.html'] },
  { url: '/privacy', out: ['privacy.html', 'privacy/index.html'] },
  { url: '/bg/privacy', out: ['bg/privacy.html', 'bg/privacy/index.html'] },
  { url: '/404', out: ['404.html'], noindex: true },
];

// The Bulgarian copy is its own chunk: announce it so hydration isn't kept waiting.
const assets = await fs.readdir(path.join(dist, 'assets'));
const bgChunk = assets.find((f) => /^bg-[\w-]+\.js$/.test(f));
const stairsChunk = assets.find((f) => /^stairs-[\w-]+\.js$/.test(f));

for (const r of routes) {
  const { html, meta } = render(r.url);
  let page = template
    .replace('<div id="root">', `<div id="root" data-route="${r.url}">`)
    .replace('<!--app-html-->', html);
  if (meta) {
    const url = SITE + (meta.path === '/' ? '/' : meta.path);
    page = page
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
    const bg = meta.path === '/bg' || meta.path.startsWith('/bg/');
    const enPath = bg ? meta.path.replace(/^\/bg/, '') || '/' : meta.path;
    const bgPath = enPath === '/' ? '/bg' : `/bg${enPath}`;
    page = page
      .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${SITE}${enPath}$2`)
      .replace(/(<link rel="alternate" hreflang="bg" href=")[^"]*(")/, `$1${SITE}${bgPath}$2`)
      .replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${SITE}${enPath}$2`);
    if (bg) {
      page = page
        .replace('<html lang="en">', '<html lang="bg">')
        .replace(/(<meta property="og:locale" content=")[^"]*(")/, '$1bg_BG$2')
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
        .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
        .replace('href="/fonts/inter-tight.woff2"', 'href="/fonts/inter-tight-cyrillic.woff2"')
        .replace('href="/fonts/instrument-serif-italic.woff2"', 'href="/fonts/serif-italic-cyrillic.woff2"')
        .replace(/og\.jpg/g, 'og-bg.jpg')
        .replace('>Skip to content<', '>Към съдържанието<');
      if (bgChunk) page = page.replace('</head>', `<link rel="modulepreload" href="/assets/${bgChunk}" crossorigin /></head>`);
    }
  }
  // The home page paints its headline at once; the staircase is fetched alongside.
  if ((r.url === '/' || r.url === '/bg') && stairsChunk) {
    page = page.replace('</head>', `<link rel="modulepreload" href="/assets/${stairsChunk}" crossorigin /></head>`);
  }
  if (r.noindex) {
    page = page
      .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex" />')
      .replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '');
  }
  for (const out of r.out) {
    const file = path.join(dist, out);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, page);
  }
  console.log(`prerendered ${r.url} → ${r.out.join(', ')} (${(page.length / 1024).toFixed(1)} KB)`);
}

await fs.rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
