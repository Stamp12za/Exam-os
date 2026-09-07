const CACHE="exam-os-complete-v4";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./index.html","./manifest.json"]))) });
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(x=>{let c=x.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return x}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))))});
