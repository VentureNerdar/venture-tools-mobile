// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  devServer: {
    port: 3002,
  },

  ssr: false,

  modules: ["@nuxt/eslint", "@vant/nuxt"],
  plugins: ["~/plugins/pinia.ts"],

  vant: {
    defaultLocale: "en-US",
  },

  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      apiURL: process.env.API_URL || "http://10.0.2.2:8000/api/",
      apiURLUnSlashed:
        process.env.API_URL_UNSLASHED || "http://10.0.2.2:8000/api/",

      rootURL: process.env.ROOT_URL || "http://10.0.2.2:8000/api/",
      rootURLUnSlashed:
        process.env.ROOT_URL_UNSLASHED || "http://10.0.2.2:8000/api/",

      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        vapidKey: process.env.FIREBASE_VAPID_KEY,
      },

      // apiURL: "http://api.venture-tools.klonotech.com/api/",
      // apiURLUnSlashed: "http://api.venture-tools.klonotech.com/api",

      // rootURL: "http://api.venture-tools.klonotech.com/",
      // rootURLUnSlashed: "http://api.venture-tools.klonotech.com",
    },
  },
  app: {
    head: {
      script: [
        {
          // src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`,
          src: `https://maps.googleapis.com/maps/api/js?loading=async&libraries=places&key=${process.env.GOOGLE_MAPS_API_KEY}`,
          async: true,
          defer: true,
        },
      ],
    },
  },
})
