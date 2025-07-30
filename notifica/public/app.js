import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4Pfj-ETDoShEomPgJLwhAieqxX5jxNVw",
  authDomain: "borreguito-push.firebaseapp.com",
  projectId: "borreguito-push",
  storageBucket: "borreguito-push.firebasestorage.app",
  messagingSenderId: "1050243032967",
  appId: "1:1050243032967:web:778188baaa30fbd1fcd522"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getDatabase(app);

navigator.serviceWorker.register('firebase-messaging-sw.js')
  .then(reg => console.log("✅ SW registrado correctamente"))
  .catch(err => console.error("❌ Error al registrar SW:", err));

document.getElementById('subscribeBtn').addEventListener('click', async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      document.getElementById('notiStatus').textContent = "❌ Permiso de notificación denegado";
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BEHPz0tq__2n5tYAWAqtxAFFZud3gIHk2Ii_CaiDAvDiA8HDsSiGqrTw-wbpSfJYYIAjAd6M5pgCSSZ5NOjVl8U"
    });

    if (token) {
      await set(ref(db, 'tokens/' + token), { timestamp: Date.now() });
      document.getElementById('notiStatus').textContent = "✅ Registración exitosa";
    } else {
      document.getElementById('notiStatus').textContent = "❌ No se obtuvo el token";
    }
  } catch (err) {
    console.error("❌ Error al registrar token:", err);
    document.getElementById('notiStatus').textContent = "❌ Error al registrar token";
  }
});

const ofertaDiv = document.getElementById("oferta");
onValue(ref(db, 'oferta/actual'), (snapshot) => {
  const texto = snapshot.val();
  ofertaDiv.textContent = texto ? `🛍🐑 Borreguito te ofrece: ${texto}` : '';
});
