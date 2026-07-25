// =============================================================
//  SESE Sticky Header — runs on every page.
//  Makes the existing header sticky and hides it on scroll-down
//  past a small threshold, showing it again on any scroll-up or
//  at the very top of the page. Pure scroll behavior: injects only
//  position/transform rules, never touches the header's existing
//  markup, links, or visual styling.
// =============================================================

(() => {
  const HIDE_THRESHOLD = 120;
  const MIN_DELTA = 5;

  function init() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const style = document.createElement('style');
    style.textContent = `
      .nav {
        position: sticky;
        top: 0;
        z-index: 500;
        transition: transform 0.32s cubic-bezier(0.22,0.61,0.36,1);
        will-change: transform;
      }
      .nav.sese-nav-hidden {
        transform: translateY(-100%);
      }
    `;
    document.head.appendChild(style);

    // Some pages set overflow-x: hidden on html/body/.page to stop
    // horizontal bleed (either always, or only in a mobile media
    // query). Per the CSS overflow spec, that silently promotes the
    // other axis's overflow-y to "auto", turning the element into a
    // scroll container, which breaks position: sticky on .nav (it
    // sticks relative to the nearest such ancestor instead of the
    // real viewport). overflow-x: clip stops horizontal bleed the
    // same way without that side effect. Only elements that are
    // currently actually "hidden" get switched, so pages/widths that
    // never set overflow-x: hidden in the first place are untouched.
    // Re-evaluated on resize since the mobile-only rule some pages
    // use only applies past a breakpoint.
    const overflowFixSelectors = ['html', 'body', '.page'];
    const overflowStyle = document.createElement('style');
    document.head.appendChild(overflowStyle);

    function syncOverflowFix() {
      // Clear any previously-applied fix first, otherwise re-checking
      // computed style would see our own "clip" instead of the page's
      // original rule and could never detect a change back to visible.
      overflowStyle.textContent = '';
      overflowStyle.textContent = overflowFixSelectors
        .filter((sel) => {
          const el = document.querySelector(sel);
          return el && getComputedStyle(el).overflowX === 'hidden';
        })
        .map((sel) => `${sel} { overflow-x: clip; }`)
        .join('\n');
    }

    syncOverflowFix();

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncOverflowFix, 150);
    });

    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY;

      if (y <= 0) {
        nav.classList.remove('sese-nav-hidden');
      } else if (delta > MIN_DELTA && y > HIDE_THRESHOLD) {
        nav.classList.add('sese-nav-hidden');
      } else if (delta < -MIN_DELTA) {
        nav.classList.remove('sese-nav-hidden');
      }

      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
