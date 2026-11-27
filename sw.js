const C="reps-v1113";const A=["./","index.html","manifest.webmanifest","icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
// Only the app shell is handled: instant from cache, refreshed in background. Everything else goes straight to the network.
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==location.origin)return;
 const p=u.pathname;if(!(r.mode==="navigate"||/\/(index\.html|manifest\.webmanifest|icon\.svg)$/.test(p)))return;
 const key=r.mode==="navigate"?"index.html":r;
 e.respondWith(caches.open(C).then(c=>c.match(key,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r.mode==="navigate"?"index.html":r).then(x=>{if(x&&x.ok)c.put(key,x.clone()).catch(()=>{});return x});
  if(hit){e.waitUntil(net.catch(()=>{}));return hit}
  return net})))});
