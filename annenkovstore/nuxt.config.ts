import { defineNuxtConfig } from 'nuxt'


// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  
  buildModules:['@nuxtjs/tailwindcss', '@pinia/nuxt'],

    build: {
      transpile: ['@heroicons/vue']
  },
  
  css: ["@/assets/sass/_global.scss"],


  runtimeConfig: {
    secretKey: '', // variable that can only be accessed on the server side
    public: {
      BASE_URL: process.env.BASE_URL || 'https://annenkovstore.ir/api/v1.0' // variable that can also be accessed on the client side
    }
  },

})