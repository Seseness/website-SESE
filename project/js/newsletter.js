// Newsletter subscription via Shopify Storefront API
const NEWSLETTER_CONFIG = {
  domain:         'sese-8214.myshopify.com',
  apiVersion:     '2024-01',
  storefrontToken: '67d78b4861b9bc1f40b5a231dedfb7df',
};

const NL_MSG = (function(){ const l=(location.pathname.match(/^\/(nl|fr)\//)||[])[1]||'en'; return {en:{sending:'Sending…',ok:'Subscribed ✓',retry:'Try again'},nl:{sending:'Bezig…',ok:'Ingeschreven ✓',retry:'Probeer opnieuw'},fr:{sending:'Envoi…',ok:'Inscription confirmée ✓',retry:'Réessayer'}}[l]; })();

async function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form    = event.currentTarget;
  const input   = form.querySelector('input[type="email"]');
  const button  = form.querySelector('button');
  const email   = input.value.trim();

  if (!email) return;

  button.textContent = NL_MSG.sending;
  button.disabled    = true;
  input.disabled     = true;

  try {
    const endpoint = `https://${NEWSLETTER_CONFIG.domain}/api/${NEWSLETTER_CONFIG.apiVersion}/graphql.json`;

    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id }
          customerUserErrors { code message }
        }
      }
    `;

    const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + '!A1';

    const res  = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': NEWSLETTER_CONFIG.storefrontToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables: { input: { email, acceptsMarketing: true, password } },
      }),
    });

    const json   = await res.json();
    const errors = json?.data?.customerCreate?.customerUserErrors ?? [];

    // TAKEN = email already exists → already subscribed, treat as success
    const alreadyExists = errors.some(e => e.code === 'TAKEN');

    if (errors.length === 0 || alreadyExists) {
      input.value        = '';
      button.textContent = NL_MSG.ok;
      button.style.color = '#4E7A4E';
    } else {
      button.textContent = NL_MSG.retry;
      button.disabled    = false;
      input.disabled     = false;
      console.error('Newsletter error:', errors);
    }
  } catch (err) {
    button.textContent = NL_MSG.retry;
    button.disabled    = false;
    input.disabled     = false;
    console.error('Newsletter fetch error:', err);
  }
}
