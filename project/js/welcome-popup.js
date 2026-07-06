// =============================================================
//  SESE Welcome Popup — first-visit email capture (10% off)
//  Reuses handleNewsletterSubmit() from newsletter.js; sets a
//  discount code in localStorage that sese-cart.js applies at
//  checkout. No new server-side secrets, no new API routes.
// =============================================================

(() => {
  const SHOWN_KEY    = 'sese_welcome_popup_v1';
  const DISCOUNT_KEY = 'sese_discount_code';
  const DISCOUNT_CODE = 'WELCOME10';
  const SHOW_DELAY_MS = 2500;

  const path   = window.location.pathname;
  const locale = path.startsWith('/nl/') ? 'nl' : path.startsWith('/fr/') ? 'fr' : 'en';

  const COPY = {
    en: {
      live: true,
      title: 'Welcome to the SESE community',
      text: 'Sign up for our newsletter and get 10% off your first order.',
      extra: 'Honest skincare tips, first access to new products, and no spam. Promise.',
      placeholder: 'your@email.com',
      cta: 'Yes, I want 10% off',
      microcopy: 'You’ll receive your discount code straight to your inbox.',
      closeLink: 'Not now',
    },
    nl: {
      live: false,
      title: 'Welkom bij de SESE community',
      text: 'Schrijf je in voor onze nieuwsbrief en ontvang 10% korting op je eerste bestelling.',
      extra: 'Eerlijke skincare tips, als eerste toegang tot nieuwe producten, en geen spam. Beloofd.',
      placeholder: 'jouw@email.com',
      cta: 'Ja, ik wil 10% korting',
      microcopy: 'Je ontvangt je kortingscode rechtstreeks in je inbox.',
      closeLink: 'Niet nu',
    },
    fr: {
      live: false,
      title: 'Bienvenue dans la communauté SESE',
      text: 'Inscrivez-vous à notre newsletter et bénéficiez de 10 % de réduction sur votre première commande.',
      extra: 'Des conseils skincare honnêtes, un accès prioritaire aux nouveautés, et zéro spam. Promis.',
      placeholder: 'votre@email.com',
      cta: 'Oui, je veux 10 % de réduction',
      microcopy: 'Vous recevrez votre code de réduction directement dans votre boîte mail.',
      closeLink: 'Pas maintenant',
    },
  };

  const copy = COPY[locale];
  if (!copy || !copy.live) return;
  if (localStorage.getItem(SHOWN_KEY)) return;

  function markShown() {
    localStorage.setItem(SHOWN_KEY, '1');
  }

  function closePopup() {
    const el = document.getElementById('sese-welcome-popup');
    if (el) el.remove();
    markShown();
  }

  function showPopup() {
    if (localStorage.getItem(SHOWN_KEY)) return;

    const style = document.createElement('style');
    style.textContent = `
      #sese-welcome-popup {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        background: rgba(26,26,26,0.5);
        padding: 24px;
        opacity: 0; transition: opacity 0.3s ease;
      }
      #sese-welcome-popup.sese-popup-visible { opacity: 1; }
      #sese-welcome-popup .sese-popup-card {
        position: relative;
        background: var(--warm-white, #FAF5EC);
        color: var(--ink, #1A1A1A);
        border-radius: 20px;
        max-width: 420px;
        width: 100%;
        padding: 48px 40px 32px;
        text-align: center;
        font-family: var(--font-ui, "Inter","Helvetica Neue",system-ui,sans-serif);
        box-shadow: 0 24px 64px rgba(0,0,0,0.25);
        transform: translateY(8px);
        transition: transform 0.3s ease;
      }
      #sese-welcome-popup.sese-popup-visible .sese-popup-card { transform: translateY(0); }
      #sese-welcome-popup .sese-popup-close {
        position: absolute; top: 16px; right: 16px;
        width: 32px; height: 32px; border-radius: 50%;
        border: none; background: transparent; cursor: pointer;
        font-size: 20px; line-height: 1; color: var(--ink-3, rgba(26,26,26,0.4));
      }
      #sese-welcome-popup .sese-popup-close:hover { color: var(--ink, #1A1A1A); }
      #sese-welcome-popup .sese-popup-title {
        font-family: var(--font-display, "Cormorant Garamond","Times New Roman",serif);
        font-weight: 300; font-style: italic;
        font-size: clamp(24px, 4vw, 30px); line-height: 1.25;
        margin-bottom: 16px;
      }
      #sese-welcome-popup .sese-popup-text {
        font-size: 15px; line-height: 1.5;
        color: var(--ink, #1A1A1A); margin-bottom: 12px;
      }
      #sese-welcome-popup .sese-popup-extra {
        font-size: 13px; line-height: 1.5;
        color: var(--ink-2, rgba(26,26,26,0.55)); margin-bottom: 28px;
      }
      #sese-welcome-popup .sese-popup-form {
        display: flex; align-items: center; gap: 0;
        border: 1px solid var(--line-strong, rgba(26,26,26,0.28));
        border-radius: 999px; overflow: hidden;
        background: rgba(255,255,255,0.6);
      }
      #sese-welcome-popup .sese-popup-form input {
        flex: 1; min-width: 0; background: transparent; border: none; outline: none;
        padding: 14px 18px; font-size: 14px; color: var(--ink, #1A1A1A);
        font-family: var(--font-display, serif); font-weight: 300;
      }
      #sese-welcome-popup .sese-popup-form input::placeholder { color: var(--ink-3, rgba(26,26,26,0.4)); }
      #sese-welcome-popup .sese-popup-form button {
        background: var(--ink, #1A1A1A); color: var(--warm-white, #FAF5EC);
        border: none; cursor: pointer; white-space: nowrap;
        padding: 14px 20px; font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
      }
      #sese-welcome-popup .sese-popup-form button:hover { background: #2A2A2A; }
      #sese-welcome-popup .sese-popup-microcopy {
        margin-top: 16px; font-size: 11px; line-height: 1.5;
        color: var(--ink-3, rgba(26,26,26,0.4));
      }
      #sese-welcome-popup .sese-popup-closelink {
        display: inline-block; margin-top: 18px;
        font-size: 12px; letter-spacing: 0.04em;
        color: var(--ink-2, rgba(26,26,26,0.55));
        text-decoration: underline; background: none; border: none; cursor: pointer;
        font-family: var(--font-ui, inherit);
      }
      #sese-welcome-popup .sese-popup-closelink:hover { color: var(--ink, #1A1A1A); }
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.id = 'sese-welcome-popup';
    wrap.innerHTML = `
      <div class="sese-popup-card">
        <button type="button" class="sese-popup-close" aria-label="Close">&times;</button>
        <h2 class="sese-popup-title">${copy.title}</h2>
        <p class="sese-popup-text">${copy.text}</p>
        <p class="sese-popup-extra">${copy.extra}</p>
        <form class="sese-popup-form">
          <input type="email" placeholder="${copy.placeholder}" required />
          <button type="submit">${copy.cta}</button>
        </form>
        <p class="sese-popup-microcopy">${copy.microcopy}</p>
        <button type="button" class="sese-popup-closelink">${copy.closeLink}</button>
      </div>
    `;
    document.body.appendChild(wrap);
    requestAnimationFrame(() => wrap.classList.add('sese-popup-visible'));

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) closePopup();
    });
    wrap.querySelector('.sese-popup-close').addEventListener('click', closePopup);
    wrap.querySelector('.sese-popup-closelink').addEventListener('click', closePopup);
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', onKey);
      }
    });

    const form = wrap.querySelector('.sese-popup-form');
    form.addEventListener('submit', async (e) => {
      await handleNewsletterSubmit(e);
      const button = form.querySelector('button');
      if (button && button.textContent.includes('Subscribed')) {
        localStorage.setItem(DISCOUNT_KEY, DISCOUNT_CODE);
        markShown();
        setTimeout(closePopup, 1500);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(showPopup, SHOW_DELAY_MS));
  } else {
    setTimeout(showPopup, SHOW_DELAY_MS);
  }
})();
