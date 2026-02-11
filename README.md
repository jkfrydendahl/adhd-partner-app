# ADHD Partner Reminder App

A progressive web app (PWA) that shows daily reminders for how to support a partner with ADHD. Installable on any device, with optional push notifications.

## Features

- **Reminder of the Day** — a highlighted tip that rotates daily (at 4:00pm local time), showing the context section it belongs to
- **Full list** — all reminders grouped by section, with today's highlighted
- **Push notifications** — opt-in daily reminders via Vercel Cron + Web Push (4:30 PM CET)
- **Installable PWA** — add to Home Screen on iOS/Android/desktop

## Structure

```
public/                   ← static frontend (served as web root)
  index.html              ← HTML shell
  styles/styles.css       ← all styles
  scripts/
    version.js            ← cache-busting + service worker registration
    push.js               ← Web Push subscription client
    reminders.js          ← reminder data (4 sections)
    app.js                ← rendering, weighted random, daily cutover
  sw.js                   ← service worker (push + notification click)
  manifest.webmanifest    ← PWA manifest
  apple-touch-icon.svg    ← app icon source (peace sign + heart)
  apple-touch-icon.png    ← iOS home screen icon
  icon-192.png            ← PWA icon 192×192
  icon-512.png            ← PWA icon 512×512
api/
  subscribe.js            ← stores push subscriptions in Vercel KV
  notify.js               ← sends push notifications to all subscribers
vercel.json               ← Vercel Cron config (daily at 15:30 UTC)
package.json              ← dependencies (@vercel/kv, web-push)
```

## Setup

### 1. Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com) → **New Project**.
3. Framework Preset: **Other**, Root Directory: repo root.
4. Deploy.

### 2. Push Notifications

1. Generate VAPID keys:
   ```bash
   npx web-push generate-vapid-keys
   ```
2. Add environment variables in Vercel dashboard:
   - `VAPID_PUBLIC_KEY` — your public key
   - `VAPID_PRIVATE_KEY` — your private key
   - `VAPID_CONTACT` — `mailto:your-email@example.com`
   - `NOTIFY_TOKEN` — a secret for manual triggers (optional)
3. Create and connect a **Vercel KV** database to the project.
4. Update `scripts/push.js` with your VAPID public key.
5. Redeploy.

The Vercel Cron job (`vercel.json`) triggers `/api/notify` daily at 15:30 UTC (4:30 PM CET).

### 3. Customising reminders

Edit the `reminderSections` array in `scripts/reminders.js`. Each section has:
```js
{
  title: "If ...",
  emoji: "💙",
  description: "Ask gently:",
  reminders: [
    { text: "Your reminder text here", emoji: "🧠" },
  ],
}
```

## Feature Roadmap
- [ ] **Swipe to refresh.** Swipe the "Reminder of the Day" card to get a new one mid-day
- [ ] **"Done" check-off.** Mark a reminder as acted-on today, with a subtle visual reward
- [ ] **Partner mode.** A second view where the ADHD partner can add notes like "today was a good day" or "I'm struggling with X"
- [ ] **Favourites.** Long-press/star a reminder to pin it to a personal list
- [ ] **Daily streak counter.** Track consecutive days the app has been opened as gentle positive reinforcement
- [ ] **Dark mode.** Auto-detect `prefers-color-scheme: dark` with a darker teal/navy palette