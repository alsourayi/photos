const C="reps-v1110";const A=["./","index.html","manifest.webmanifest","icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 const net=fetch(e.request).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{})}return r});
 const cached=()=>caches.match(e.request);
 const to=new Promise(res=>setTimeout(()=>cached().then(res,()=>res(undefined)),6000));
 e.respondWith(Promise.race([net.catch(cached),to]).then(r=>r||net))});
