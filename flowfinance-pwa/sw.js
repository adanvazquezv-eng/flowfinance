// FlowFinance Service Worker v1.0
// Estrategia: Cache-first para assets estáticos, network-first para datos

const CACHE_NAME = 'flowfinance-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
];

// Recursos externos a cachear
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js',
];

// ── INSTALL: precachear todo ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Assets locales (críticos)
      cache.addAll(STATIC_ASSETS).catch(e => console.warn('Static cache partial:', e));
      // Assets externos (best-effort)
      EXTERNAL_ASSETS.forEach(url => {
        fetch(url).then(r => { if(r.ok) cache.put(url, r); }).catch(()=>{});
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: limpiar caches viejos ──────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH: strategy inteligente ──────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // API de Anthropic: siempre network (nunca cachear)
  if (url.hostname === 'api.anthropic.com') {
    event.respondWith(fetch(request));
    return;
  }

  // Fonts y CDN externos: cache-first
  if (url.hostname !== self.location.hostname) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => new Response('', { status: 503 })))
    );
    return;
  }

  // Assets locales: cache-first con fallback a network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
        }
        return response;
      }).catch(() => {
        // Offline fallback: servir index.html para navegación
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// ── PUSH NOTIFICATIONS (listo para conectar) ─────────────
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || 'Nueva notificación de FlowFinance',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: data.actions || [],
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'FlowFinance', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
