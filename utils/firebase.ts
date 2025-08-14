// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const config = useRuntimeConfig()

interface FirebaseConfig {
  public: {
    firebase: {
      apiKey: string
      authDomain: string
      projectId: string
      storageBucket: string
      messagingSenderId: string
      appId: string
      measurementId: string
      vapidKey: string
    }
  }
}

// Check if Firebase config exists
if (!config.public?.firebase) {
  console.error('Firebase configuration is missing')
  throw new Error('Firebase configuration is missing')
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: (config as unknown as FirebaseConfig).public.firebase.apiKey,
  authDomain: (config as unknown as FirebaseConfig).public.firebase.authDomain,
  projectId: (config as unknown as FirebaseConfig).public.firebase.projectId,
  storageBucket: (config as unknown as FirebaseConfig).public.firebase.storageBucket,
  messagingSenderId: (config as unknown as FirebaseConfig).public.firebase.messagingSenderId,
  appId: (config as unknown as FirebaseConfig).public.firebase.appId,
  measurementId: (config as unknown as FirebaseConfig).public.firebase.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// if (process.client) {
//   getAnalytics(app)
// }
// const analytics = getAnalytics(app)
// const messaging = getMessaging(app)

export { app }
// export { messaging }
