
const STATIC_CACHE = 'stativ-v1'


const staticAssets = ['/', '/index.html', '/favicon.ico', '/manifest.json',
    '/script/webpack-bundle.js']
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function (cache) {
            console.log('Service worker installed')
            return cache.addAll(staticAssets);
        }).catch(error => console.log(error))
    );
});

self.addEventListener('activate', function (event) {
    console.log('Service worker activated')
})

self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response) {
            return response
        }
        return fetch(event.request).then(function (response) {
            return caches.open(STATIC_CACHE).then(function (cache) {
                cache.put(event.request, response.clone())
                return response
            })
        })
    }))
})