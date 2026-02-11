import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.adhd_partner_KV_REST_API_URL,
  token: process.env.adhd_partner_KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sub = req.body;
  if (!sub?.endpoint) return res.status(400).json({ error: 'Invalid subscription' });

  await kv.hset('subs', { [sub.endpoint]: sub });
  return res.status(201).json({ ok: true });
}
