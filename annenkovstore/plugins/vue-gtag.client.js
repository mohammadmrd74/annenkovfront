import { defineNuxtPlugin } from '#app'
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const getGDPR = localStorage.getItem('GDPR:accepted');
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-BH9GPZPFE6'
    },
    appName: 'annenkovstore',
    enabled: getGDPR === 'true',
    pageTrackerScreenviewEnabled: true
  }, nuxtApp.vueApp.router);
});