// =============================================================
//  SESE Language Picker — shown once before the welcome popup
// =============================================================

(() => {
  const LANG_KEY = 'sese_lang_chosen';

  if (localStorage.getItem(LANG_KEY)) return;

  const path = window.location.pathname;

  function pick(code) {
    localStorage.setItem(LANG_KEY, code);
    window.dispatchEvent(new CustomEvent('sese:lang-resolved', { detail: code }));
    const el = document.getElementById('sese-lang-popup');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }
    const alreadyHere =
      (code === 'en' && !path.startsWith('/nl/') && !path.startsWith('/fr/')) ||
      (code === 'nl' && path.startsWith('/nl/')) ||
      (code === 'fr' && path.startsWith('/fr/'));
    if (!alreadyHere) {
      // Swap locale while keeping the visitor on the same page/path.
      const rest = (path.startsWith('/nl/') || path.startsWith('/fr/')) ? path.slice(3) : path;
      const target = (code === 'en' ? '' : '/' + code) + rest + window.location.search + window.location.hash;
      window.location.href = target;
    }
    // Same page: cookie-consent.js and welcome-popup.js pick up the
    // sese:lang-resolved event above and take it from here.
  }

  const style = document.createElement('style');
  style.textContent = `
    #sese-lang-popup {
      position: fixed; inset: 0; z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      background: rgba(26,26,26,0.5);
      padding: 24px;
      opacity: 0; transition: opacity 0.3s ease;
    }
    #sese-lang-popup.sese-lang-visible { opacity: 1; }
    #sese-lang-popup .sese-lang-card {
      position: relative;
      background: var(--warm-white, #FAF5EC);
      color: var(--ink, #1A1A1A);
      border-radius: 20px;
      max-width: 400px;
      width: 100%;
      padding: 48px 40px 40px;
      text-align: center;
      font-family: var(--font-ui, "Inter","Helvetica Neue",system-ui,sans-serif);
      box-shadow: 0 24px 64px rgba(0,0,0,0.25);
      transform: translateY(8px);
      transition: transform 0.3s ease;
    }
    #sese-lang-popup.sese-lang-visible .sese-lang-card { transform: translateY(0); }
    #sese-lang-popup .sese-lang-wordmark {
      font-family: var(--font-display, "Cormorant Garamond","Times New Roman",serif);
      font-weight: 300;
      font-size: 22px;
      letter-spacing: 0.38em;
      color: var(--ink, #1A1A1A);
      margin-bottom: 28px;
      display: block;
    }
    #sese-lang-popup .sese-lang-rule {
      width: 36px; height: 1px;
      background: rgba(26,26,26,0.25);
      margin: 0 auto 28px;
    }
    #sese-lang-popup .sese-lang-title { display: none; }
    #sese-lang-popup .sese-lang-options {
      display: flex; flex-direction: column; gap: 12px;
    }
    #sese-lang-popup .sese-lang-btn {
      width: 100%;
      padding: 16px 24px;
      border: 1px solid rgba(26,26,26,0.2);
      border-radius: 999px;
      background: transparent;
      cursor: pointer;
      font-family: var(--font-ui, "Inter",system-ui,sans-serif);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink, #1A1A1A);
      transition: background 0.2s ease, border-color 0.2s ease;
    }
    #sese-lang-popup .sese-lang-btn:hover {
      background: var(--ink, #1A1A1A);
      color: var(--warm-white, #FAF5EC);
      border-color: var(--ink, #1A1A1A);
    }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.id = 'sese-lang-popup';
  wrap.innerHTML = `
    <div class="sese-lang-card">
      <span class="sese-lang-wordmark">S E S E</span>
      <div class="sese-lang-rule"></div>
      <h2 class="sese-lang-title">
        <span>Choose your language</span>
        <span>Kies je taal</span>
        <span>Choisissez votre langue</span>
      </h2>
      <div class="sese-lang-options">
        <button class="sese-lang-btn" data-lang="en">English</button>
        <button class="sese-lang-btn" data-lang="nl">Nederlands</button>
        <button class="sese-lang-btn" data-lang="fr">Français</button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);
  requestAnimationFrame(() => wrap.classList.add('sese-lang-visible'));

  wrap.querySelectorAll('.sese-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => pick(btn.dataset.lang));
  });
})();
