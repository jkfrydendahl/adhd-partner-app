// app.js — weighted random selection, rendering, daily cutover

// ─────────────────────────────────────────────
//  Weighted random (same algorithm as love-app)
// ─────────────────────────────────────────────
const year = new Date().getFullYear();

function getWeightedIndex(array, keyPrefix, maxUses = 3) {
  const usageKey = `${keyPrefix}-${year}`;
  const usageMap = JSON.parse(localStorage.getItem(usageKey)) || {};

  const weights = array.map((_, i) => {
    const count = usageMap[i] || 0;
    return count >= maxUses ? 0 : 1 / (1 + count);
  });

  const total = weights.reduce((sum, w) => sum + w, 0);
  const cumulative = [];
  let running = 0;
  for (let i = 0; i < weights.length; i++) {
    running += weights[i] / total;
    cumulative.push(running);
  }

  const rand = Math.random();
  const index = cumulative.findIndex(c => rand <= c);

  usageMap[index] = (usageMap[index] || 0) + 1;
  localStorage.setItem(usageKey, JSON.stringify(usageMap));

  return index;
}

// ─────────────────────────────────────────────
//  Render
// ─────────────────────────────────────────────
function renderDisplay(reminderIndex) {
  const reminder = reminders[reminderIndex];
  const emoji = dayEmojis[reminderIndex % dayEmojis.length] || "✨";

  document.getElementById('reminder-of-the-day-text').textContent = reminder.text;
  document.getElementById('reminder-emoji').textContent = `${reminder.emoji} ${emoji}`;

  // Build full list
  const list = document.getElementById('reminder-list');
  list.innerHTML = '';
  reminders.forEach((r, i) => {
    const li = document.createElement('li');
    if (i === reminderIndex) li.classList.add('highlighted');
    li.innerHTML = `<span class="emoji">${r.emoji}</span>${r.text}`;
    list.appendChild(li);
  });
}

// ─────────────────────────────────────────────
//  Daily cutover logic
// ─────────────────────────────────────────────
function ymdLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const CUTOVER_HOUR = 8, CUTOVER_MINUTE = 0;
const DAILY_STATE_KEY = `dailyReminderState-${CUTOVER_HOUR}-${CUTOVER_MINUTE}-v1`;

function getCutoverSlot(d = new Date()) {
  const now = new Date(d);
  const cut = new Date(now);
  cut.setHours(CUTOVER_HOUR, CUTOVER_MINUTE, 0, 0);
  const slotDate = (now < cut)
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return ymdLocal(slotDate);
}

function msUntilNextCutover(d = new Date()) {
  const next = new Date(d);
  next.setHours(CUTOVER_HOUR, CUTOVER_MINUTE, 0, 0);
  if (next <= d) next.setDate(next.getDate() + 1);
  return next - d;
}

function ensureDailyDisplay(forceNew = false) {
  const slot = getCutoverSlot();
  const saved = JSON.parse(localStorage.getItem(DAILY_STATE_KEY) || 'null');

  if (!saved || saved.slot !== slot || forceNew) {
    const reminderIndex = getWeightedIndex(reminders, 'reminderUsage');
    localStorage.setItem(DAILY_STATE_KEY, JSON.stringify({
      slot,
      reminderIndex,
      ts: Date.now()
    }));
    renderDisplay(reminderIndex);
  } else {
    renderDisplay(saved.reminderIndex);
  }

  // Schedule precise flip while the app stays open
  clearTimeout(window.__cutoverTimer);
  const ms = msUntilNextCutover();
  console.log(`Next cutover in ${(ms / 60000).toFixed(2)} min`);
  window.__cutoverTimer = setTimeout(() => {
    console.log('Cutover timer fired');
    ensureDailyDisplay(true);
  }, ms + 1000);
}

// Heartbeat: catch throttled timers / drift every 30s
function startHeartbeat() {
  clearInterval(window.__dailyHeartbeat);
  window.__dailyHeartbeat = setInterval(() => {
    const slotNow = getCutoverSlot();
    const saved = JSON.parse(localStorage.getItem(DAILY_STATE_KEY) || 'null');
    if (!saved || saved.slot !== slotNow) {
      console.log('Heartbeat detected new slot → refreshing');
      ensureDailyDisplay(true);
    }
  }, 30 * 1000);
}

// Run on load + on foreground / resume
ensureDailyDisplay();
startHeartbeat();
window.addEventListener('visibilitychange', () => { if (!document.hidden) ensureDailyDisplay(); }, { passive: true });
window.addEventListener('focus', () => ensureDailyDisplay(), { passive: true });
window.addEventListener('pageshow', () => ensureDailyDisplay(), { passive: true });

// Manual refresh
window.resetAndRefresh = function () {
  const y = new Date().getFullYear();
  localStorage.removeItem('reminderUsage-' + y);
  localStorage.removeItem(DAILY_STATE_KEY);
  location.reload();
};
