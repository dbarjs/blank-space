// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Blank Space',
    }
  },
  theme: 'dark',
  css: [
    'normalize.css/normalize.css'
  ],
  modules: [
    '@vueuse/nuxt'
  ],
  typescript: {
    shim: false
  },
  vite: {
    css: {
      devSourcemap: true
    }
  },
})
