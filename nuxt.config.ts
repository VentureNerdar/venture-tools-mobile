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
});
