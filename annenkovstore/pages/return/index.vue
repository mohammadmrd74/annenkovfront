<template>
  <div style="min-height: 70vh" class="container mx-auto md:p-12 px-3 pt-8">
    <div
      v-if="route.query.Status === 'NOK'"
      class="border md:p-8 py-8 px-3 rounded-lg"
    >
      <div class="text-xl font-bold text-orange-600">
        پرداخت ناموفق
      </div>
      <div class="text-lg mt-3">
        متاسفانه پرداخت شما با اشکال رو به رو شد.
      </div>
      <div class="text-lg mt-3 mb-6">
        در صورت کسر وجه از حساب شما، مبلغ واریزی تا ۷۲ ساعت بعد به حساب شما
        بازگردانده می‌شود.
      </div>
      <div class="text-left">
        <a
          href="/"
          class="text-lg  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700"
        >
          بازگشت به صفحه اصلی
        </a>
      </div>
    </div>
    <div v-else class="border md:p-8 py-8 px-3 rounded-lg">
      <div v-if="success" class="text-xl font-bold text-green-500">
        پرداخت شما با موفقیت انجام شد
      </div>
      <div v-if="loading && success" class="text-lg mt-3 mb-6">
        در حال ثبت خرید...
        <div
          class="spinner-border animate-spin inline-block w-4 h-4 border-2 mx-3 rounded-full"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="success && !loading" class="text-lg mt-3 mb-6">
        کد پیگیری: {{ refId }}
      </div>
      <div v-if="!success" class="text-lg mt-3 mb-6">
        متاسفانه خرید شما با اشکال رو به رو شد. لطفا با پشتیبانی تماس بگیرید.
      </div>
      <nuxt-link
        v-if="!success"
        to="/contacts"
        class="text-lg text-indigo-700 mt-3 mb-6"
      >
        پشتیبانی
      </nuxt-link>
      <div class="text-left ">
        <a
          href="/users"
          class="text-lg  md:inline block   text-center  py-2 md:mx-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700"
        >
          مشاهده سفارش
        </a>
        <a
          href="/"
          class="text-lg md:inline block text-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600"
        >
          بازگشت به صفحه اصلی
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authstore = useAuthStore()
useHead({
  title: 'آننکوف استور',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'آننکوف استور' }]
})
const route = useRoute()
const isUser = authstore.getIsUser
const refId = ref('')
const loading = ref(true)
const success = ref(true)

onMounted(async () => {
  console.log(isUser)
  console.log(route.query.Status)
  if (route.query.Status === 'OK') {
    try {
      const res = await $fetch(
        useRuntimeConfig().public.BASE_URL + '/confirmorder',
        {
          method: 'POST',
          body: {
            orderId: authstore.getOrderAmount.id,
            amount: authstore.getOrderAmount.amount,
            authority: route.query.Authority
          },
          headers: {
            Authorization: `Bearer ${authstore.getToken}`
          }
        }
      )

      loading.value = false
      refId.value = res.data.refId
    } catch (error) {
      loading.value = false
      success.value = false
      console.log('me', error)
    }
  }
})
</script>

<style></style>
