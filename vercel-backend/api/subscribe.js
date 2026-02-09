import { kv } from '@vercel/kv';

// Lock this to your exact GitHub Pages origin once deployed.
// e.g. 'https://<username>.github.io'
const ALLOW_ORIGIN = '*';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sub = req.body;
  if (!sub?.endpoint) return res.status(400).json({ error: 'Invalid subscription' });

  await kv.hset('subs', { [sub.endpoint]: sub });
  return res.status(201).json({ ok: true });
}
