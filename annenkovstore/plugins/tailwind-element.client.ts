import twelements from 'tw-elements/dist/plugin';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(twelements);
});