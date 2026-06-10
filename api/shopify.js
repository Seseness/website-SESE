export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const domain = process.env.SHOPIFY_DOMAIN;
  const token  = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !token) {
    return res.status(500).json({ error: 'Shopify env vars not configured' });
  }

  try {
    const shopifyRes = await fetch(
      `https://${domain}/api/2024-01/graphql.json`,
      {
        method:  'POST',
        headers: {
          'Content-Type':                      'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await shopifyRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
