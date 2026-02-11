import { createClient } from '@vercel/kv';
import webpush from 'web-push';

const kv = createClient({
  url: process.env.adhd_partner_KV_REST_API_URL,
  token: process.env.adhd_partner_KV_REST_API_TOKEN,
});

const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_CONTACT = process.env.VAPID_CONTACT || 'mailto:you@example.com';

webpush.setVapidDetails(VAPID_CONTACT, VAPID_PUBLIC, VAPID_PRIVATE);

export default async function handler(req, res) {
  // Optional auth: if CRON_SECRET is set, verify the Authorization header
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const dryRun = req.query?.dry === '1';

  const payload = JSON.stringify({
    title: req.body?.title || '🧠 New Notification',
    body:  req.body?.body  || 'Your daily reminder is ready!',
    url:   req.body?.url   || '/'
  });

  const subs    = await kv.hgetall('subs');
  let sent = 0, removed = 0;
  const errors = [];
  const total  = subs ? Object.keys(subs).length : 0;

  if (!dryRun && subs) {
    for (const [endpoint, value] of Object.entries(subs)) {
      const sub = (typeof value === 'string') ? JSON.parse(value) : value;
      try {
        await webpush.sendNotification(sub, payload);
        sent++;
      } catch (e) {
        const code = e.statusCode || e.code || 0;
        if (code === 404 || code === 410) {
          await kv.hdel('subs', endpoint);
          removed++;
        } else {
          errors.push({ endpoint: endpoint.slice(0, 64) + '…', code, msg: e.message });
        }
      }
    }
  }

  return res.json({
    ok: true,
    mode: dryRun ? 'dry' : 'triggered',
    total, sent, removed, errors
  });
}
