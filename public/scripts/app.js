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
function renderDisplay(quoteIndex) {
  const quote = dailyInspirations[quoteIndex];
  const emoji = dayEmojis[quoteIndex % dayEmojis.length] || "✨";

  // Show the daily inspiration quote
  const todayEl = document.getElementById('inspiration-of-the-day-text');
  todayEl.innerHTML = quote.text;
  document.getElementById('inspiration-emoji').textContent = `${quote.emoji} ${emoji}`;

  // Build sectioned helper-question list (all collapsed by default)
  const list = document.getElementById('inspiration-list');
  list.innerHTML = '';

  inspirationSections.forEach((section, sectionIndex) => {
    // Section header (clickable toggle)
    const header = document.createElement('li');
    header.classList.add('section-header');
    header.setAttribute('data-section', sectionIndex);
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `<span class="chevron">▸</span>${section.title} <span class="emoji">${section.emoji}</span>`;
    header.addEventListener('click', () => toggleSection(sectionIndex));
    list.appendChild(header);

    // Collapsible wrapper
    const wrapper = document.createElement('li');
    wrapper.classList.add('section-body');
    wrapper.setAttribute('data-section-body', sectionIndex);
    wrapper.classList.add('collapsed');

    // Section description
    if (section.description) {
      const desc = document.createElement('div');
      desc.classList.add('section-description');
      desc.textContent = section.description;
      wrapper.appendChild(desc);
    }

    // Questions in this section
    section.inspirations.forEach(r => {
      const item = document.createElement('div');
      item.classList.add('section-item');
      item.innerHTML = `${r.text} <span class="emoji">${r.emoji}</span>`;
      wrapper.appendChild(item);
    });

    list.appendChild(wrapper);
  });
}

function toggleSection(sectionIndex) {
  const header = document.querySelector(`[data-section="${sectionIndex}"]`);
  const body = document.querySelector(`[data-section-body="${sectionIndex}"]`);
  const expanded = header.getAttribute('aria-expanded') === 'true';
  header.setAttribute('aria-expanded', !expanded);
  header.querySelector('.chevron').textContent = expanded ? '▸' : '▾';
  body.classList.toggle('collapsed');
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

const CUTOVER_HOUR = 16, CUTOVER_MINUTE = 0;
const DAILY_STATE_KEY = `dailyInspirationState-${CUTOVER_HOUR}-${CUTOVER_MINUTE}-v1`;

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

  // Force refresh if saved index is out of bounds (e.g. dailyInspirations array changed)
  const outOfBounds = saved && (saved.quoteIndex == null || saved.quoteIndex >= dailyInspirations.length);

  if (!saved || saved.slot !== slot || forceNew || outOfBounds) {
    const quoteIndex = getWeightedIndex(dailyInspirations, 'inspirationUsage');
    localStorage.setItem(DAILY_STATE_KEY, JSON.stringify({
      slot,
      quoteIndex,
      ts: Date.now()
    }));
    renderDisplay(quoteIndex);
  } else {
    renderDisplay(saved.quoteIndex);
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
  localStorage.removeItem('inspirationUsage-' + y);
  localStorage.removeItem(DAILY_STATE_KEY);
  location.reload();
};
