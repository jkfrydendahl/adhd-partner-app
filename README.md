# ADHD Partner Inspiration App

A progressive web app (PWA) that helps you show love and support to your ADHD partner. Each day it surfaces a short, actionable inspiration — something to say or do — plus a reference list of helpful questions for common situations. Installable on any device, with optional push notifications.

## Features

- **Daily Partner Inspiration.** A rotating quote (things to say or do) that changes daily at 4:00 PM local time
- **"Need Some Guidance?".** A collapsible list of helpful questions grouped by situation (partner feeling down, unfinished projects, etc.)
- **Push notifications.** Opt-in daily inspirations via Vercel Cron + Web Push (4:30 PM CET)
- **Installable PWA.** Add to Home Screen on iOS/Android/desktop

## Structure

```
public/                   ← static frontend (served as web root)
  index.html              ← HTML shell
  styles/styles.css       ← all styles
  scripts/
    version.js            ← cache-busting + service worker registration
    push.js               ← Web Push subscription client
    inspirations.js          ← daily inspiration quotes + helper question data
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

### 3. Customising content

**Daily inspiration quotes** — edit the `dailyInspirations` array in `scripts/inspirations.js`:
```js
{ text: "Tell them: \"I trust you.\"", emoji: "🔐" },
```

**Helper question list** — edit the `inspirationSections` array in the same file. Each section has:
```js
{
  title: "If your partner is feeling down",
  emoji: "💙",
  description: "Ask gently:",
  inspirations: [
    { text: "What's challenging you right now?", emoji: "🌧️" },
  ],
}
```

## Feature Roadmap
- [ ] **Swipe to refresh.** Swipe the "Inspiration of the Day" card to get a new one mid-day
- [ ] **"Done" check-off.** Mark inspirations as acted-on today, with a subtle visual reward
- [ ] **Partner mode.** A second view where the ADHD partner can add notes like "today was a good day" or "I'm struggling with X"
- [ ] **Favourites.** Long-press/star inspirations to pin it to a personal list
- [ ] **Daily streak counter.** Track consecutive days the app has been opened as gentle positive reinforcement
- [ ] **Dark mode.** Auto-detect `prefers-color-scheme: dark` with a darker teal/navy palette