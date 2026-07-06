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
      eyebrow: 'WELCOME',
      headline: 'Unlock 10% off your first order.',
      sub: 'JOIN THE LIST FOR SKINCARE & EARLY ACCESS',
      placeholder: 'your@email.com',
      button: 'CLAIM 10%',
      fine: 'By subscribing you agree to receive marketing emails. Unsubscribe anytime.',
      thanks: 'Check your inbox — your code is on its way.',
    },
    nl: {
      live: false,
      eyebrow: 'WELKOM',
      headline: 'Ontgrendel 10% korting op je eerste bestelling.',
      sub: 'SCHRIJF JE IN VOOR SKINCARE & EXCLUSIEVE TOEGANG',
      placeholder: 'jouw@email.com',
      button: '10% CLAIMEN',
      fine: 'Door je in te schrijven ga je akkoord met het ontvangen van marketing e-mails. Je kan je op elk moment uitschrijven.',
      thanks: 'Check je inbox — je code is onderweg.',
    },
    fr: {
      live: false,
      eyebrow: 'BIENVENUE',
      headline: 'Débloquez 10 % de réduction sur votre première commande.',
      sub: 'INSCRIVEZ-VOUS POUR DES SOINS & UN ACCÈS ANTICIPÉ',
      placeholder: 'votre@email.com',
      button: 'OBTENIR 10 %',
      fine: 'En vous inscrivant, vous acceptez de recevoir des e-mails marketing. Désabonnement à tout moment.',
      thanks: 'Consultez votre boîte mail — votre code arrive.',
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
        padding: 48px 40px 36px;
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
      #sese-welcome-popup .sese-popup-eyebrow {
        font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
        color: var(--ink-3, rgba(26,26,26,0.4)); margin-bottom: 16px;
      }
      #sese-welcome-popup .sese-popup-headline {
        font-family: var(--font-display, "Cormorant Garamond","Times New Roman",serif);
        font-weight: 300; font-style: italic;
        font-size: clamp(24px, 4vw, 32px); line-height: 1.25;
        margin-bottom: 12px;
      }
      #sese-welcome-popup .sese-popup-sub {
        font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
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
        padding: 14px 20px; font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
      }
      #sese-welcome-popup .sese-popup-form button:hover { background: #2A2A2A; }
      #sese-welcome-popup .sese-popup-fine {
        margin-top: 16px; font-size: 11px; line-height: 1.5;
        color: var(--ink-3, rgba(26,26,26,0.4));
      }
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.id = 'sese-welcome-popup';
    wrap.innerHTML = `
      <div class="sese-popup-card">
        <button type="button" class="sese-popup-close" aria-label="Close">&times;</button>
        <p class="sese-popup-eyebrow">${copy.eyebrow}</p>
        <h2 class="sese-popup-headline">${copy.headline}</h2>
        <p class="sese-popup-sub">${copy.sub}</p>
        <form class="sese-popup-form">
          <input type="email" placeholder="${copy.placeholder}" required />
          <button type="submit">${copy.button}</button>
        </form>
        <p class="sese-popup-fine">${copy.fine}</p>
      </div>
    `;
    document.body.appendChild(wrap);
    requestAnimationFrame(() => wrap.classList.add('sese-popup-visible'));

    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) closePopup();
    });
    wrap.querySelector('.sese-popup-close').addEventListener('click', closePopup);
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
