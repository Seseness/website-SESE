// =============================================================
//  SESE Cookie Consent Banner. Runs on every page.
//  Implements the four categories already promised in the
//  published Cookie Policy (Strictly Necessary / Functional /
//  Analytical / Marketing). Nothing non-essential loads until a
//  choice is made; the choice is stored in localStorage and can
//  be reopened later via the "Cookie Settings" footer link.
// =============================================================

(() => {
  const CONSENT_KEY = 'sese_cookie_consent';

  const path = window.location.pathname;
  const locale = path.startsWith('/nl/') ? 'nl' : path.startsWith('/fr/') ? 'fr' : 'en';

  const COPY = {
    en: {
      bannerTitle: 'We value your privacy',
      bannerText: 'We use cookies to run sese.be (strictly necessary) and, with your consent, to understand site usage and show relevant offers. You can change your choice at any time.',
      acceptAll: 'Accept All',
      rejectAll: 'Reject Non-Essential',
      customize: 'Customize',
      savePrefs: 'Save Preferences',
      back: 'Back',
      panelTitle: 'Cookie Preferences',
      categories: [
        { key: 'necessary', name: 'Strictly Necessary', badge: 'Always active', locked: true,
          desc: 'These cookies are essential for the website to function. They enable core features such as secure checkout, shopping cart persistence, session management, and language preferences. No consent is required for strictly necessary cookies under the ePrivacy Directive.' },
        { key: 'functional', name: 'Functional', badge: 'Optional', locked: false,
          desc: 'These cookies remember your preferences to provide a more personalised experience, such as your chosen language and any display preferences.' },
        { key: 'analytical', name: 'Analytical', badge: 'Optional', locked: false,
          desc: 'These cookies help us understand how visitors interact with sese.be so we can improve the website. Data collected is anonymised or pseudonymised.' },
        { key: 'marketing', name: 'Marketing', badge: 'Consent required', locked: false,
          desc: 'Marketing cookies track your browsing activity to display relevant advertisements and measure campaign effectiveness. These are only placed with your explicit consent.' },
      ],
      footer: 'Read our <a href="{cookiePolicyHref}">Cookie Policy</a> for full details.',
    },
    nl: {
      bannerTitle: 'We respecteren je privacy',
      bannerText: 'We gebruiken cookies om sese.be te laten werken (strikt noodzakelijk) en, met jouw toestemming, om websitegebruik te begrijpen en relevante aanbiedingen te tonen. Je kan je keuze op elk moment wijzigen.',
      acceptAll: 'Alles Accepteren',
      rejectAll: 'Niet-Noodzakelijke Weigeren',
      customize: 'Aanpassen',
      savePrefs: 'Voorkeuren Opslaan',
      back: 'Terug',
      panelTitle: 'Cookievoorkeuren',
      categories: [
        { key: 'necessary', name: 'Strikt Noodzakelijk', badge: 'Altijd actief', locked: true,
          desc: 'Deze cookies zijn essentieel voor het functioneren van de website. Ze maken kernfuncties mogelijk zoals veilig afrekenen, het behoud van je winkelwagen, sessiebeheer en taalvoorkeuren. Voor strikt noodzakelijke cookies is onder de ePrivacy-richtlijn geen toestemming vereist.' },
        { key: 'functional', name: 'Functioneel', badge: 'Optioneel', locked: false,
          desc: 'Deze cookies onthouden je voorkeuren om een meer gepersonaliseerde ervaring te bieden, zoals je gekozen taal en eventuele weergavevoorkeuren.' },
        { key: 'analytical', name: 'Analytisch', badge: 'Optioneel', locked: false,
          desc: 'Deze cookies helpen ons te begrijpen hoe bezoekers omgaan met sese.be, zodat we de website kunnen verbeteren. Verzamelde gegevens worden geanonimiseerd of gepseudonimiseerd.' },
        { key: 'marketing', name: 'Marketing', badge: 'Toestemming vereist', locked: false,
          desc: 'Marketingcookies volgen je surfgedrag om relevante advertenties te tonen en de effectiviteit van campagnes te meten. Deze worden alleen geplaatst met je uitdrukkelijke toestemming.' },
      ],
      footer: 'Lees ons <a href="{cookiePolicyHref}">Cookiebeleid</a> voor alle details.',
    },
    fr: {
      bannerTitle: 'Nous respectons votre vie privée',
      bannerText: 'Nous utilisons des cookies pour faire fonctionner sese.be (strictement nécessaires) et, avec votre consentement, pour comprendre l\'utilisation du site et afficher des offres pertinentes. Vous pouvez modifier votre choix à tout moment.',
      acceptAll: 'Tout Accepter',
      rejectAll: 'Refuser les Non-Essentiels',
      customize: 'Personnaliser',
      savePrefs: 'Enregistrer les Préférences',
      back: 'Retour',
      panelTitle: 'Préférences des Cookies',
      categories: [
        { key: 'necessary', name: 'Strictement Nécessaires', badge: 'Toujours actifs', locked: true,
          desc: 'Ces cookies sont indispensables au fonctionnement du site. Ils permettent des fonctionnalités essentielles telles que le paiement sécurisé, la persistance du panier, la gestion des sessions et les préférences linguistiques. Aucun consentement n\'est requis pour les cookies strictement nécessaires en vertu de la directive ePrivacy.' },
        { key: 'functional', name: 'Fonctionnels', badge: 'Optionnels', locked: false,
          desc: 'Ces cookies mémorisent vos préférences pour offrir une expérience plus personnalisée, telles que votre langue choisie et vos préférences d\'affichage.' },
        { key: 'analytical', name: 'Analytiques', badge: 'Optionnels', locked: false,
          desc: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec sese.be afin d\'améliorer le site. Les données collectées sont anonymisées ou pseudonymisées.' },
        { key: 'marketing', name: 'Marketing', badge: 'Consentement requis', locked: false,
          desc: 'Les cookies marketing suivent votre activité de navigation pour afficher des publicités pertinentes et mesurer l\'efficacité des campagnes. Ils ne sont déposés qu\'avec votre consentement explicite.' },
      ],
      footer: 'Consultez notre <a href="{cookiePolicyHref}">Politique de Cookies</a> pour tous les détails.',
    },
  };

  const copy = COPY[locale];
  const cookiePolicyHref = 'cookie-policy.html';

  function getConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveConsent(consent) {
    consent.necessary = true;
    consent.ts = Date.now();
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('sese:consent-updated', { detail: consent }));
  }

  window.seseHasConsent = function (category) {
    if (category === 'necessary') return true;
    const c = getConsent();
    return !!(c && c[category]);
  };

  function buildUI() {
    if (document.getElementById('sese-cookie-banner')) return;

    const style = document.createElement('style');
    style.textContent = `
      #sese-cookie-banner {
        position: fixed; left: 0; right: 0; bottom: 0; z-index: 9998;
        display: flex; justify-content: center;
        padding: 20px;
        opacity: 0; transform: translateY(16px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
      }
      #sese-cookie-banner.sese-cookie-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
      #sese-cookie-banner .sese-cookie-card {
        width: 100%; max-width: 720px;
        background: var(--warm-white, #FAF5EC);
        color: var(--ink, #1A1A1A);
        border: 1px solid var(--line-default, rgba(26,26,26,0.16));
        border-radius: 20px;
        padding: 28px 28px 24px;
        box-shadow: 0 24px 64px rgba(0,0,0,0.18);
        font-family: var(--font-ui, "Inter","Helvetica Neue",system-ui,sans-serif);
      }
      #sese-cookie-banner .sese-cookie-title {
        font-family: var(--font-display, "Cormorant Garamond","Times New Roman",serif);
        font-weight: 300; font-style: italic;
        font-size: clamp(20px, 3vw, 24px); line-height: 1.25;
        margin: 0 0 10px;
      }
      #sese-cookie-banner .sese-cookie-text {
        font-size: 14px; line-height: 1.6;
        color: var(--ink-2, rgba(26,26,26,0.55));
        margin: 0 0 22px;
      }
      #sese-cookie-banner .sese-cookie-actions {
        display: flex; flex-wrap: wrap; gap: 10px;
      }
      #sese-cookie-banner .sese-cookie-btn {
        flex: 1 1 auto; min-width: 150px;
        padding: 13px 20px;
        border: 1px solid var(--ink, #1A1A1A);
        border-radius: 999px;
        background: transparent;
        cursor: pointer;
        font-family: var(--font-ui, "Inter",system-ui,sans-serif);
        font-size: 12px; font-weight: 500; letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ink, #1A1A1A);
        transition: background 0.2s ease, color 0.2s ease;
      }
      #sese-cookie-banner .sese-cookie-btn:hover {
        background: var(--ink, #1A1A1A); color: var(--warm-white, #FAF5EC);
      }
      #sese-cookie-banner .sese-cookie-btn.sese-cookie-primary {
        background: var(--ink, #1A1A1A); color: var(--warm-white, #FAF5EC);
      }
      #sese-cookie-banner .sese-cookie-btn.sese-cookie-primary:hover { background: #2A2A2A; }
      #sese-cookie-banner .sese-cookie-btn.sese-cookie-text {
        flex: 0 0 auto; border-color: transparent;
        text-decoration: underline; text-underline-offset: 3px;
      }
      #sese-cookie-banner .sese-cookie-btn.sese-cookie-text:hover { background: transparent; color: var(--ink, #1A1A1A); text-decoration-color: var(--ink); }
      #sese-cookie-banner .sese-cookie-footer {
        margin-top: 16px; font-size: 11px; line-height: 1.5;
        color: var(--ink-3, rgba(26,26,26,0.4));
      }
      #sese-cookie-banner .sese-cookie-footer a { color: inherit; border-bottom: 1px solid currentColor; }

      /* Customize panel */
      #sese-cookie-banner .sese-cookie-panel-title {
        font-family: var(--font-display, "Cormorant Garamond","Times New Roman",serif);
        font-weight: 300; font-style: italic;
        font-size: clamp(20px, 3vw, 24px); line-height: 1.25;
        margin: 0 0 18px;
      }
      #sese-cookie-banner .sese-cookie-cats {
        max-height: 46vh; overflow-y: auto;
        margin-bottom: 20px;
        display: flex; flex-direction: column; gap: 14px;
      }
      #sese-cookie-banner .sese-cookie-cat {
        border: 1px solid var(--line-soft, rgba(26,26,26,0.08));
        border-radius: 14px;
        padding: 14px 16px;
      }
      #sese-cookie-banner .sese-cookie-cat-head {
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; margin-bottom: 8px;
      }
      #sese-cookie-banner .sese-cookie-cat-name {
        font-size: 14px; font-weight: 600; color: var(--ink, #1A1A1A);
      }
      #sese-cookie-banner .sese-cookie-cat-badge {
        font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
        color: var(--ink-3, rgba(26,26,26,0.4));
      }
      #sese-cookie-banner .sese-cookie-cat-desc {
        font-size: 12.5px; line-height: 1.6;
        color: var(--ink-2, rgba(26,26,26,0.55));
        margin: 0;
      }
      #sese-cookie-banner .sese-cookie-toggle {
        position: relative; flex: 0 0 auto;
        width: 40px; height: 22px; border-radius: 999px;
        background: var(--line-strong, rgba(26,26,26,0.28));
        border: none; cursor: pointer; padding: 0;
        transition: background 0.2s ease;
      }
      #sese-cookie-banner .sese-cookie-toggle::after {
        content: ""; position: absolute; top: 2px; left: 2px;
        width: 18px; height: 18px; border-radius: 50%;
        background: var(--warm-white, #FAF5EC);
        transition: transform 0.2s ease;
      }
      #sese-cookie-banner .sese-cookie-toggle.sese-cookie-on { background: var(--ink, #1A1A1A); }
      #sese-cookie-banner .sese-cookie-toggle.sese-cookie-on::after { transform: translateX(18px); }
      #sese-cookie-banner .sese-cookie-toggle:disabled { cursor: default; opacity: 0.6; }

      @media (max-width: 600px) {
        #sese-cookie-banner { padding: 12px; }
        #sese-cookie-banner .sese-cookie-card { padding: 22px 18px 18px; border-radius: 18px; }
        #sese-cookie-banner .sese-cookie-btn { min-width: 0; flex: 1 1 100%; }
        #sese-cookie-banner .sese-cookie-cats { max-height: 40vh; }
      }
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.id = 'sese-cookie-banner';
    document.body.appendChild(wrap);
    return wrap;
  }

  function renderBanner(wrap) {
    wrap.innerHTML = `
      <div class="sese-cookie-card" role="dialog" aria-label="${copy.panelTitle}">
        <p class="sese-cookie-title">${copy.bannerTitle}</p>
        <p class="sese-cookie-text">${copy.bannerText}</p>
        <div class="sese-cookie-actions">
          <button type="button" class="sese-cookie-btn" data-action="reject">${copy.rejectAll}</button>
          <button type="button" class="sese-cookie-btn" data-action="customize">${copy.customize}</button>
          <button type="button" class="sese-cookie-btn sese-cookie-primary" data-action="accept">${copy.acceptAll}</button>
        </div>
        <p class="sese-cookie-footer">${copy.footer.replace('{cookiePolicyHref}', cookiePolicyHref)}</p>
      </div>
    `;

    wrap.querySelector('[data-action="accept"]').addEventListener('click', () => {
      saveConsent({ functional: true, analytical: true, marketing: true });
      hide(wrap);
    });
    wrap.querySelector('[data-action="reject"]').addEventListener('click', () => {
      saveConsent({ functional: false, analytical: false, marketing: false });
      hide(wrap);
    });
    wrap.querySelector('[data-action="customize"]').addEventListener('click', () => {
      renderPanel(wrap);
    });
  }

  function renderPanel(wrap) {
    const current = getConsent() || { functional: false, analytical: false, marketing: false };

    const catsHtml = copy.categories.map(cat => {
      const on = cat.locked || !!current[cat.key];
      return `
        <div class="sese-cookie-cat">
          <div class="sese-cookie-cat-head">
            <span>
              <span class="sese-cookie-cat-name">${cat.name}</span>
              <span class="sese-cookie-cat-badge"> &middot; ${cat.badge}</span>
            </span>
            <button type="button" class="sese-cookie-toggle ${on ? 'sese-cookie-on' : ''}" data-cat="${cat.key}" ${cat.locked ? 'disabled aria-disabled="true"' : ''} aria-label="${cat.name}" aria-pressed="${on}"></button>
          </div>
          <p class="sese-cookie-cat-desc">${cat.desc}</p>
        </div>
      `;
    }).join('');

    wrap.innerHTML = `
      <div class="sese-cookie-card" role="dialog" aria-label="${copy.panelTitle}">
        <p class="sese-cookie-panel-title">${copy.panelTitle}</p>
        <div class="sese-cookie-cats">${catsHtml}</div>
        <div class="sese-cookie-actions">
          <button type="button" class="sese-cookie-btn sese-cookie-text" data-action="back">${copy.back}</button>
          <button type="button" class="sese-cookie-btn" data-action="reject">${copy.rejectAll}</button>
          <button type="button" class="sese-cookie-btn sese-cookie-primary" data-action="save">${copy.savePrefs}</button>
        </div>
      </div>
    `;

    const state = { functional: current.functional, analytical: current.analytical, marketing: current.marketing };

    wrap.querySelectorAll('.sese-cookie-toggle:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cat;
        state[key] = !state[key];
        btn.classList.toggle('sese-cookie-on', state[key]);
        btn.setAttribute('aria-pressed', String(state[key]));
      });
    });

    wrap.querySelector('[data-action="back"]').addEventListener('click', () => renderBanner(wrap));
    wrap.querySelector('[data-action="reject"]').addEventListener('click', () => {
      saveConsent({ functional: false, analytical: false, marketing: false });
      hide(wrap);
    });
    wrap.querySelector('[data-action="save"]').addEventListener('click', () => {
      saveConsent(state);
      hide(wrap);
    });
  }

  function show() {
    const wrap = buildUI();
    if (!wrap) return;
    renderBanner(wrap);
    requestAnimationFrame(() => wrap.classList.add('sese-cookie-visible'));
  }

  function hide(wrap) {
    wrap.classList.remove('sese-cookie-visible');
    setTimeout(() => wrap.remove(), 300);
  }

  window.seseOpenCookieSettings = function () {
    const existing = document.getElementById('sese-cookie-banner');
    if (existing) { renderPanel(existing); return; }
    const wrap = buildUI();
    if (!wrap) return;
    renderPanel(wrap);
    requestAnimationFrame(() => wrap.classList.add('sese-cookie-visible'));
  };

  function init() {
    if (getConsent()) return;
    if (localStorage.getItem('sese_lang_chosen')) {
      show();
    } else {
      // Homepage language popup hasn't been answered yet — wait for it
      // so the cookie banner never appears before the language choice.
      window.addEventListener('sese:lang-resolved', function onLangResolved() {
        window.removeEventListener('sese:lang-resolved', onLangResolved);
        if (!getConsent()) show();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
