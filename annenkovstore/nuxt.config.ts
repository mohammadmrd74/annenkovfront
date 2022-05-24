import { defineNuxtConfig } from 'nuxt'
import flowbite from 'flowbite';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  
  buildModules:['@nuxtjs/tailwindcss'],
  
  css: ["@/assets/sass/_global.scss"]
})