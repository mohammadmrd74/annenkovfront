<template>
  <div class="container mx-auto md:p-10 px-2" style="min-height:70vh">
    <h1 class="text-xl font-bold my-3">خانواده آننکوف</h1>
    <div class="grid md:grid-cols-3 gap-2 grid-cols-2">
      <div v-for="(img, i) in anenfamily.data.images" :key="i">
        <div v-if="!img.src.includes('mp4')" style="position:relative">
          <img :src="img.src" />
          <p class="img_title text-sm md:text-base">{{ img.title }}</p>
        </div>
        <div v-else style="position:relative">
          <p class="img_title text-xs md:text-base">{{ img.title }}</p>
          <video autoplay muted :src="img.src"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: ' خانواده آننکوف  |  آننکوف استور',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'درباره ما آننکوف استور' }]
})

const { data: anenfamily } = await useAsyncData('family', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/family')
)
</script>

<style>
.img_title{
    position: absolute;
    bottom: 15px;
    font-weight: 500;
    right: 5px;
    background: white;
    padding: 8px;
    border-radius: 10px;

}
</style>
