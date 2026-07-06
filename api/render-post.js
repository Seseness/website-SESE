import fs from 'node:fs';
import path from 'node:path';
import { POSTS } from '../project/data/posts.js';
import { renderPostView } from '../project/render/post-render.js';

const SHELL_PATH = {
  en: 'blog-post.shell.html',
  nl: 'nl/blog-post.shell.html',
  fr: 'fr/blog-post.shell.html',
};

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function jsonLdScript(obj) {
  return JSON.stringify(obj).replace(/<\//g, '<\\/');
}

const HREFLANG_IDS = ['en', 'nl', 'fr', 'x-default'];

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

  if (view.hreflangLinks.length) {
    for (const { hreflang, href } of view.hreflangLinks) {
      const re = new RegExp(`<link rel="alternate" hreflang="${hreflang}" id="hreflang-${hreflang}" href="[^"]*" />`);
      html = html.replace(re, `<link rel="alternate" hreflang="${hreflang}" id="hreflang-${hreflang}" href="${escapeAttr(href)}" />`);
    }
  } else {
    for (const hreflang of HREFLANG_IDS) {
      const re = new RegExp(`\\s*<link rel="alternate" hreflang="${hreflang}" id="hreflang-${hreflang}" href="[^"]*" />\\n?`);
      html = html.replace(re, '');
    }
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
    /<span class="current" id="breadcrumb-title">[^<]*<\/span>/,
    `<span class="current" id="breadcrumb-title">${escapeAttr(view.breadcrumbTitle)}</span>`
  );

  html = html.replace(
    /<article id="article-container"><\/article>/,
    `<article id="article-container" data-ssr="true">${view.articleHtml}</article>`
  );

  html = html.replace(
    /<div class="related-section" id="related-section"><\/div>/,
    `<div class="related-section" id="related-section">${view.relatedHtml}</div>`
  );

  return html;
}

export default async function handler(req, res) {
  const lang = ['en', 'nl', 'fr'].includes(req.query.lang) ? req.query.lang : 'en';
  const id = parseInt(req.query.p, 10);

  const shellPath = path.join(process.cwd(), SHELL_PATH[lang]);
  const shell = fs.readFileSync(shellPath, 'utf-8');

  const langPosts = POSTS[lang];
  const post = langPosts.find(p => p.id === id) || langPosts.find(p => p.id === 1);

  const view = renderPostView(lang, post, langPosts);
  const html = splice(shell, view);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(html);
}
