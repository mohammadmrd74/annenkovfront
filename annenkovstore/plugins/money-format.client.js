import MoneyFormat from 'vue-money-format'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MoneyFormat);
}); 