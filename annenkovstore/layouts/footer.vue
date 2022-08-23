<template>
  <footer class="  p-4 bg-gray-100 mt-10 sm:p-6 dark:bg-gray-800">
    <div class="container mx-auto md:flex md:justify-between">
      <div
        class="mb-6 md:mb-0 flex grid md:grid-cols-4 w-100 grow justify-center gap-2 grid-cols-2"
      >
        <a href="https://annenkovstore.com" class="flex items-center">
          <img src="~/assets/logo.jpg" class="mr-3 h-8" alt="FlowBite Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mx-2 mt-1"
            >آننکوف استور</span
          >
        </a>
        <div class="mr-10">
          <h2
            class="my-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
          >
            ما را دنبال کنید
          </h2>
          <ul class="text-gray-600 dark:text-gray-400">
            <li class="mb-4">
              <a
                href="https://www.instagram.com/annenkovstore/"
                class="hover:underline flex"
              >
                اینستاگرام
              </a>
            </li>
            <li>
              <a href="https://wa.link/19kpt3" class="hover:underline flex">
                پشتیبانی واتساپ</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h2
            class=" text-sm mt-6 font-semibold text-gray-900 uppercase dark:text-white"
          >
            آننکوف استور
          </h2>
          <nuxt-link
            v-for="page in navigation.pages"
            :key="page.name"
            :to="page.href"
            class="mt-3 flex text-gray-600 dark:text-gray-400"
            >{{ page.name }}</nuxt-link
          >
        </div>

        <div class="flex jusitfy-end items-center">
          <a href="javascript:showZPTrust();" title="دروازه پرداخت معتبر">
            <img
              width="80px"
              class="cursor-pointer"
              src="https://cdn.zarinpal.com/badges/trustLogo/1.svg"
              alt="دروازه پرداخت معتبر"
            />
          </a>
          <a
            referrerpolicy="origin"
            target="_blank"
            style="min-height:115px; max-width: 90px;"
            class="border mx-5 items-center justify-center flex rounded-md"
            href="https://trustseal.enamad.ir/?id=291376&amp;Code=6KYf5dvH47oyHqyYv5g3"
          >
            <img
              class="w-100 m-auto"
              src="~/assets/images/enamad-b8f9b6ac.png"
              width="75"
              height="75"
              alt="نماد اعتماد الکترونیک"
              style="object-fit: contain;"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://www.zarinpal.com/webservice/TrustCode',
      async: true
    },
    {
      src: '/plugins/hotjar.client.js',
      async: true
    }
  ]
})
const navigation = {
  pages: [
    { name: 'درباره  ما', href: '/aboutus' },
    { name: 'تماس با ما', href: '/contactus' },
    { name: 'قوانین و مقررات', href: '/rules' }
  ]
}
</script>

<style></style>
