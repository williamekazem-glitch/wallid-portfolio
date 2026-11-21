/* Service worker du portfolio Wallid.
 * Objectif : l'appli installée s'ouvre même sur réseau faible ou coupé
 * (3G instable), sans jamais bloquer les mises à jour du site.
 *  - Pages : réseau d'abord ; si le réseau est trop lent (> 4 s) ou coupé,
 *    version en cache ; sinon page « Pas de connexion ».
 *  - Fichiers /_next/static (noms à empreinte, immuables) : cache d'abord.
 *  - Images et autres fichiers du site : cache puis mise à jour en arrière-plan.
 * Changer VERSION vide les anciens caches à la prochaine visite.
 */
const VERSION = "v1";
const PAGES = "wallid-pages-" + VERSION;
const STATIC = "wallid-static-" + VERSION;
const ASSETS = "wallid-assets-" + VERSION;
const OFFLINE_URL = "/offline.html";
const PRECACHE = ["/", OFFLINE_URL, "/wallid-avatar.jpg", "/icon-192.png"];
const NETWORK_TIMEOUT_MS = 4000;
const MAX_ASSETS = 80;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGES).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith("wallid-") && ![PAGES, STATIC, ASSETS].includes(k))
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function handlePage(request) {
  const cache = await caches.open(PAGES);
  const network = fetch(request).then((res) => {
    if (res.ok && res.type === "basic") cache.put(request, res.clone());
    return res;
  });
  network.catch(() => {}); // évite une erreur non gérée si le cache a déjà répondu
  const cached = await cache.match(request, { ignoreSearch: true });
  try {
    if (!cached) return await network;
    // Réseau lent : on sert la copie en cache, le réseau met le cache à jour.
    const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_TIMEOUT_MS));
    return await Promise.race([network, timeout]);
  } catch (e) {
    return cached || (await cache.match(OFFLINE_URL)) || Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS);
  // Cherche dans tous les caches (les images préchargées sont dans PAGES).
  const hit = await caches.match(request);
  const network = fetch(request).then((res) => {
    if (res.ok && res.type === "basic") {
      cache.put(request, res.clone()).then(() => trim(ASSETS, MAX_ASSETS));
    }
    return res;
  }).catch(() => hit);
  return hit || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // WhatsApp, réseaux sociaux… : non touchés
  if (url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(handlePage(request));
    return;
  }
  // Données de navigation internes de Next.js : toujours le réseau.
  if (request.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }
  if (
    url.pathname.startsWith("/_next/image") ||
    /\.(png|jpe?g|webp|avif|svg|ico|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
