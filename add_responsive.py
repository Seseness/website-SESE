#!/usr/bin/env python3
import re

BASE = '/Users/noi/Desktop/website-SESE'

# ─── sese-homepage.html ───────────────────────────────────────────────────────
HOMEPAGE_CSS = """
    /* ══════════════════════════════════════════
       RESPONSIVE — Mid Tablet (≤ 768px)
    ══════════════════════════════════════════ */
    @media (max-width: 768px) {
      .nav { padding: 16px 20px; grid-template-columns: 1fr auto; }
      .nav-center { display: none; }
      .hero { height: 480px; }
      .hero h1 { font-size: 42px; }
      .usps { grid-template-columns: repeat(2, 1fr); }
      .forever { grid-template-columns: 1fr; }
      .journal { grid-template-columns: 1fr; }
      .journal-body { padding: 20px 0 0; }
      .foot-top { grid-template-columns: 1fr; }
      .foot-divider { display: none; }
      .foot-bot { flex-direction: column; align-items: flex-start; gap: 14px; }
    }

    /* ══════════════════════════════════════════
       RESPONSIVE — Phone (≤ 480px)
    ══════════════════════════════════════════ */
    @media (max-width: 480px) {
      .hero { height: 380px; }
      .hero .content { padding: 48px 24px 80px; }
      .hero h1 { font-size: 32px; }
      .usps { grid-template-columns: 1fr; }
      .carousel-track { grid-template-columns: repeat(9, 220px); }
      .card { min-width: 220px; }
      .forever { padding: 32px 20px; grid-template-columns: 1fr; }
      .rituals { grid-template-columns: 1fr; }
      .about { grid-template-columns: 1fr; padding: 32px 20px; }
      .certs-scroller { gap: 16px; }
      .cert-badge { font-size: 11px; padding: 8px 14px; }
    }

    /* ══════════════════════════════════════════
       RESPONSIVE — Small Phone (≤ 375px)
    ══════════════════════════════════════════ */
    @media (max-width: 375px) {
      .hero h1 { font-size: 28px; }
      .hero { height: 340px; }
      .carousel-track { grid-template-columns: repeat(9, 190px); }
      .card { min-width: 190px; }
      .wordmark { font-size: 16px; }
    }
"""

# ─── collection.html ─────────────────────────────────────────────────────────
COLLECTION_CSS = """
    /* ── Responsive 768px ── */
    @media (max-width: 768px) {
      .filter-bar { flex-wrap: wrap; padding: 16px 20px; gap: 8px; }
      .page-title { padding: 48px 20px 32px; }
      .page-title h1 { font-size: 48px; }
      .product-grid { grid-template-columns: repeat(2, 1fr); }
      .bundle-grid { grid-template-columns: 1fr; }
    }

    /* ── Responsive 480px ── */
    @media (max-width: 480px) {
      .product-grid { grid-template-columns: 1fr; }
      .products-section { padding: 32px 16px; }
      .bundles-section { padding: 0 16px 48px; }
      .page-title h1 { font-size: 36px; }
      .filter-pill { font-size: 11px; padding: 6px 12px; }
    }

    /* ── Responsive 375px ── */
    @media (max-width: 375px) {
      .page-title h1 { font-size: 30px; }
      .nav { padding: 14px 16px; }
    }
"""

# ─── product.html ─────────────────────────────────────────────────────────────
PRODUCT_CSS = """
    @media (max-width: 1024px) {
      .pdp { grid-template-columns: 360px 1fr; gap: 40px; padding: 24px 32px 0; }
      .gallery { grid-template-columns: 56px 1fr; }
    }

    @media (max-width: 480px) {
      .pdp { padding: 20px 20px 0; }
      .gallery { grid-template-columns: 1fr; }
      .main-img { aspect-ratio: 1/1; }
      .thumb { width: 64px; height: 64px; }
      .thumbs { flex-direction: row; gap: 8px; }
      .buy h1 { font-size: 36px; }
      .buy { padding: 0 20px; }
      .routine-strip { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .routine-strip .steps { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .pair-grid { grid-template-columns: 1fr; }
      .crumbs { padding: 12px 20px 0; }
    }

    @media (max-width: 375px) {
      .buy h1 { font-size: 30px; }
      .thumb { width: 56px; height: 56px; }
    }
"""

# ─── cart.html ────────────────────────────────────────────────────────────────
CART_CSS = """
    @media (max-width: 480px) {
      .cart-item { grid-template-columns: 72px 1fr auto; gap: 12px; }
      .cart-summary { padding: 24px 20px; }
      .cart-wrap h1 { font-size: 36px; }
      .cart-wrap { padding: 32px 20px 60px; }
    }

    @media (max-width: 375px) {
      .cart-wrap h1 { font-size: 28px; }
      .cart-item { grid-template-columns: 60px 1fr auto; gap: 10px; }
    }
"""

# ─── about.html ───────────────────────────────────────────────────────────────
ABOUT_CSS = """
    /* ── Tablet 1024px ── */
    @media (max-width: 1024px) {
      .story-section { grid-template-columns: 200px 1fr; gap: 40px; }
    }

    /* ── Phone 480px ── */
    @media (max-width: 480px) {
      .about-hero { padding: 100px 24px 64px; }
      .about-hero blockquote { font-size: 28px; }
      .about-hero blockquote::before { font-size: 56px; }
      .story-section,
      .philosophy-inner,
      .products-section,
      .closing-section { padding: 40px 20px; }
      .philosophy-section { padding: 40px 0; }
      .tagline-close { padding: 40px 20px 56px; }
      .tagline-close p { font-size: 22px; }
    }

    /* ── Small phone 375px ── */
    @media (max-width: 375px) {
      .about-hero blockquote { font-size: 24px; }
      .story-body p:first-child { font-size: 18px; }
    }
"""

# ─── blog.html ────────────────────────────────────────────────────────────────
BLOG_CSS = """
    /* ── Responsive 900px ── */
    @media (max-width: 900px) {
      .featured-post { grid-template-columns: 1fr; gap: 32px; }
      .featured-image { min-height: 260px; }
    }

    /* ── Responsive 480px ── */
    @media (max-width: 480px) {
      .blog-hero h1 { font-size: 36px; }
      .blog-hero { padding: 48px 20px 40px; }
      .blog-hero-sub { font-size: 15px; }
      .posts-grid { grid-template-columns: 1fr; gap: 32px; }
      .featured-wrap, .grid-section { padding-left: 20px; padding-right: 20px; }
    }

    /* ── Responsive 375px ── */
    @media (max-width: 375px) {
      .blog-hero h1 { font-size: 30px; }
      .featured-body h2 { font-size: 26px; }
    }
"""

# ─── blog-post.html ───────────────────────────────────────────────────────────
BLOG_POST_CSS = """
    /* ── Responsive 480px ── */
    @media (max-width: 480px) {
      .article-header { padding: 48px 20px 32px; }
      .article-header h1 { font-size: 32px; }
      .article-lead { font-size: 16px; }
      .article-body { padding: 0 20px 60px; font-size: 15px; }
      .article-image { padding: 20px 20px; }
      .related-section { padding: 40px 20px 60px; }
      .related-grid { grid-template-columns: 1fr; gap: 24px; }
      .article-cta { padding: 40px 20px; }
      .article-cta h3 { font-size: 24px; }
    }

    /* ── Responsive 375px ── */
    @media (max-width: 375px) {
      .article-header h1 { font-size: 26px; }
      .article-lead { font-size: 15px; }
    }
"""

def inject(filename, new_css, marker='</style>'):
    path = f'{BASE}/{filename}'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Insert before the closing </style> tag (first occurrence)
    idx = content.find(marker)
    if idx == -1:
        print(f'WARNING: {marker} not found in {filename}')
        return False
    content = content[:idx] + new_css + content[idx:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Updated: {filename}')
    return True

inject('sese-homepage.html', HOMEPAGE_CSS)
inject('collection.html', COLLECTION_CSS)
inject('product.html', PRODUCT_CSS)
inject('cart.html', CART_CSS)
inject('about.html', ABOUT_CSS)
inject('blog.html', BLOG_CSS)
inject('blog-post.html', BLOG_POST_CSS)
print('Done.')
