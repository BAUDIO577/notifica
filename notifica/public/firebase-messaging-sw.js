importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB4Pfj-ETDoShEomPgJLwhAieqxX5jxNVw",
  authDomain: "borreguito-push.firebaseapp.com",
  projectId: "borreguito-push",
  storageBucket: "borreguito-push.firebasestorage.app",
  messagingSenderId: "1050243032967",
  appId: "1:1050243032967:web:778188baaa30fbd1fcd522"
});

const messaging = firebase.messaging();
