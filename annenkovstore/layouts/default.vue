<template>
  <div>
    <NuxtLayout name="header"> </NuxtLayout>
    <main>
      <slot />
    </main>
    <NuxtLayout name="footer"> </NuxtLayout>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
nuxtApp.hook("page:finish", () => {
     window.scrollTo(0, 0)
  })</script>
