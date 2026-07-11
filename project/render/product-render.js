// Auto-extracted from product.html/nl/fr — one exported function per language variant, selected by the caller.

const ROUTINE_STEPS = [
  { n:'01', l:'Cleanse' },
  { n:'02', l:'Tone' },
  { n:'03', l:'Treat' },
  { n:'04', l:'Moisturise' },
  { n:'05', l:'Protect' },
];

const ROUTINE_STEPS_NL = [
  { n:'01', l:'Reinigen' },
  { n:'02', l:'Tonen' },
  { n:'03', l:'Behandelen' },
  { n:'04', l:'Hydrateren' },
  { n:'05', l:'Beschermen' },
];

const ROUTINE_STEPS_FR = [
  { n:'01', l:'Nettoyer' },
  { n:'02', l:'Tonifier' },
  { n:'03', l:'Traiter' },
  { n:'04', l:'Hydrater' },
  { n:'05', l:'Protéger' },
];

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/YOUR_STORE.myshopify.com';

export function renderProductView_en(PRODUCTS, key, lang, baseUrl = 'https://www.sese.be') {
  const p = PRODUCTS[key];
  if (!p) return null;

  const prefix = lang === 'en' ? '' : '/' + lang;
  const title = `SESE — ${p.name}`;
  const metaDescription = p.tagline;
  const canonicalUrl = baseUrl + prefix + '/product.html?p=' + key;
  const hreflangLinks = [
    { hreflang: 'en', href: baseUrl + '/product.html?p=' + key },
    { hreflang: 'nl', href: baseUrl + '/nl/product.html?p=' + key },
    { hreflang: 'fr', href: baseUrl + '/fr/product.html?p=' + key },
    { hreflang: 'x-default', href: baseUrl + '/product.html?p=' + key },
  ];

  const ldImage = baseUrl + '/' + p.imgs[0].src.replace(/^\.\.\//, '');
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.tagline,
    image: ldImage,
    brand: { '@type': 'Brand', name: 'SESE' },
    offers: {
      '@type': 'Offer',
      price: p.price.replace('€', ''),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
  };

  const shopLabel = "Shop";
  const crumbsHtml = `<a href="index.html">${shopLabel}</a><span class="sep">·</span><span class="cur">${p.name}</span>`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + prefix + '/' },
      { '@type': 'ListItem', position: 2, name: shopLabel, item: baseUrl + prefix + '/index.html' },
      { '@type': 'ListItem', position: 3, name: p.name, item: canonicalUrl },
    ],
  };
  const jsonLd = [productJsonLd, breadcrumbJsonLd];

  // thumbs html
  const thumbsHtml = p.imgs.map((im, i) =>
    `<div class="thumb${i===0?' active':''}" data-src="${im.src}" data-bg="${im.bg}" style="background-color:${im.bg}"><picture><source srcset="${im.src.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img src="${im.src}" alt="" loading="lazy" /></picture></div>`
  ).join('') + (p.imgs.length < 4 ? `<div class="thumb" style="background-color:${p.color};opacity:0.4;"></div>`.repeat(4-p.imgs.length) : '');

  // chips html
  const chipsHtml = p.chips.map(c => `<span class="chip"><span class="d"></span>${c}</span>`).join('');

  // quick cards
  const quickHtml = p.quickInfo.map(([t,s]) =>
    `<div class="quick"><span class="qi"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg></span><div><div class="qt">${t}</div><div class="qs">${s}</div></div></div>`
  ).join('');

  // routine strip
  const routineSteps = ROUTINE_STEPS.map((s,i) => {
    const isActive = i === p.routineActive;
    return `<div class="step${isActive?' active':''}"><div class="n">${s.n}${isActive?' · This':''}</div><div class="l">${s.l}</div></div>`;
  }).join('');

  // ingredients
  const ingsHtml = p.ingredients.map(ing =>
    `<div class="ing"><span class="swatch" style="background:${ing.bg}">${ing.abbr}</span><div><div class="nm">${ing.nm}</div><div class="ds">${ing.ds}</div></div><span class="pct">${ing.pct}</span></div>`
  ).join('');

  // how to use
  const howHtml = p.howSteps.map((s,i) =>
    `<div class="step2"><span class="num">0${i+1}</span><div><div class="h">${s.h}</div><div class="p">${s.p}</div></div></div>`
  ).join('');

  // benefit stats
  const statsHtml = p.stats.map(s =>
    `<div class="bs"><div class="n">${s.n}<em>${s.suf}</em></div><div class="l">${s.l}</div></div>`
  ).join('');

  // faqs
  const faqsHtml = p.faqs.map((f,i) =>
    `<details class="faq-item"${i===0?' open':''}><summary>${f.q}<span class="ic">+</span></summary><div class="answer">${f.a}</div></details>`
  ).join('');

  // pairs
  const pairsHtml = p.pairs.map(pid => {
    const pp = PRODUCTS[pid];
    if (!pp) return '';
    return `<a class="pcard" href="product.html?p=${pid}">
      <div class="pic2" style="background-color:${pp.color}"><picture><source srcset="${pp.img.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img src="${pp.img}" alt="${pp.name}" loading="lazy" /></picture></div>
      <div class="m">
        <div class="nm">${pp.name}</div>
        <div class="sb">${pp.step}</div>
        <div class="pr"><span class="price">${pp.price}</span><button class="add" data-product="${pid}">Add +</button></div>
      </div>
    </a>`;
  }).join('');

  const bodyHtml = `
  <!-- PDP top -->
  <section class="pdp">
    <div class="gallery">
      <div class="thumbs" id="thumbs">${thumbsHtml}</div>
      <div class="main-img" id="main-img-wrap" style="background-color:${p.imgs[0].bg}">
        <div class="corner-r"><div>${p.size}</div></div>
        <picture><source srcset="${p.imgs[0].src.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img id="main-img" src="${p.imgs[0].src}" alt="SESE ${p.name}" /></picture>
        <button class="zoom-btn"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg></button>
      </div>
    </div>

    <aside class="buy">
      <div class="eyebrow">${p.step}</div>
      <h1>${p.nameBreak}</h1>
      <p class="tagline">${p.tagline}</p>
      <div class="chips">${chipsHtml}</div>
      <div class="reviews"><span class="stars">★★★★★</span><span>4.8 · </span><a href="${TRUSTPILOT_URL}" target="_blank" rel="noopener">206 honest reviews</a></div>
      <div class="pricing">
        <span class="now">${p.price}</span>
        <span class="vol">${p.vol} · ${p.volPrice}</span>
        <span class="stock"><span class="d"></span>In stock · Ships 1–2 days</span>
      </div>
      <div class="buy-row">
        <div class="qty">
          <button id="qty-minus">−</button>
          <span class="v" id="qty-val">1</span>
          <button id="qty-plus">+</button>
        </div>
        <button class="add-cart" id="add-cart-btn">
          <span>Add to cart</span>
          <span class="right"><span id="add-price">${p.price}</span><span style="font-size:13px;">→</span></span>
        </button>
      </div>
      <div class="ship-line">
        <span class="row"><span class="ic"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="13" height="9" rx="1.5"/><path d="M16 10h3l2 3v3h-5"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></svg></span>Free shipping over €100</span>
        <span style="opacity:0.4;">·</span>
        <span class="row"><span class="ic"><svg viewBox="0 0 24 24"><path d="M12 3c-3 3-5 6-5 9a5 5 0 0010 0c0-3-2-6-5-9z"/><path d="M8 14c1 1 2 1.6 4 1.6"/></svg></span>COSMOS Natural Certified</span>
      </div>
      <div class="quick-cards">${quickHtml}</div>
    </aside>
  </section>

  <!-- Routine strip -->
  ${p.routineActive >= 0 ? `
  <section class="routine-strip">
    <div class="heading"><div class="eb">Where it fits</div><h3>Step <em>${ROUTINE_STEPS[p.routineActive].n} · ${ROUTINE_STEPS[p.routineActive].l}</em> in the SESE ritual.</h3></div>
    <div class="steps">${routineSteps}</div>
    <div class="cta"><a href="bundle-contents.html?b=full-ritual">See the full ritual →</a></div>
  </section>` : ''}

  <!-- How to use + FAQ -->
  <section class="section-grid">
    <div>
      <div class="eb">How to use</div>
      <h2>${p.howTitle}</h2>
      <div class="howto"><div class="steps2">${howHtml}</div></div>
    </div>
    <div>
      <div class="eb">Honest answers</div>
      <h2>${p.faqTitle}</h2>
      <div class="faq-list">${faqsHtml}</div>
    </div>
  </section>

  <!-- Certs -->
  <section class="certs">
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M12 3c-3 3-5 6-5 9a5 5 0 0010 0c0-3-2-6-5-9z"/></svg></span><div><div class="t">COSMOS Natural</div><div class="s">Certified</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M5 12c2-4 5-6 7-6s5 2 7 6c-2 4-5 6-7 6s-5-2-7-6z"/><circle cx="12" cy="12" r="2"/></svg></span><div><div class="t">Vegan</div><div class="s">No animal derivatives</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 0114 0v3l1 2H4l1-2v-3z"/><path d="M10 19a2 2 0 004 0"/></svg></span><div><div class="t">Cruelty-free</div><div class="s">Leaping Bunny</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5 12a14 14 0 0014 0M12 3v18"/></svg></span><div><div class="t">Gluten-free</div><div class="s">Tested formula</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M4 18l5-12 3 7 2-4 6 9"/></svg></span><div><div class="t">Made in EU</div><div class="s">Coastal botanicals</div></div></div>
  </section>

  <!-- Benefit -->
  <section class="benefit">
    <div class="visual" style="background:${p.benefitGrad}">
      <span class="credit">Honest results</span>
      <div class="pull">${p.quote}</div>
    </div>
    <div class="copy">
      <h2>${p.benefitTitle}</h2>
      ${p.benefitBody.map(t=>`<p>${t}</p>`).join('')}
      <div class="benefit-stats">${statsHtml}</div>
    </div>
  </section>


  <!-- INCI -->
  <details class="inci">
    <summary><span>Full ingredient list (INCI)</span><span style="font-size:18px;">+</span></summary>
    <div class="body">
      <div class="eb" style="margin-bottom:12px">Key ingredients</div>
      <div class="ingredients-list" style="margin-bottom:24px;border-bottom:1px solid var(--line-soft);padding-bottom:24px">${ingsHtml}</div>
      ${p.inci}<br><br><em>${p.inciNote}</em>
    </div>
  </details>

  <!-- Pairs with -->
  <section class="pair-with">
    <div class="sec-head">
      <div><div class="eb">Make it a ritual</div><h3>Pairs <em>quietly</em> with.</h3></div>
      <a href="index.html" class="all">Shop all products →</a>
    </div>
    <div class="pair-grid">${pairsHtml}</div>
  </section>

  <!-- Footer -->
  <footer class="foot-wrap">
    <div class="page">
      <div class="foot-top">
        <div class="foot-col">
          <div class="foot-wm">S E S E</div>
          <div class="foot-tag">Unlock your skin's <em>timeless beauty.</em></div>
          <div class="foot-contact">
            <a href="mailto:info@sese.be">info@sese.be</a>
          </div>
          <div class="foot-socials">
            <a class="circ" href="https://www.instagram.com/sese.skin.official/" target="_blank" rel="noopener" title="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg></a>
            <a class="circ" href="https://www.facebook.com/profile.php?id=61576537267584" target="_blank" rel="noopener" title="Facebook"><svg viewBox="0 0 24 24"><path d="M14 4h-2a3 3 0 00-3 3v3H7v3h2v8h3v-8h2.5l.5-3H12V7a1 1 0 011-1h2V4z"/></svg></a>
            <a class="circ" href="https://www.tiktok.com/@sese.skin.official?_r=1&amp;_t=ZN-97ebiVk2Zjq" target="_blank" rel="noopener" title="TikTok"><svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
          <a class="circ" href="https://www.linkedin.com/company/112362041" target="_blank" rel="noopener" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          </div>
          <div style="margin-top:28px">
            <h5 style="margin-bottom:10px">Newsletter</h5>
            <form class="newsletter" onsubmit="handleNewsletterSubmit(event)">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe &rarr;</button>
            </form>
          </div>
        </div>
        <div class="foot-divider"></div>
        <div class="foot-col">
          <h5>Customer Service</h5>
          <ul>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="shipping.html">Shipping &amp; Delivery</a></li>
            <li><a href="returns.html">Returns &amp; Refunds</a></li>
          </ul>
        </div>
        <div class="foot-divider"></div>
        <div class="foot-col">
          <h5>About &amp; Policies</h5>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
            <li><a href="withdrawal.html">Right of Withdrawal</a></li>
            <li><a href="cookie-policy.html">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bot">
        <div>© 2026 SESE · Based in Belgium</div>
        <div class="pay">
          <span class="chip">VISA</span>
          <span class="chip">Mastercard</span>
          <span class="chip">Bancontact</span>
          <span class="chip">PayPal</span>
          <span class="chip">Apple&nbsp;Pay</span>
        </div>
        <div class="lang-foot">
          <span style="display:none">NL</span><span class="sep" style="display:none">·</span><span style="color:#2A2620;font-weight:400">EN</span><span class="sep" style="display:none">·</span><span style="display:none">FR</span>
        </div>
      </div>
    </div>
  </footer>
  `;

  return { title, metaDescription, canonicalUrl, hreflangLinks, jsonLd, crumbsHtml, bodyHtml };
}

export function renderProductView_nl(PRODUCTS, key, lang, baseUrl = 'https://www.sese.be') {
  const p = PRODUCTS[key];
  if (!p) return null;

  const prefix = lang === 'en' ? '' : '/' + lang;
  const title = `SESE — ${p.name}`;
  const metaDescription = p.tagline;
  const canonicalUrl = baseUrl + prefix + '/product.html?p=' + key;
  const hreflangLinks = [
    { hreflang: 'en', href: baseUrl + '/product.html?p=' + key },
    { hreflang: 'nl', href: baseUrl + '/nl/product.html?p=' + key },
    { hreflang: 'fr', href: baseUrl + '/fr/product.html?p=' + key },
    { hreflang: 'x-default', href: baseUrl + '/product.html?p=' + key },
  ];

  const ldImage = baseUrl + '/' + p.imgs[0].src.replace(/^\.\.\//, '');
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.tagline,
    image: ldImage,
    brand: { '@type': 'Brand', name: 'SESE' },
    offers: {
      '@type': 'Offer',
      price: p.price.replace('€', ''),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
  };

  const shopLabel = "Winkel";
  const crumbsHtml = `<a href="index.html">${shopLabel}</a><span class="sep">·</span><span class="cur">${p.name}</span>`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + prefix + '/' },
      { '@type': 'ListItem', position: 2, name: shopLabel, item: baseUrl + prefix + '/index.html' },
      { '@type': 'ListItem', position: 3, name: p.name, item: canonicalUrl },
    ],
  };
  const jsonLd = [productJsonLd, breadcrumbJsonLd];

  // thumbs html
  const thumbsHtml = p.imgs.map((im, i) =>
    `<div class="thumb${i===0?' active':''}" data-src="${im.src}" data-bg="${im.bg}" style="background-color:${im.bg}"><picture><source srcset="${im.src.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img src="${im.src}" alt="" loading="lazy" /></picture></div>`
  ).join('') + (p.imgs.length < 4 ? `<div class="thumb" style="background-color:${p.color};opacity:0.4;"></div>`.repeat(4-p.imgs.length) : '');

  // chips html
  const chipsHtml = p.chips.map(c => `<span class="chip"><span class="d"></span>${c}</span>`).join('');

  // quick cards
  const quickHtml = p.quickInfo.map(([t,s]) =>
    `<div class="quick"><span class="qi"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg></span><div><div class="qt">${t}</div><div class="qs">${s}</div></div></div>`
  ).join('');

  // routine strip
  const routineStaps = ROUTINE_STEPS_NL.map((s,i) => {
    const isActive = i === p.routineActive;
    return `<div class="step${isActive?' active':''}"><div class="n">${s.n}${isActive?' · Deze':''}</div><div class="l">${s.l}</div></div>`;
  }).join('');

  // ingredients
  const ingsHtml = p.ingredients.map(ing =>
    `<div class="ing"><span class="swatch" style="background:${ing.bg}">${ing.abbr}</span><div><div class="nm">${ing.nm}</div><div class="ds">${ing.ds}</div></div><span class="pct">${ing.pct}</span></div>`
  ).join('');

  // how to use
  const howHtml = p.howStaps.map((s,i) =>
    `<div class="step2"><span class="num">0${i+1}</span><div><div class="h">${s.h}</div><div class="p">${s.p}</div></div></div>`
  ).join('');

  // benefit stats
  const statsHtml = p.stats.map(s =>
    `<div class="bs"><div class="n">${s.n}<em>${s.suf}</em></div><div class="l">${s.l}</div></div>`
  ).join('');

  // faqs
  const faqsHtml = p.faqs.map((f,i) =>
    `<details class="faq-artikel"${i===0?' open':''}><summary>${f.q}<span class="ic">+</span></summary><div class="answer">${f.a}</div></details>`
  ).join('');

  // pairs
  const pairsHtml = p.pairs.map(pid => {
    const pp = PRODUCTS[pid];
    if (!pp) return '';
    return `<a class="pcard" href="product.html?p=${pid}">
      <div class="pic2" style="background-color:${pp.color}"><picture><source srcset="${pp.img.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img src="${pp.img}" alt="${pp.name}" loading="lazy" /></picture></div>
      <div class="m">
        <div class="nm">${pp.name}</div>
        <div class="sb">${pp.step}</div>
        <div class="pr"><span class="price">${pp.price}</span><button class="add" data-product="${pid}">Add +</button></div>
      </div>
    </a>`;
  }).join('');

  const bodyHtml = `
  <!-- PDP top -->
  <section class="pdp">
    <div class="gallery">
      <div class="thumbs" id="thumbs">${thumbsHtml}</div>
      <div class="main-img" id="main-img-wrap" style="background-color:${p.imgs[0].bg}">
        <div class="corner-r"><div>${p.size}</div></div>
        <picture><source srcset="${p.imgs[0].src.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img id="main-img" src="${p.imgs[0].src}" alt="SESE ${p.name}" /></picture>
        <button class="zoom-btn"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg></button>
      </div>
    </div>

    <aside class="buy">
      <div class="eyebrow">${p.step}</div>
      <h1>${p.nameBreak}</h1>
      <p class="tagline">${p.tagline}</p>
      <div class="chips">${chipsHtml}</div>
      <div class="reviews"><span class="stars">★★★★★</span><span>4.8 · </span><a href="${TRUSTPILOT_URL}" target="_blank" rel="noopener">206 honest reviews</a></div>
      <div class="pricing">
        <span class="now">${p.price}</span>
        <span class="vol">${p.vol} · ${p.volPrice}</span>
        <span class="stock"><span class="d"></span>Op voorraad · Verzending binnen 1-2 dagen</span>
      </div>
      <div class="buy-row">
        <div class="qty">
          <button id="qty-minus">−</button>
          <span class="v" id="qty-val">1</span>
          <button id="qty-plus">+</button>
        </div>
        <button class="add-cart" id="add-cart-btn">
          <span>Toevoegen aan winkelmandje</span>
          <span class="right"><span id="add-price">${p.price}</span><span style="font-size:13px;">→</span></span>
        </button>
      </div>
      <div class="ship-line">
        <span class="row"><span class="ic"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="13" height="9" rx="1.5"/><path d="M16 10h3l2 3v3h-5"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></svg></span>Gratis verzending vanaf €100</span>
        <span style="opacity:0.4;">·</span>
        <span class="row"><span class="ic"><svg viewBox="0 0 24 24"><path d="M12 3c-3 3-5 6-5 9a5 5 0 0010 0c0-3-2-6-5-9z"/><path d="M8 14c1 1 2 1.6 4 1.6"/></svg></span>COSMOS Natural Gecertificeerd</span>
      </div>
      <div class="quick-cards">${quickHtml}</div>
    </aside>
  </section>

  <!-- Routine strip -->
  ${p.routineActive >= 0 ? `
  <section class="routine-strip">
    <div class="heading"><div class="eb">Waar dit past</div><h3>Stap <em>${ROUTINE_STEPS_NL[p.routineActive].n} · ${ROUTINE_STEPS_NL[p.routineActive].l}</em> in het SESE-ritueel.</h3></div>
    <div class="steps">${routineStaps}</div>
    <div class="cta"><a href="bundle-contents.html?b=full-ritual">Bekijk het volledige ritueel →</a></div>
  </section>` : ''}

  <!-- Gebruiksaanwijzing + Veelgestelde vragen -->
  <section class="section-grid">
    <div>
      <div class="eb">Gebruiksaanwijzing</div>
      <h2>${p.howTitle}</h2>
      <div class="howto"><div class="steps2">${howHtml}</div></div>
    </div>
    <div>
      <div class="eb">Eerlijke antwoorden</div>
      <h2>${p.faqTitle}</h2>
      <div class="faq-list">${faqsHtml}</div>
    </div>
  </section>

  <!-- Certs -->
  <section class="certs">
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M12 3c-3 3-5 6-5 9a5 5 0 0010 0c0-3-2-6-5-9z"/></svg></span><div><div class="t">COSMOS Natureel</div><div class="s">Certified</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M5 12c2-4 5-6 7-6s5 2 7 6c-2 4-5 6-7 6s-5-2-7-6z"/><circle cx="12" cy="12" r="2"/></svg></span><div><div class="t">Veganistisch</div><div class="s">No animal derivatives</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 0114 0v3l1 2H4l1-2v-3z"/><path d="M10 19a2 2 0 004 0"/></svg></span><div><div class="t">Cruelty-free</div><div class="s">Leaping Bunny</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5 12a14 14 0 0014 0M12 3v18"/></svg></span><div><div class="t">Gluten-free</div><div class="s">Tested formula</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M4 18l5-12 3 7 2-4 6 9"/></svg></span><div><div class="t">Made in EU</div><div class="s">Coastal botanicals</div></div></div>
  </section>

  <!-- Benefit -->
  <section class="benefit">
    <div class="visual" style="background:${p.benefitGrad}">
      <span class="credit">Honest results</span>
      <div class="pull">${p.quote}</div>
    </div>
    <div class="copy">
      <h2>${p.benefitTitle}</h2>
      ${p.benefitBody.map(t=>`<p>${t}</p>`).join('')}
      <div class="benefit-stats">${statsHtml}</div>
    </div>
  </section>


  <!-- INCI -->
  <details class="inci">
    <summary><span>Full ingredient list (INCI)</span><span style="font-size:18px;">+</span></summary>
    <div class="body">
      <div class="eb" style="margin-bottom:12px">Key ingredients</div>
      <div class="ingredients-list" style="margin-bottom:24px;border-bottom:1px solid var(--line-soft);padding-bottom:24px">${ingsHtml}</div>
      ${p.inci}<br><br><em>${p.inciNote}</em>
    </div>
  </details>

  <!-- Pairs with -->
  <section class="pair-with">
    <div class="sec-head">
      <div><div class="eb">Make it a ritual</div><h3>Pairs <em>quietly</em> with.</h3></div>
      <a href="index.html" class="all">Winkel all producten →</a>
    </div>
    <div class="pair-grid">${pairsHtml}</div>
  </section>

  <!-- Footer -->
  <footer class="foot-wrap">
    <div class="page">
      <div class="foot-top">
        <div class="foot-col">
          <div class="foot-wm">S E S E</div>
          <div class="foot-tag">Unlock your skin's <em>timeless beauty.</em></div>
          <div class="foot-contact">
            <a href="mailto:info@sese.be">info@sese.be</a>
          </div>
          <div class="foot-socials">
            <a class="circ" href="https://www.instagram.com/sese.skin.official/" target="_blank" rel="noopener" title="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg></a>
            <a class="circ" href="https://www.facebook.com/profile.php?id=61576537267584" target="_blank" rel="noopener" title="Facebook"><svg viewBox="0 0 24 24"><path d="M14 4h-2a3 3 0 00-3 3v3H7v3h2v8h3v-8h2.5l.5-3H12V7a1 1 0 011-1h2V4z"/></svg></a>
            <a class="circ" href="https://www.tiktok.com/@sese.skin.official?_r=1&amp;_t=ZN-97ebiVk2Zjq" target="_blank" rel="noopener" title="TikTok"><svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
          <a class="circ" href="https://www.linkedin.com/company/112362041" target="_blank" rel="noopener" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          </div>
          <div style="margin-top:28px">
            <h5 style="margin-bottom:10px">Nieuwsbrief</h5>
            <form class="newsletter" onsubmit="handleNewsletterSubmit(event)">
              <input type="email" placeholder="Jouw e-mail" />
              <button type="submit">Inschrijven &rarr;</button>
            </form>
          </div>
        </div>
        <div class="foot-divider"></div>
        <div class="foot-col">
          <h5>Klantenservice</h5>
          <ul>
            <li><a href="faq.html">Veelgestelde vragen</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="shipping.html">Verzending &amp; Levering</a></li>
            <li><a href="returns.html">Retourzendingen &amp; Terugbetalingen</a></li>
          </ul>
        </div>
        <div class="foot-divider"></div>
        <div class="foot-col">
          <h5>Over ons &amp; Beleid</h5>
          <ul>
            <li><a href="about.html">Over ons</a></li>
            <li><a href="privacy.html">Privacybeleid</a></li>
            <li><a href="terms.html">Algemene voorwaarden</a></li>
            <li><a href="withdrawal.html">Herroepingsrecht</a></li>
            <li><a href="cookie-policy.html">Cookiebeleid</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bot">
        <div>© 2026 SESE · Gevestigd in België</div>
        <div class="pay">
          <span class="chip">VISA</span>
          <span class="chip">Mastercard</span>
          <span class="chip">Bancontact</span>
          <span class="chip">PayPal</span>
          <span class="chip">Apple&nbsp;Pay</span>
        </div>
        <div class="lang-foot">
          <span style="display:none">NL</span><span class="sep" style="display:none">·</span><a href="../product.html" style="color:#2A2620;opacity:0.5">EN</a><span class="sep">·</span><a style="display:none" href="../fr/product.html" style="color:#2A2620;opacity:0.5">FR</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  return { title, metaDescription, canonicalUrl, hreflangLinks, jsonLd, crumbsHtml, bodyHtml };
}

export function renderProductView_fr(PRODUCTS, key, lang, baseUrl = 'https://www.sese.be') {
  const p = PRODUCTS[key];
  if (!p) return null;

  const prefix = lang === 'en' ? '' : '/' + lang;
  const title = `SESE — ${p.name}`;
  const metaDescription = p.tagline;
  const canonicalUrl = baseUrl + prefix + '/product.html?p=' + key;
  const hreflangLinks = [
    { hreflang: 'en', href: baseUrl + '/product.html?p=' + key },
    { hreflang: 'nl', href: baseUrl + '/nl/product.html?p=' + key },
    { hreflang: 'fr', href: baseUrl + '/fr/product.html?p=' + key },
    { hreflang: 'x-default', href: baseUrl + '/product.html?p=' + key },
  ];

  const ldImage = baseUrl + '/' + p.imgs[0].src.replace(/^\.\.\//, '');
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.tagline,
    image: ldImage,
    brand: { '@type': 'Brand', name: 'SESE' },
    offers: {
      '@type': 'Offer',
      price: p.price.replace('€', ''),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
  };

  const shopLabel = "Boutique";
  const crumbsHtml = `<a href="index.html">${shopLabel}</a><span class="sep">·</span><span class="cur">${p.name}</span>`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + prefix + '/' },
      { '@type': 'ListItem', position: 2, name: shopLabel, item: baseUrl + prefix + '/index.html' },
      { '@type': 'ListItem', position: 3, name: p.name, item: canonicalUrl },
    ],
  };
  const jsonLd = [productJsonLd, breadcrumbJsonLd];

  // thumbs html
  const thumbsHtml = p.imgs.map((im, i) =>
    `<div class="thumb${i===0?' active':''}" data-src="${im.src}" data-bg="${im.bg}" style="background-color:${im.bg}"><picture><source srcset="${im.src.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img src="${im.src}" alt="" loading="lazy" /></picture></div>`
  ).join('') + (p.imgs.length < 4 ? `<div class="thumb" style="background-color:${p.color};opacity:0.4;"></div>`.repeat(4-p.imgs.length) : '');

  // chips html
  const chipsHtml = p.chips.map(c => `<span class="chip"><span class="d"></span>${c}</span>`).join('');

  // quick cards
  const quickHtml = p.quickInfo.map(([t,s]) =>
    `<div class="quick"><span class="qi"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg></span><div><div class="qt">${t}</div><div class="qs">${s}</div></div></div>`
  ).join('');

  // routine strip
  const routineÉtapes = ROUTINE_STEPS_FR.map((s,i) => {
    const isActive = i === p.routineActive;
    return `<div class="step${isActive?' active':''}"><div class="n">${s.n}${isActive?' · Ici':''}</div><div class="l">${s.l}</div></div>`;
  }).join('');

  // ingredients
  const ingsHtml = p.ingredients.map(ing =>
    `<div class="ing"><span class="swatch" style="background:${ing.bg}">${ing.abbr}</span><div><div class="nm">${ing.nm}</div><div class="ds">${ing.ds}</div></div><span class="pct">${ing.pct}</span></div>`
  ).join('');

  // how to use
  const howHtml = p.howÉtapes.map((s,i) =>
    `<div class="step2"><span class="num">0${i+1}</span><div><div class="h">${s.h}</div><div class="p">${s.p}</div></div></div>`
  ).join('');

  // benefit stats
  const statsHtml = p.stats.map(s =>
    `<div class="bs"><div class="n">${s.n}<em>${s.suf}</em></div><div class="l">${s.l}</div></div>`
  ).join('');

  // faqs
  const faqsHtml = p.faqs.map((f,i) =>
    `<details class="faq-article"${i===0?' open':''}><summary>${f.q}<span class="ic">+</span></summary><div class="answer">${f.a}</div></details>`
  ).join('');

  // pairs
  const pairsHtml = p.pairs.map(pid => {
    const pp = PRODUCTS[pid];
    if (!pp) return '';
    return `<a class="pcard" href="product.html?p=${pid}">
      <div class="pic2" style="background-color:${pp.color}"><picture><source srcset="${pp.img.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img src="${pp.img}" alt="${pp.name}" loading="lazy" /></picture></div>
      <div class="m">
        <div class="nm">${pp.name}</div>
        <div class="sb">${pp.step}</div>
        <div class="pr"><span class="price">${pp.price}</span><button class="add" data-product="${pid}">Add +</button></div>
      </div>
    </a>`;
  }).join('');

  const bodyHtml = `
  <!-- PDP top -->
  <section class="pdp">
    <div class="gallery">
      <div class="thumbs" id="thumbs">${thumbsHtml}</div>
      <div class="main-img" id="main-img-wrap" style="background-color:${p.imgs[0].bg}">
        <div class="corner-r"><div>${p.size}</div></div>
        <picture><source srcset="${p.imgs[0].src.replace(/\.(png|jpg)$/,'.webp')}" type="image/webp"><img id="main-img" src="${p.imgs[0].src}" alt="SESE ${p.name}" /></picture>
        <button class="zoom-btn"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg></button>
      </div>
    </div>

    <aside class="buy">
      <div class="eyebrow">${p.step}</div>
      <h1>${p.nameBreak}</h1>
      <p class="tagline">${p.tagline}</p>
      <div class="chips">${chipsHtml}</div>
      <div class="reviews"><span class="stars">★★★★★</span><span>4.8 · </span><a href="${TRUSTPILOT_URL}" target="_blank" rel="noopener">206 honest reviews</a></div>
      <div class="pricing">
        <span class="now">${p.price}</span>
        <span class="vol">${p.vol} · ${p.volPrice}</span>
        <span class="stock"><span class="d"></span>En stock · Expédié sous 1-2 jours</span>
      </div>
      <div class="buy-row">
        <div class="qty">
          <button id="qty-minus">−</button>
          <span class="v" id="qty-val">1</span>
          <button id="qty-plus">+</button>
        </div>
        <button class="add-cart" id="add-cart-btn">
          <span>Ajouter au panier</span>
          <span class="right"><span id="add-price">${p.price}</span><span style="font-size:13px;">→</span></span>
        </button>
      </div>
      <div class="ship-line">
        <span class="row"><span class="ic"><svg viewBox="0 0 24 24"><rect x="3" y="7" width="13" height="9" rx="1.5"/><path d="M16 10h3l2 3v3h-5"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></svg></span>Livraison gratuite dès 100 €</span>
        <span style="opacity:0.4;">·</span>
        <span class="row"><span class="ic"><svg viewBox="0 0 24 24"><path d="M12 3c-3 3-5 6-5 9a5 5 0 0010 0c0-3-2-6-5-9z"/><path d="M8 14c1 1 2 1.6 4 1.6"/></svg></span>Certifié COSMOS Natural</span>
      </div>
      <div class="quick-cards">${quickHtml}</div>
    </aside>
  </section>

  <!-- Routine strip -->
  ${p.routineActive >= 0 ? `
  <section class="routine-strip">
    <div class="heading"><div class="eb">Où cela s'intègre</div><h3>Étape <em>${ROUTINE_STEPS_FR[p.routineActive].n} · ${ROUTINE_STEPS_FR[p.routineActive].l}</em> dans le rituel SESE.</h3></div>
    <div class="steps">${routineÉtapes}</div>
    <div class="cta"><a href="bundle-contents.html?b=full-ritual">Voir le rituel complet →</a></div>
  </section>` : ''}

  <!-- Comment utiliser + FAQ -->
  <section class="section-grid">
    <div>
      <div class="eb">Comment utiliser</div>
      <h2>${p.howTitle}</h2>
      <div class="howto"><div class="steps2">${howHtml}</div></div>
    </div>
    <div>
      <div class="eb">Réponses honnêtes</div>
      <h2>${p.faqTitle}</h2>
      <div class="faq-list">${faqsHtml}</div>
    </div>
  </section>

  <!-- Certs -->
  <section class="certs">
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M12 3c-3 3-5 6-5 9a5 5 0 0010 0c0-3-2-6-5-9z"/></svg></span><div><div class="t">COSMOS Naturel</div><div class="s">Certified</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M5 12c2-4 5-6 7-6s5 2 7 6c-2 4-5 6-7 6s-5-2-7-6z"/><circle cx="12" cy="12" r="2"/></svg></span><div><div class="t">Végan</div><div class="s">No animal derivatives</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 0114 0v3l1 2H4l1-2v-3z"/><path d="M10 19a2 2 0 004 0"/></svg></span><div><div class="t">Cruelty-free</div><div class="s">Leaping Bunny</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5 12a14 14 0 0014 0M12 3v18"/></svg></span><div><div class="t">Gluten-free</div><div class="s">Tested formula</div></div></div>
    <div class="cert"><span class="b"><svg viewBox="0 0 24 24"><path d="M4 18l5-12 3 7 2-4 6 9"/></svg></span><div><div class="t">Made in EU</div><div class="s">Coastal botanicals</div></div></div>
  </section>

  <!-- Benefit -->
  <section class="benefit">
    <div class="visual" style="background:${p.benefitGrad}">
      <span class="credit">Honest results</span>
      <div class="pull">${p.quote}</div>
    </div>
    <div class="copy">
      <h2>${p.benefitTitle}</h2>
      ${p.benefitBody.map(t=>`<p>${t}</p>`).join('')}
      <div class="benefit-stats">${statsHtml}</div>
    </div>
  </section>


  <!-- INCI -->
  <details class="inci">
    <summary><span>Full ingredient list (INCI)</span><span style="font-size:18px;">+</span></summary>
    <div class="body">
      <div class="eb" style="margin-bottom:12px">Key ingredients</div>
      <div class="ingredients-list" style="margin-bottom:24px;border-bottom:1px solid var(--line-soft);padding-bottom:24px">${ingsHtml}</div>
      ${p.inci}<br><br><em>${p.inciNote}</em>
    </div>
  </details>

  <!-- Pairs with -->
  <section class="pair-with">
    <div class="sec-head">
      <div><div class="eb">Make it a ritual</div><h3>Pairs <em>quietly</em> with.</h3></div>
      <a href="index.html" class="all">Boutique all produits →</a>
    </div>
    <div class="pair-grid">${pairsHtml}</div>
  </section>

  <!-- Footer -->
  <footer class="foot-wrap">
    <div class="page">
      <div class="foot-top">
        <div class="foot-col">
          <div class="foot-wm">S E S E</div>
          <div class="foot-tag">Unlock your skin's <em>timeless beauty.</em></div>
          <div class="foot-contact">
            <a href="mailto:info@sese.be">info@sese.be</a>
          </div>
          <div class="foot-socials">
            <a class="circ" href="https://www.instagram.com/sese.skin.official/" target="_blank" rel="noopener" title="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg></a>
            <a class="circ" href="https://www.facebook.com/profile.php?id=61576537267584" target="_blank" rel="noopener" title="Facebook"><svg viewBox="0 0 24 24"><path d="M14 4h-2a3 3 0 00-3 3v3H7v3h2v8h3v-8h2.5l.5-3H12V7a1 1 0 011-1h2V4z"/></svg></a>
            <a class="circ" href="https://www.tiktok.com/@sese.skin.official?_r=1&amp;_t=ZN-97ebiVk2Zjq" target="_blank" rel="noopener" title="TikTok"><svg viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
          <a class="circ" href="https://www.linkedin.com/company/112362041" target="_blank" rel="noopener" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          </div>
          <div style="margin-top:28px">
            <h5 style="margin-bottom:10px">Newsletter</h5>
            <form class="newsletter" onsubmit="handleNewsletterSubmit(event)">
              <input type="email" placeholder="Votre e-mail" />
              <button type="submit">S'abonner &rarr;</button>
            </form>
          </div>
        </div>
        <div class="foot-divider"></div>
        <div class="foot-col">
          <h5>Service client</h5>
          <ul>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="shipping.html">Livraison &amp; Expédition</a></li>
            <li><a href="returns.html">Retours &amp; Remboursements</a></li>
          </ul>
        </div>
        <div class="foot-divider"></div>
        <div class="foot-col">
          <h5>À propos &amp; Politiques</h5>
          <ul>
            <li><a href="about.html">À propos</a></li>
            <li><a href="privacy.html">Politique de confidentialité</a></li>
            <li><a href="terms.html">Conditions générales</a></li>
            <li><a href="withdrawal.html">Droit de rétractation</a></li>
            <li><a href="cookie-policy.html">Politique de cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bot">
        <div>© 2026 SESE · Basé en Belgique</div>
        <div class="pay">
          <span class="chip">VISA</span>
          <span class="chip">Mastercard</span>
          <span class="chip">Bancontact</span>
          <span class="chip">PayPal</span>
          <span class="chip">Apple&nbsp;Pay</span>
        </div>
        <div class="lang-foot">
          <a href="../nl/product.html" style="color:#2A2620;opacity:0.5">NL</a><span class="sep">·</span><a href="../product.html" style="color:#2A2620;opacity:0.5">EN</a><span class="sep" style="display:none">·</span><span style="display:none">FR</span>
        </div>
      </div>
    </div>
  </footer>
  `;

  return { title, metaDescription, canonicalUrl, hreflangLinks, jsonLd, crumbsHtml, bodyHtml };
}

export function renderProductView(lang, PRODUCTS, key, baseUrl) {
  if (lang === 'nl') return renderProductView_nl(PRODUCTS, key, lang, baseUrl);
  if (lang === 'fr') return renderProductView_fr(PRODUCTS, key, lang, baseUrl);
  return renderProductView_en(PRODUCTS, key, lang, baseUrl);
}
