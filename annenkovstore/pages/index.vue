<template>
  <div>
    <Carousel></Carousel>
    <section class="px-3 mt-10">
      <div class="swiperTitle">
        فروش ویژه
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="30"
        :pagination="pagination"
      >
        <swiper-slide
          v-for="product in landingItems.data.inSale"
          :key="product.productId"
          tag="div"
          @click="
            openUrl(
              `/products/${product.productId}/${product.title
                .replace(/\//g, '-')
                .replace(/ /g, '-')}`
            )
          "
          class="group py-2"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h2 class="mt-4 text-sm font-semibold text-gray-700">
            {{ product.title }}
          </h2>
          <h3 class="mt-1 text-sm  text-gray-700">
            {{ product.brand }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }} تومان
          </p>
        </swiper-slide>
      </swiper>
    </section>

    <section class="px-3 mt-10">
      <div class="swiperTitle">
        آخرین محصولات
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="30"
        :pagination="pagination"
      >
        <swiper-slide
          v-for="(product, i) in landingItems.data.newProducts"
          :key="i"
          @click="
            openUrl(
              `/products/${product.productId}/${product.title
                .replace(/\//g, '-')
                .replace(/ /g, '-')}`
            )
          "
          tag="div"
          class="group py-2"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h2 class="mt-4  font-semibold text-gray-700">
            {{ product.title }}
          </h2>
          <h3 class="mt-1 text-sm font-semibold text-gray-700">
            {{ product.brand }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }} تومان
          </p>
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>
<script>
import Carousel from '@/components/main/carousel.vue'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'



// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
    Carousel
  },
  async setup () {
    
    const { data: landingItems } = await useAsyncData('landingItems', () =>
      $fetch(useRuntimeConfig().public.BASE_URL + '/landingItems')
    )
    const onSwiper = swiper => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    const openUrl = url => {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: url
      }).click()
    }

    return {
      landingItems,
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>'
        }
      },
      openUrl,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y]
    }
  }
}
</script>

<style lang="scss">
.swiper-pagination {
  bottom: -3px !important;
}
.swiper {
  padding: 15px 0px !important;
}

.swiper-pagination-bullet {
  border-radius: 0px !important;
  height: 2px !important;
  width: 16px !important;
}
.swiper-pagination-bullet-active {
  background: #000 !important;
}
.swiperTitle {
  padding: 5px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 3px solid;
  width: 50%;
}
</style>
