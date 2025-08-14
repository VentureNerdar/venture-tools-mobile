// public/firebase-messaging-sw.js
// importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js")
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
// )
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
)

firebase.initializeApp({
  apiKey: "AIzaSyCEUKstDpzhD8AI_xwxaqsjQcUVvRhzB9o",
  authDomain: "venture-notification.firebaseapp.com",
  projectId: "venture-notification",
  storageBucket: "venture-notification.firebasestorage.app",
  messagingSenderId: "418184685737",
  appId: "1:418184685737:web:ac89b7fed4ccd321e321b8",
  // measurementId:
})

// const messaging = firebase.messaging()

// messaging.onBackgroundMessage((payload) => {
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//   })
// })

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  )
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo-vertical.png",
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
