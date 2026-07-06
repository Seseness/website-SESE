// =============================================================
//  SESE Cart — localStorage-based, Shopify checkout
// =============================================================

const SHOPIFY_DOMAIN = 'sese-8214.myshopify.com';
const CART_KEY = 'sese_cart_v2';

// Product catalogue — name, price, image, background colour
const PRODUCT_CATALOGUE = {
  'cleansing-foam':       { name: 'Foaming Cleanser',         price: 26,  img: '/project/assets/products-new/cleansing-foam-hp.png',       bg: '#E3EEF5', variant: '58352279748992' },
  'hydrating-toner':      { name: 'Hydrating Toner',          price: 24,  img: '/project/assets/products-new/hydrating-toner-hp.png',      bg: '#E6EFE9', variant: '58352287154560' },
  'vitamin-c-serum':      { name: 'Vitamin C Serum',          price: 34,  img: '/project/assets/products-new/vitamin-c-serum-hp.png',      bg: '#FCEAD0', variant: '58352288891264' },
  'peptide-serum':        { name: 'Peptide Firming Serum',    price: 34,  img: '/project/assets/products-new/peptide-serum-hp.png',        bg: '#FCEAD0', variant: '58352290038144' },
  'retinol-alt-serum':    { name: 'Retinol Alt. Serum',       price: 26,  img: '/project/assets/products-new/retinol-alt-serum-hp.png',    bg: '#F5EAE4', variant: '58352292692352' },
  'firming-day-cream':    { name: 'Firming Day Cream',        price: 36,  img: '/project/assets/products-new/firming-day-cream-hp.png',    bg: '#FCE8EB', variant: '58352294691200' },
  'ceramide-night-cream': { name: 'Ceramide Night Cream',     price: 38,  img: '/project/assets/products-new/ceramide-night-cream-hp.png', bg: '#EFDFC2', variant: '58352298262912' },
  'smoothing-eye-cream':  { name: 'Smoothing Eye Cream',      price: 30,  img: '/project/assets/products-new/smoothing-eye-cream-hp.png',  bg: '#C9D7C9', variant: '58352300097920' },
  'spf50-stick':          { name: 'SPF 50 Sunscreen Stick',   price: 28,  img: '/project/assets/products-new/spf50-stick-hp.png',          bg: '#E8D5B0', variant: '58352302162304' },
  'forever-bundle':       { name: 'The Forever Routine',      price: 140, img: '/project/assets/products-new/bundle-forever.jpg',          bg: '#DCEAF1', variant: '58276013179264' },
  'beauty-sleep-ritual':  { name: 'The Beauty Sleep Ritual',  price: 135, img: '/project/assets/products-new/bundle-beauty-sleep.png',     bg: '#1A2030', variant: '58276035199360' },
  'full-ritual':          { name: 'The Full Ritual',          price: 260, img: '/project/assets/products-new/bundle-full-ritual.jpg',      bg: '#EAD6B7', variant: '58276049748352' },
};

// =============================================================
//  Cart data helpers
// =============================================================
const SESECart = {
  get() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || { items: [] }; }
    catch { return { items: [] }; }
  },
  save(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    SESECart.updateBadge();
    window.dispatchEvent(new CustomEvent('sese-cart-updated'));
  },
  add(productKey, qty) {
    qty = qty || 1;
    const cart = SESECart.get();
    const existing = cart.items.find(i => i.key === productKey);
    if (existing) {
      existing.qty += qty;
    } else {
      const p = PRODUCT_CATALOGUE[productKey];
      if (!p) return;
      cart.items.push({ key: productKey, qty });
    }
    SESECart.save(cart);
  },
  remove(productKey) {
    const cart = SESECart.get();
    cart.items = cart.items.filter(i => i.key !== productKey);
    SESECart.save(cart);
  },
  update(productKey, qty) {
    const cart = SESECart.get();
    const item = cart.items.find(i => i.key === productKey);
    if (item) {
      if (qty < 1) { SESECart.remove(productKey); return; }
      item.qty = qty;
      SESECart.save(cart);
    }
  },
  count() {
    return SESECart.get().items.reduce((s, i) => s + i.qty, 0);
  },
  subtotal() {
    return SESECart.get().items.reduce((s, i) => {
      const p = PRODUCT_CATALOGUE[i.key];
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },
  checkoutUrl() {
    const items = SESECart.get().items;
    if (!items.length) return '#';
    const lineItems = items.map(i => {
      const p = PRODUCT_CATALOGUE[i.key];
      return p ? `${p.variant}:${i.qty}` : null;
    }).filter(Boolean).join(',');
    const discountCode = localStorage.getItem('sese_discount_code');
    const discountParam = discountCode ? `?discount=${encodeURIComponent(discountCode)}` : '';
    return `https://${SHOPIFY_DOMAIN}/cart/${lineItems}${discountParam}`;
  },
  updateBadge() {
    const count = SESECart.count();
    document.querySelectorAll('.cart-count, #cart-count').forEach(el => {
      el.textContent = count > 0 ? count : '0';
    });
    document.querySelectorAll('.cart-btn').forEach(btn => {
      const countSpan = btn.querySelector('#cart-count, .cart-count');
      if (countSpan) countSpan.textContent = count > 0 ? count : '0';
    });
  }
};

// Update badge on every page load
document.addEventListener('DOMContentLoaded', () => SESECart.updateBadge());

// Make cart button link to cart.html
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
});
