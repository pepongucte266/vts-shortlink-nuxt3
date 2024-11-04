// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appUrl: process.env.App_URL || 'http://localhost:3000',
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', "@nuxthub/core"],
  supabase: { redirect: false , },
  hub: {
    database: true
  },
  nitro: {
    experimental: {
      tasks: true
    }
  },
  $development: {
    hub: {
      remote: true
    }
  },
  compatibilityDate: '2024-11-04',
})