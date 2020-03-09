importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js");
importScripts("/fcmconfig.js")

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BCr5QZa0YzhST1PGhAGBe-rV1ZIS_orfSUF2oo_1QASxqC4cOpgr-vCVnjHVuNb7VRvTF0_7ud5-UtcueZAMcy0");

console.log('this is my custom service worker');

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// workbox.routing.registerRoute(
//     'https://newsapi.org/v2/top-headlines?country=in&apiKey=dfcd91fa823d419c81a1cdbbf7f0f68a',
//     new workbox.strategies.NetworkFirst({ cacheName: 'top-news' })
// );