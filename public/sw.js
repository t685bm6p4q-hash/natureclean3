/**
 * COUCHE 2 — SERVICE WORKER PWA NATURE CLEAN
 *
 * Strategie : Stale-While-Revalidate pour les assets,
 * Network-First pour les pages HTML,
 * Cache-First pour les fonts et images.
 *
 * Resultat : Le site se charge instantanement depuis le cache
 * meme sans connexion (tunnel, metro, zone blanche).
 */

const CACHE_VERSION = 'nc-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

/** Assets critiques a precacher au premier chargement */
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/logo.svg',
];

// -----------------------------------------
// INSTALLATION : Precache des assets critiques
// -----------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// -----------------------------------------
// ACTIVATION : Nettoyage des anciens caches
// -----------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('nc-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// -----------------------------------------
// FETCH : Strategie de cache intelligente
// -----------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requetes non-GET et les API
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  // Images Cloudinary : Cache-First (migration Unsplash → Cloudinary)
  if (url.hostname === 'res.cloudinary.com') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Images Unsplash (legacy, plus utilisé) : Cache-First
  if (url.hostname === 'images.unsplash.com') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Assets statiques (JS, CSS, fonts) : Cache-First
  if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js') || url.pathname.endsWith('.woff2')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Pages HTML : Network-First (toujours fraiches si possible)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Tout le reste : Stale-While-Revalidate
  event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
});

// -----------------------------------------
// STRATEGIES DE CACHE
// -----------------------------------------

/** Cache-First : retourne le cache, fetch en backup */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

/** Network-First : tente le reseau, fallback cache */
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback : page d'accueil (SPA)
    const fallback = await caches.match('/index.html');
    return fallback || new Response('Offline', { status: 503 });
  }
}

/** Stale-While-Revalidate : retourne le cache immediatement, refresh en background */
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}