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
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="product in products"
          :key="product.id"
          :href="product.href"
          class="group py-2"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ product.name }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }}
          </p>
        </swiper-slide>
      </swiper>
    </section>

    <section class="px-3 mt-10">
      <div class="swiperTitle">
        در حراج
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="30"
        :pagination="pagination"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="product in products"
          :key="product.id"
          :href="product.href"
          class="group py-2"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ product.name }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }}
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
  setup () {
    const products = [
      {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt:
          'Tall slender porcelain bottle with natural clay textured body and cork stopper.'
      },
      {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt:
          'Olive drab green insulated bottle with flared screw lid and flat top.'
      },
      {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt:
          'Person using a pen to cross a task off a productivity paper card.'
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt:
          'Hand holding black machined steel mechanical pencil with brass tip and top.'
      }
      // More products...
    ]
    const onSwiper = swiper => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      products,
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          console.log(className)
          return '<span class="' + className + '"></span>'
        }
      },
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
