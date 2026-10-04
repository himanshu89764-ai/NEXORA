
/* NEXORA_MOBILE_AUTO_UPDATE_V1 */
const NEXORA_MOBILE_BUILD = "20261004-01";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => !k.includes(NEXORA_MOBILE_BUILD))
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* NEXORA_PWA_STANDALONE_20261003 */
const CACHE_NAME = 'nexora-cache-v20261004-01';
const CACHE="nexora-pwa-v1";self.addEventListener("install",e=>self.skipWaiting());self.addEventListener("activate",e=>self.clients.claim());self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))})
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
