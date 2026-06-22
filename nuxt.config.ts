// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-22',
  devtools: { enabled: false },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  modules: ['@nuxtjs/tailwindcss']
});
