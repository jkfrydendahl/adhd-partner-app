// push.js — Web Push notification setup

const PUBLIC_VAPID_KEY = 'BCKV4epyd4Q3P02Fnp67m_ClyCGyhbK0mSxxeQbQ6rs0hcsQu7zLollNprikKFHP5Yu9YNnzGAzF272oHSNCXyQ';

function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent); }
function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches
    || window.navigator.standalone;
}
function urlBase64ToUint8Array(s) {
  const p = '='.repeat((4 - s.length % 4) % 4);
  const b = (s + p).replace(/-/g, '+').replace(/_/g, '/');
  const r = atob(b), a = new Uint8Array(r.length);
  for (let i = 0; i < r.length; i++) a[i] = r.charCodeAt(i);
  return a;
}

async function enablePushVerbose() {
  try {
    if (!('serviceWorker' in navigator)) throw new Error('ServiceWorker not supported');
    if (isIOS() && !isStandalone()) throw new Error('Install to Home Screen first');

    const probe = await fetch('./sw.js', { cache: 'no-store' });
    if (!probe.ok) throw new Error('sw.js not reachable (' + probe.status + ')');

    const reg = await navigator.serviceWorker.register('./sw.js');
    await navigator.serviceWorker.ready;
    await reg.update();

    const perm = await Notification.requestPermission();
    if (perm !== 'granted') throw new Error('Permission not granted');

    const keyBytes = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
    if (keyBytes.length < 65) throw new Error('Bad VAPID public key – have you set it?');

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: keyBytes
    });
    console.log('Push subscribed, endpoint:', sub.endpoint);

    const resp = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub)
    });
    if (!resp.ok) throw new Error('Subscribe API failed: ' + resp.status);

    alert('Push notifications enabled! 🎉');
  } catch (err) {
    console.error('enablePush failed:', err);
    alert('Push setup failed: ' + (err?.message || err));
  }
}

document.getElementById('enable-push').addEventListener('click', enablePushVerbose);
