// =============================================================
//  SESE Locale Preference Sync — runs on every page.
//  This file intentionally does NOT redirect the visitor. Every
//  link on the site already points to the correct language for
//  its own href — a past version of this file force-redirected
//  based on a stored "last chosen language" whenever it didn't
//  match the current URL, which silently bounced visitors to the
//  wrong language after they clicked a perfectly correct footer
//  link (the stored value only had to be stale, e.g. from an
//  earlier accidental tap on the small EN/NL/FR switcher). Do not
//  reintroduce a redirect here without solving that staleness
//  problem first.
//
//  It only keeps `sese_lang_chosen` in sync with manual language
//  switches, so the homepage language popup and the welcome
//  popup (which both gate on this key) behave correctly for
//  returning visitors.
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
