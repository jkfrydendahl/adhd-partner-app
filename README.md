# ADHD Partner Guide

A progressive web app (PWA) that shows daily reminders for how to support a partner with ADHD. Installable on any device, with optional push notifications.

## Features

- **Reminder of the Day** — a highlighted tip that rotates daily (at 08:00 local time)
- **Full list** — all reminders always visible below, with today's highlighted
- **Push notifications** — opt-in daily reminders via Vercel backend + Web Push
- **Installable PWA** — add to Home Screen on iOS/Android/desktop
- **Offline-capable** — works without internet after first load

## Structure

```
index.html              ← entire front-end (single file)
sw.js                   ← service worker (push + notification click)
manifest.webmanifest    ← PWA manifest
.nojekyll               ← GitHub Pages flag
vercel-backend/         ← Vercel serverless functions
  api/subscribe.js      ← stores push subscriptions in Vercel KV
  api/notify.js         ← sends push notifications to all subscribers
  package.json
```

## Setup

### 1. Front-end (GitHub Pages)

Push this repo to GitHub and enable Pages for the branch.

### 2. Push Notifications (Vercel)

1. Generate VAPID keys:
   ```bash
   npx web-push generate-vapid-keys
   ```
2. Deploy `vercel-backend/` to Vercel.
3. Add environment variables in Vercel dashboard:
   - `VAPID_PUBLIC` — your public key
   - `VAPID_PRIVATE` — your private key
   - `NOTIFY_TOKEN` — a secret for manual/cron triggers
   - `DEFAULT_URL` — your GitHub Pages URL
4. Set up Vercel KV storage.
5. Update `index.html`:
   - Set `VERCEL_BACKEND` to your Vercel deploy URL
   - Set `PUBLIC_VAPID_KEY` to your VAPID public key
6. Lock down CORS in `subscribe.js` (`ALLOW_ORIGIN`).

### 3. Customising reminders

Edit the `reminders` array in `index.html`. Each entry is:
```js
{ text: "Your reminder text here", emoji: "🧠" }
```

## Credits

Infrastructure based on the [For My Love](https://github.com/jkfrydendahl/jkfrydendahl.github.io/tree/main/for-my-love-app) PWA.