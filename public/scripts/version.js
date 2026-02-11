// version.js — cache-busting & service worker registration
const APP_VERSION = '26.2.11.3';

(function versionCheck() {
  const prev = localStorage.getItem('app-version');
  if (prev !== APP_VERSION) {
    localStorage.setItem('app-version', APP_VERSION);
    location.replace(location.pathname + location.search
      + (location.search ? '&' : '?') + 'v=' + APP_VERSION);
  }
  console.log('ADHD Partner Guide launched – version', APP_VERSION);
})();

window.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(r => console.log('SW registered, scope:', r.scope))
      .catch(console.error);
  }
  const vel = document.getElementById('app-version');
  if (vel) vel.textContent = `v${APP_VERSION}`;
});
