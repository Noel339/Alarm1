const CACHE_NAME = 'nomikai-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});

self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(clients.matchAll({ type: 'window' }).then(list => {
        if (list.length > 0) return list[0].focus();
        return clients.openWindow('./');
    }));
});
