const CACHE_NAME = 'nexora-v-20261003-155457';
const CACHE="nexora-pwa-v1";self.addEventListener("install",e=>self.skipWaiting());self.addEventListener("activate",e=>self.clients.claim());self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))})
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
