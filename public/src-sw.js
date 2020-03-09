importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

console.log('this is my custom service worker');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
    'https://newsapi.org/v2/top-headlines?country=in&apiKey=dfcd91fa823d419c81a1cdbbf7f0f68a',
    new workbox.strategies.NetworkFirst({ cacheName: 'top-news' })
);