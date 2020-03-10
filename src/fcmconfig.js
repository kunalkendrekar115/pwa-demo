import * as firebase from 'firebase/app'
import '@firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAaAxu-0MrkvP-I8VapbTghCzbWfCUI99k",
  authDomain: "fcmdemo-d37f6.firebaseapp.com",
  databaseURL: "https://fcmdemo-d37f6.firebaseio.com",
  projectId: "fcmdemo-d37f6",
  storageBucket: "fcmdemo-d37f6.appspot.com",
  messagingSenderId: "1027007988898",
  appId: "1:1027007988898:web:a9c48c4995aba057ae43fb"
};

const FCM_PUBLIC_KEY = "BCr5QZa0YzhST1PGhAGBe-rV1ZIS_orfSUF2oo_1QASxqC4cOpgr-vCVnjHVuNb7VRvTF0_7ud5-UtcueZAMcy0"


export const initializeFirebase = () => {

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(FCM_PUBLIC_KEY);
}

export const getFCMToken = () => {

  console.log('Getting FCM token')

  return new Promise((resolve, reject) => {

    navigator.serviceWorker.ready
      .then((registration) => {

        console.log('Service worker is ready')
        
        const messaging = firebase.messaging();

        if (!messaging.swRegistration)
          messaging.useServiceWorker(registration);

        messaging.getToken().then((currentToken) => {
          resolve(currentToken)
        }).catch((err) => {
          reject(err)
        });
      })
      .catch((error) => reject(error))
  })
}

export const addPushMessageListener = (callback) => {
  const messaging = firebase.messaging();
  messaging.onMessage((payload) => {
    callback(payload)
  })
}