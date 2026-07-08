// =============================================================
//  SESE Locale Redirect — runs on every page, before paint.
//  If the visitor has already chosen a language (via the
//  language-popup on the homepage), and the current page is in
//  a different language, redirect to the SAME page/path in the
//  chosen language instead of leaving them on the wrong one.
// =============================================================

(() => {
  const stored = localStorage.getItem('sese_lang_chosen');
  if (!stored) return; // no preference yet — let the homepage popup handle first-time visitors

  const path = window.location.pathname;
  const current = path.startsWith('/nl/') ? 'nl' : path.startsWith('/fr/') ? 'fr' : 'en';
  if (current === stored) return; // already on the right locale

  const rest = (current === 'nl' || current === 'fr') ? path.slice(3) : path;
  const target = (stored === 'en' ? '' : '/' + stored) + rest + window.location.search + window.location.hash;

  window.location.replace(target);
})();

// =============================================================
//  Keep the stored preference in sync with manual switches.
//  The EN/NL/FR links in the header, footer, and mobile drawer
//  language switcher don't go through the popup, so without this
//  a manual switch would get silently overridden by the redirect
//  above on the very next page load.
// =============================================================

document.addEventListener('click', (e) => {
  const link = e.target.closest('.nav-right a, .lang-foot a, .nav-drawer-lang a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const targetLocale = href.includes('/nl/') || href.startsWith('nl/') ? 'nl'
    : href.includes('/fr/') || href.startsWith('fr/') ? 'fr'
    : 'en';
  localStorage.setItem('sese_lang_chosen', targetLocale);
}, true);
