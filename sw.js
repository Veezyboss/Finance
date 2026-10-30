const V='bpf-v2',A=['./','index.html','manifest.webmanifest','icons/icon-96.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(c=>{const n=fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const cl=r.clone();caches.open(V).then(x=>x.put(e.request,cl))}return r}).catch(()=>c||(e.request.mode==='navigate'?caches.match('index.html'):Response.error()));return c||n}))});
self.addEventListener('push',e=>{const d=e.data?e.data.text():'Time to update your records';e.waitUntil(self.registration.showNotification('Bright Path Finance',{body:d,icon:'icons/icon-192.png',badge:'icons/icon-96.png'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('./'))});
self.addEventListener('sync',e=>{if(e.tag==='sync-notes')e.waitUntil(Promise.resolve())});
self.addEventListener('periodicsync',e=>{if(e.tag==='refresh-app')e.waitUntil(caches.open(V).then(c=>c.addAll(A)))});
