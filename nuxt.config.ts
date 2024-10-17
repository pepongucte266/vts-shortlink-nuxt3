// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appUrl: process.env.App_URL || 'https://vts-shortlink-nuxt3.vercel.app',
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', "@nuxthub/core"],
  supabase: { redirect: false , }
})