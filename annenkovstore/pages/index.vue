<template>
  <div class="container mx-auto">
    <Carousel></Carousel>
    <section class="px-3 mt-10">
      <div class=" flex justify-between w-full">
        <div class="swiperTitle">فروش ویژه</div>
        <nuxt-link to="/products?discount=true" class="text-left"
          >مشاهده همه</nuxt-link
        >
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="isDesktop ? 4 : 2"
        :cssMode="isDesktop ? true : false"
        :navigation="isDesktop ? true : false"
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
            class="w-full cursor-pointer aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <span class="discount"
            >&#37;{{
              Math.floor(
                ((product.price - product.totalPrice) / product.price) * 100
              )
            }}</span
          >
          <h2 class="mt-4 text-sm font-semibold text-gray-700">
            {{ product.brand }} <span class="mx-1">{{ product.title }} </span>
          </h2>
          <p class="mt-1 text-sm font-medium text-gray-500">
            {{ product.styleNumber }}
          </p>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{
              product.totalPrice
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }}
            تومان
          </p>
        </swiper-slide>
      </swiper>
    </section>

    <section class="px-3 mt-10">
      <div class=" flex justify-between w-full">
        <div class="swiperTitle">آخرین محصولات</div>
        <nuxt-link to="/products" class="text-left">مشاهده همه</nuxt-link>
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="isDesktop ? 4 : 2"
        :space-between="30"
        :pagination="pagination"
        :cssMode="isDesktop ? true : false"
        :navigation="isDesktop ? true : false"
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
            class="w-full cursor-pointer aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h2 class="mt-4  font-semibold text-gray-700">
            {{ product.brand }} <span class="mx-1">{{ product.title }} </span>
          </h2>
          <p class="mt-1 text-sm font-medium text-gray-500">
            {{ product.styleNumber }}
          </p>

          <p class="mt-1 text-lg font-medium text-gray-900">
            {{
              product.totalPrice
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }}
            تومان
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
    useHead({
      title: 'فروشگاه اینترنتی آننکوف استور | Annenkov Store',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      meta: [
        {
          name: 'description',
          content:
            'خرید انواع کفش و اسنیکرز برند آدیداس ، ماسیمو دوتی ، زارا، اکو ، نیوبالانس ، نایک ، پوما اورجینال و اصل با بهترین قیمت و سریعترین زمان ارسال'
        },
        { property: 'og:locale', content: 'fa_IR' },
        {
          property: 'og:title',
          content:
            ' فروشگاه اینترنتی آننکوف استور بهترین قیمت کفش اورجینال | Annenkov Store'
        },{
          property: 'og:description',
          content:
            'خرید انواع کفش و اسنیکرز برند آدیداس ، زارا، ماسیمو دوتی ، اکو ، نیوبالانس ، نایک ، پوما اورجینال و اصل با بهترین قیمت و سریعترین زمان ارسال'
        },
        {
          property: 'og:url',
          content:
            'https://annenkovstore.ir/'
        },
        {
          property: 'og:site_name',
          content:
            'آننکوف استور'
        },
        {
          property: 'og:updated_time',
          content:
            '2022-08-13T14:11:56+04:30'
        },
        {
          property: 'og:image',
          content:
            'https://annenkovstore.ir/_nuxt/logo.0e5474c5.jpg'
        },
        {
          property: 'twitter:card',
          content:
            'summary_large_image'
        },
        {
          property: 'twitter:title',
          content:
            'فروشگاه اینترنتی آننکوف استور | Annenkov Store'
        },
        {
          property: 'twitter:description',
          content:
            'خرید انواع کفش و اسنیکرز برند آدیداس ، ماسیمو دوتی ، زارا، اکو ، نیوبالانس ، نایک ، پوما اورجینال و اصل با بهترین قیمت و سریعترین زمان ارسال'
        },
        {
          property: 'twitter:image',
          content:
            'https://annenkovstore.ir/_nuxt/logo.0e5474c5.jpg'
        },
        {
          property: 'twitter:label1',
          content:
            'Written by'
        },
        {
          property: 'twitter:data1',
          content:
            'Time to read'
        },
        {
          property: 'twitter:label2',
          content:
            'Mohammad'
        },
        {
          property: 'twitter:data2',
          content:
            'کمتر از یک دقیقه'
        },
        
      ],
      link: [{ rel: 'canonical', href: 'https://annenkovstore.ir/' }]
    })
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

    const isDesktop = computed(() => {
      if (process.client) {
        return window.innerWidth > 900
      }
      return -1
    })

    return {
      landingItems,
      isDesktop,
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
.discount {
  position: absolute;
  top: 17px;
  left: 10px;
  background: #bfe7bf;
  padding: 11px;
  border-radius: 13px;
}
.swiper-pagination {
  bottom: -3px !important;
}
.swiper {
  padding: 15px 0px !important;
}

.swiper-button-next {
  border-top-right-radius: 8px;
  background: white;
  box-shadow: 2px 1px 10px 2px #88888840;
  width: 40px;
  height: 93px;
  top: 41%;
  left: 0 !important;
  color: #3c3a3a;
  border-bottom-right-radius: 8px;
}
.swiper-button-prev {
  border-top-left-radius: 8px;
  background: white;
  box-shadow: 2px 1px 10px 2px #88888840;
  width: 40px;
  color: #3c3a3a;
  height: 93px;
  top: 41%;
  right: 0px !important;
  border-bottom-left-radius: 8px;
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
  width: 25%;
}
</style>
