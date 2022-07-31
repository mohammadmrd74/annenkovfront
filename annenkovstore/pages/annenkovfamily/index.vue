<template>
  <div class="container mx-auto md:p-10" style="min-height:70vh">
      
    <h1 class="text-xl font-bold my-3">خانواده آننکوف</h1>
    <div class="grid md:grid-cols-3 gap-2 grid-cols-2">
     <div v-for="(img, i) in anenfamily.data.images" :key="i">
        <img  v-if="!img.includes('mp4')"  :src="img" />
        <video autoplay muted v-else :src="img"></video>
      </div>
    </div>
    
  </div>
</template>

<script setup>
useHead({
  title: ' خانواده آننکوف  |  آننکوف استور',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'درباره ما آننکوف استور' }
  ]

  
})

const { data: anenfamily } = await useAsyncData('family', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/family')
)
</script>

