const KLAVIYO_PUBLIC_KEY = 'Vhe3fH';
const KLAVIYO_LIST_ID    = 'UjzAa3';

async function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form   = event.currentTarget;
  const input  = form.querySelector('input[type="email"]');
  const button = form.querySelector('button');
  const email  = input.value.trim();

  if (!email) return;

  button.textContent = 'Sending…';
  button.disabled    = true;
  input.disabled     = true;

  try {
    const res = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=' + KLAVIYO_PUBLIC_KEY, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'revision': '2023-12-15' },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            list_id: KLAVIYO_LIST_ID,
            email_address: { address: email },
          },
        },
      }),
    });

    if (res.ok || res.status === 202) {
      input.value        = '';
      button.textContent = 'Subscribed ✓';
      button.style.color = '#4E7A4E';
    } else {
      throw new Error('Status ' + res.status);
    }
  } catch (err) {
    button.textContent = 'Try again';
    button.disabled    = false;
    input.disabled     = false;
    console.error('Newsletter error:', err);
  }
}
