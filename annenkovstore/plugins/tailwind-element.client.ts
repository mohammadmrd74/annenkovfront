import twelements from 'tw-elements/dist/js/index.min.js';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(twelements);
});