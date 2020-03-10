importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js");
importScripts("/fcmconfig.js")

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(FCM_PUBLIC_KEY);

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

