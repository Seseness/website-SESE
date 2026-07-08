// Auto-extracted from blog-post.html/nl/fr — one exported function per language variant, selected by the caller.

export function renderPostView_en(post, allPosts, lang, baseUrl = 'https://www.sese.be') {
  const prefix = lang === 'en' ? '' : '/' + lang;
  const title = post.title + ' — SESE';
  const metaDescription = post.excerpt;
  const canonicalUrl = baseUrl + prefix + '/blog-post.html?p=' + post.id;
  const hreflangLinks = [1,2,3,4].includes(post.id) ? [
    { hreflang: 'en', href: baseUrl + '/blog-post.html?p=' + post.id },
    { hreflang: 'nl', href: baseUrl + '/nl/blog-post.html?p=' + post.id },
    { hreflang: 'fr', href: baseUrl + '/fr/blog-post.html?p=' + post.id },
    { hreflang: 'x-default', href: baseUrl + '/blog-post.html?p=' + post.id },
  ] : [];

  const breadcrumbTitle = post.title;
  const ldPostUrl = canonicalUrl;
  const ldImage = baseUrl + '/' + (post.image || 'project/assets/journal-cover.jpg').replace(/^\.\.\//, '');
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ldImage,
    datePublished: new Date(post.date).toISOString(),
    mainEntityOfPage: ldPostUrl,
    author: { '@type': 'Organization', name: 'SESE' },
    publisher: { '@type': 'Organization', name: 'SESE', logo: { '@type': 'ImageObject', url: baseUrl + '/project/assets/logo-mark.png' } },
  };
  const journalLabel = "Blog";
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + prefix + '/' },
      { '@type': 'ListItem', position: 2, name: journalLabel, item: baseUrl + prefix + '/blog.html' },
      { '@type': 'ListItem', position: 3, name: post.title, item: ldPostUrl },
    ],
  };
  const jsonLd = [blogPostingJsonLd, breadcrumbJsonLd];

function getRelatedPosts(allPosts, currentId) {
  return allPosts
    .filter(p => p.published && p.id !== currentId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

  // Build article header
  const imageHtml = post.image ? `
    <div class="article-image">
      <div class="img-frame" style="background-image:url('${post.image}');background-color:#EFDFC2;background-size:contain;background-repeat:no-repeat;">
        <div class="img-placeholder" style="background:transparent"></div>
      </div>
    </div>
  ` : '';

  const articleHtml = `
    <div class="article-header">
      <div class="article-meta">
        <span>${post.date}</span>
        <span class="sep">·</span>
        <span>${post.readtime}</span>
        <span class="sep">·</span>
        <span>By SESE</span>
      </div>
      <h1>${post.title}</h1>
      <p class="article-lead">${post.excerpt}</p>
    </div>
    ${imageHtml}
    <div class="article-body">
      ${post.fullBody}
    </div>
    ${post.sources ? `
    <div class="article-sources">
      <h4>Sources &amp; further reading</h4>
      <ol>${post.sources.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>` : ''}
    <hr class="article-divider">
  `;


  const related = getRelatedPosts(allPosts, post.id);
  const relatedHtml = `
    <div class="related-label">More from the blog</div>
    <div class="related-grid">
      ${related.map(r => `
        <a href="blog-post.html?p=${r.id}" class="related-card">
          <div class="related-card-date">${r.date} · ${r.readtime}</div>
          <h4>${r.title}</h4>
          <span class="related-card-link">Read →</span>
        </a>
      `).join('')}
    </div>
  `;

  return { title, metaDescription, canonicalUrl, hreflangLinks, jsonLd, breadcrumbTitle, articleHtml, relatedHtml };
}

export function renderPostView_nl(post, allPosts, lang, baseUrl = 'https://www.sese.be') {
  const prefix = lang === 'en' ? '' : '/' + lang;
  const title = post.title + ' — SESE';
  const metaDescription = post.excerpt;
  const canonicalUrl = baseUrl + prefix + '/blog-post.html?p=' + post.id;
  const hreflangLinks = [1,2,3,4].includes(post.id) ? [
    { hreflang: 'en', href: baseUrl + '/blog-post.html?p=' + post.id },
    { hreflang: 'nl', href: baseUrl + '/nl/blog-post.html?p=' + post.id },
    { hreflang: 'fr', href: baseUrl + '/fr/blog-post.html?p=' + post.id },
    { hreflang: 'x-default', href: baseUrl + '/blog-post.html?p=' + post.id },
  ] : [];

  const breadcrumbTitle = post.title;
  const ldPostUrl = canonicalUrl;
  const ldImage = baseUrl + '/' + (post.image || 'project/assets/journal-cover.jpg').replace(/^\.\.\//, '');
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ldImage,
    datePublished: new Date(post.date).toISOString(),
    mainEntityOfPage: ldPostUrl,
    author: { '@type': 'Organization', name: 'SESE' },
    publisher: { '@type': 'Organization', name: 'SESE', logo: { '@type': 'ImageObject', url: baseUrl + '/project/assets/logo-mark.png' } },
  };
  const journalLabel = "Blog";
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + prefix + '/' },
      { '@type': 'ListItem', position: 2, name: journalLabel, item: baseUrl + prefix + '/blog.html' },
      { '@type': 'ListItem', position: 3, name: post.title, item: ldPostUrl },
    ],
  };
  const jsonLd = [blogPostingJsonLd, breadcrumbJsonLd];

function getRelatedPosts(allPosts, currentId) {
  return allPosts
    .filter(p => p.published && p.id !== currentId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(dateStr) {
  const months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

  // Build article header
  const imageHtml = post.image ? `
    <div class="article-image">
      <div class="img-frame" style="background-image:url('${post.image}');background-color:#EFDFC2;background-size:contain;background-repeat:no-repeat;">
        <div class="img-placeholder" style="background:transparent"></div>
      </div>
    </div>
  ` : '';

  const articleHtml = `
    <div class="article-header">
      <div class="article-meta">
        <span>${formatDate(post.date)}</span>
        <span class="sep">·</span>
        <span>${post.readtime}</span>
        <span class="sep">·</span>
        <span>Door SESE</span>
      </div>
      <h1>${post.title}</h1>
      <p class="article-lead">${post.excerpt}</p>
    </div>
    ${imageHtml}
    <div class="article-body">
      ${post.fullBody}
    </div>
    ${post.sources ? `
    <div class="article-sources">
      <h4>Sources &amp; further reading</h4>
      <ol>${post.sources.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>` : ''}
    <hr class="article-divider">
  `;


  const related = getRelatedPosts(allPosts, post.id);
  const relatedHtml = `
    <div class="related-label">Meer uit de blog</div>
    <div class="related-grid">
      ${related.map(r => `
        <a href="blog-post.html?p=${r.id}" class="related-card">
          <div class="related-card-date">${formatDate(r.date)} · ${r.readtime}</div>
          <h4>${r.title}</h4>
          <span class="related-card-link">Lees →</span>
        </a>
      `).join('')}
    </div>
  `;

  return { title, metaDescription, canonicalUrl, hreflangLinks, jsonLd, breadcrumbTitle, articleHtml, relatedHtml };
}

export function renderPostView_fr(post, allPosts, lang, baseUrl = 'https://www.sese.be') {
  const prefix = lang === 'en' ? '' : '/' + lang;
  const title = post.title + ' — SESE';
  const metaDescription = post.excerpt;
  const canonicalUrl = baseUrl + prefix + '/blog-post.html?p=' + post.id;
  const hreflangLinks = [1,2,3,4].includes(post.id) ? [
    { hreflang: 'en', href: baseUrl + '/blog-post.html?p=' + post.id },
    { hreflang: 'nl', href: baseUrl + '/nl/blog-post.html?p=' + post.id },
    { hreflang: 'fr', href: baseUrl + '/fr/blog-post.html?p=' + post.id },
    { hreflang: 'x-default', href: baseUrl + '/blog-post.html?p=' + post.id },
  ] : [];

  const breadcrumbTitle = post.title;
  const ldPostUrl = canonicalUrl;
  const ldImage = baseUrl + '/' + (post.image || 'project/assets/journal-cover.jpg').replace(/^\.\.\//, '');
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ldImage,
    datePublished: new Date(post.date).toISOString(),
    mainEntityOfPage: ldPostUrl,
    author: { '@type': 'Organization', name: 'SESE' },
    publisher: { '@type': 'Organization', name: 'SESE', logo: { '@type': 'ImageObject', url: baseUrl + '/project/assets/logo-mark.png' } },
  };
  const journalLabel = "Blog";
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + prefix + '/' },
      { '@type': 'ListItem', position: 2, name: journalLabel, item: baseUrl + prefix + '/blog.html' },
      { '@type': 'ListItem', position: 3, name: post.title, item: ldPostUrl },
    ],
  };
  const jsonLd = [blogPostingJsonLd, breadcrumbJsonLd];

function getRelatedPosts(allPosts, currentId) {
  return allPosts
    .filter(p => p.published && p.id !== currentId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(dateStr) {
  const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

  // Build article header
  const imageHtml = post.image ? `
    <div class="article-image">
      <div class="img-frame" style="background-image:url('${post.image}');background-color:#EFDFC2;background-size:contain;background-repeat:no-repeat;">
        <div class="img-placeholder" style="background:transparent"></div>
      </div>
    </div>
  ` : '';

  const articleHtml = `
    <div class="article-header">
      <div class="article-meta">
        <span>${formatDate(post.date)}</span>
        <span class="sep">·</span>
        <span>${post.readtime}</span>
        <span class="sep">·</span>
        <span>Par SESE</span>
      </div>
      <h1>${post.title}</h1>
      <p class="article-lead">${post.excerpt}</p>
    </div>
    ${imageHtml}
    <div class="article-body">
      ${post.fullBody}
    </div>
    ${post.sources ? `
    <div class="article-sources">
      <h4>Sources &amp; further reading</h4>
      <ol>${post.sources.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>` : ''}
    <hr class="article-divider">
  `;


  const related = getRelatedPosts(allPosts, post.id);
  const relatedHtml = `
    <div class="related-label">Plus du blog</div>
    <div class="related-grid">
      ${related.map(r => `
        <a href="blog-post.html?p=${r.id}" class="related-card">
          <div class="related-card-date">${formatDate(r.date)} · ${r.readtime}</div>
          <h4>${r.title}</h4>
          <span class="related-card-link">Lire →</span>
        </a>
      `).join('')}
    </div>
  `;

  return { title, metaDescription, canonicalUrl, hreflangLinks, jsonLd, breadcrumbTitle, articleHtml, relatedHtml };
}

export function renderPostView(lang, post, allPosts, baseUrl) {
  if (lang === 'nl') return renderPostView_nl(post, allPosts, lang, baseUrl);
  if (lang === 'fr') return renderPostView_fr(post, allPosts, lang, baseUrl);
  return renderPostView_en(post, allPosts, lang, baseUrl);
}
