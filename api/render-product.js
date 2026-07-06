import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../project/data/products.js';
import { renderProductView } from '../project/render/product-render.js';

const SHELL_PATH = {
  en: 'product.shell.html',
  nl: 'nl/product.shell.html',
  fr: 'fr/product.shell.html',
};

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function jsonLdScript(obj) {
  // Escape "</" so the JSON payload can't prematurely close the surrounding <script> tag.
  return JSON.stringify(obj).replace(/<\//g, '<\\/');
}

function splice(shell, view) {
  let html = shell;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(view.title)}</title>`);

  html = html.replace(
    /<meta name="description" id="meta-description" content="[^"]*" \/>/,
    `<meta name="description" id="meta-description" content="${escapeAttr(view.metaDescription)}" />`
  );

  html = html.replace(
    /<link rel="canonical" id="canonical-link" href="[^"]*" \/>/,
    `<link rel="canonical" id="canonical-link" href="${escapeAttr(view.canonicalUrl)}" />`
  );

  for (const { hreflang, href } of view.hreflangLinks) {
    const re = new RegExp(`<link rel="alternate" hreflang="${hreflang}" id="hreflang-${hreflang}" href="[^"]*" />`);
    html = html.replace(re, `<link rel="alternate" hreflang="${hreflang}" id="hreflang-${hreflang}" href="${escapeAttr(href)}" />`);
  }

  html = html.replace(
    /<script type="application\/ld\+json" id="ld-json"><\/script>/,
    `<script type="application/ld+json" id="ld-json">${jsonLdScript(view.jsonLd[0])}</script>`
  );
  html = html.replace(
    /<script type="application\/ld\+json" id="ld-json-breadcrumb"><\/script>/,
    `<script type="application/ld+json" id="ld-json-breadcrumb">${jsonLdScript(view.jsonLd[1])}</script>`
  );

  html = html.replace(
    /<div class="crumbs" id="crumbs"><\/div>/,
    `<div class="crumbs" id="crumbs">${view.crumbsHtml}</div>`
  );

  html = html.replace(
    /<div id="pdp-root"><\/div>/,
    `<div id="pdp-root" data-ssr="true">${view.bodyHtml}</div>`
  );

  return html;
}

export default async function handler(req, res) {
  const lang = ['en', 'nl', 'fr'].includes(req.query.lang) ? req.query.lang : 'en';
  const key = req.query.p || '';

  const shellPath = path.join(process.cwd(), SHELL_PATH[lang]);
  const shell = fs.readFileSync(shellPath, 'utf-8');

  const product = PRODUCTS[lang][key];

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!product) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
    return res.status(404).send(shell);
  }

  const view = renderProductView(lang, PRODUCTS[lang], key);
  const html = splice(shell, view);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(html);
}
