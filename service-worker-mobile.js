/* Service Worker del panel móvil (movil.medique.cl) — SOLO este dominio, nunca portal.medique.cl.
   Objetivo (pedido del usuario): abrir la app agregada a la pantalla de inicio del iPhone AL
   INSTANTE desde caché, sin pantalla de carga, y que se actualice sola en segundo plano —
   "stale-while-revalidate". Sin esto, JC_Mobile.html tiene Cache-Control: no-cache (a propósito,
   para que el HTML siempre traiga la referencia correcta a los bundles ?v=NN más nuevos), así que
   cada apertura forzaba una espera de red completa antes de mostrar nada. El Service Worker
   intercepta esa petición y responde desde SU PROPIO caché (independiente del Cache-Control del
   servidor), mientras pide la versión fresca por red en paralelo para la próxima apertura. */
const CACHE_NAME = 'medique-movil-v1';

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // nunca intercepta Firebase/Groq/fuentes/WhatsApp/etc.

  // Navegación (abrir o recargar la app): responde AL INSTANTE desde caché si existe, y en
  // paralelo pide la versión fresca por red para dejarla lista para la PRÓXIMA apertura — no
  // bloquea ni recarga la pantalla que el usuario ya tiene abierta.
  if (req.mode === "navigate") { event.respondWith(staleWhileRevalidate(req)); return; }

  // Archivos propios versionados (dist/*.js, jcm_*.js, /assets/*): cache-first. Ya vienen con
  // Cache-Control inmutable de un año por HTTP (vercel.json); esto es un refuerzo para el modo
  // standalone en iOS, donde el caché HTTP normal puede evictarse antes que el de un Service Worker.
  if (/\/dist\/.+\.js$/.test(url.pathname) || /^\/jcm_[\w.]+\.js$/.test(url.pathname) || url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(req));
  }
});

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request).then((res) => {
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  }).catch(() => null);
  if (cached) return cached;
  return (await network) || new Response("Sin conexión y sin caché todavía.", { status: 503 });
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}
