// MovieShelf service worker - keeps the app working offline
const VERSION = 'movieshelf-v1.1.0';
const SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== 'movieshelf-media').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // movie data APIs: always live
  if (url.hostname === 'api.themoviedb.org' || url.hostname.endsWith('omdbapi.com')) return;
  // posters and fonts: keep a copy for offline use
  if (url.hostname === 'image.tmdb.org' || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open('movieshelf-media').then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      try { const res = await fetch(req); if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; } catch (err) { return hit || Response.error(); }
    }));
    return;
  }
  if (url.origin === location.origin) {
    // app files: network first so updates arrive, cache when offline
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  }
});
