// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js')
importScripts(
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
)

firebase.initializeApp({
    apiKey: 'AIzaSyCEUKstDpzhD8AI_xwxaqsjQcUVvRhzB9o',
    authDomain: 'venture-notification.firebaseapp.com',
    projectId: 'venture-notification',
    messagingSenderId: '418184685737',
    appId: '1:418184685737:web:ac89b7fed4ccd321e321b8'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body
    })
})
