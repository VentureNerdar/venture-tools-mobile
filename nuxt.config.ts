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
      apiURL: "http://localhost:8000/api/",
      apiURLUnSlashed: "http://localhost:8000/api",

      rootURL: "http://localhost:8000/",
      rootURLUnSlashed: "http://localhost:8000",

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
          src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.GOOGLE_MAPS_API_KEY}`,
          async: true,
          defer: true,
        },
      ],
    },
  },
})
