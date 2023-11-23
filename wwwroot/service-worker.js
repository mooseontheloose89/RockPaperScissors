
self.addEventListener('install', event => {
    console.log('Attempting to install the service worker and cache static assets')
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/index.html',
                '/CSS/styles.css',
                '/JS/script.js',

            ]).catch(error => {
                console.log("Failed to cache:", error);
            });
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
