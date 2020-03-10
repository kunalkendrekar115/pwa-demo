importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAaAxu-0MrkvP-I8VapbTghCzbWfCUI99k",
    authDomain: "fcmdemo-d37f6.firebaseapp.com",
    databaseURL: "https://fcmdemo-d37f6.firebaseio.com",
    projectId: "fcmdemo-d37f6",
    storageBucket: "fcmdemo-d37f6.appspot.com",
    messagingSenderId: "1027007988898",
    appId: "1:1027007988898:web:a9c48c4995aba057ae43fb"
});

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BCr5QZa0YzhST1PGhAGBe-rV1ZIS_orfSUF2oo_1QASxqC4cOpgr-vCVnjHVuNb7VRvTF0_7ud5-UtcueZAMcy0");

console.log('this is my custom service worker');

// messaging.setBackgroundMessageHandler(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
const { routing } = workbox
const { StaleWhileRevalidate, NetworkFirst, CacheFirst, NetworkOnly } = workbox.strategies


routing.registerRoute(
    'https://newsapi.org/v2/top-headlines?country=in&apiKey=dfcd91fa823d419c81a1cdbbf7f0f68a',
    new StaleWhileRevalidate({ cacheName: 'top-news' })
);

