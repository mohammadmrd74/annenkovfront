<template>
  <div class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          class="max-w-2xl mx-auto px-4 my-3 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div class="flex items-center">
              <a class="mr-2 text-sm font-medium text-gray-900">
                {{ product1.data.products[0].categoryTitle }}
              </a>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <a class="mr-2 text-sm font-medium text-gray-900">
                {{ product1.data.products[0].mainType }}
              </a>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <a
              aria-current="page"
              class="font-medium text-gray-500 hover:text-gray-600"
            >
              {{ product1.data.products[0].brandNameFa }}
            </a>
          </li>
        </ol>
      </nav>

      
        <div
        v-if="product1.data.products[0].images"
          :href="product1.data.products[0].images[0]"
        >
          <img :src="selectedImg" />
        </div>
        <a
        v-for="(img, j) in product1.data.products[0].images"
            :key="j"
          :href="img"
        >
        </a>
        <div class="grid grid-cols-4 gap-4 px-3"
        >
          <div
            v-for="(img, i) in product1.data.products[0].images"
            :key="i"
            class="group py-2"
          >
             <div
                @click="changeImg(i)"
              >
              <img
                :src="img"
                class="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
          </div>
        </div>
      <!-- Product info -->
      <div
        class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
      >
        <div class="lg:col-span-2 lg:border-r lg:border-gray-300 lg:pr-8">
          <h1
            class="text-3xl font-extrabold text-gray-900 sm:text-3xl"
          >
           {{ product1.data.products[0].brandNameFa }}  
            {{ product1.data.products[0].title}}
            

          </h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:mt-0 lg:row-span-3">
          <p class="text-3xl text-gray-900">{{ price }} تومان</p>


          <div class="mt-10">

            <!-- Sizes -->
            <div class="mt-10">
              <div class="flex items-center justify-between px-3 py-2">
                <h3 class="text-lg text-gray-900 font-medium">سایز ها</h3>
                <a
                  href="#"
                  class="text-lg font-medium text-indigo-600 hover:text-indigo-500"
                  >راهنمای سایز</a
                >
              </div>

              <RadioGroup v-model="selectedSize" class="mt-4">
                <div
                  class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                >
                  <RadioGroupOption
                    as="template"
                    v-for="size in product1.data.products[0].sizes"
                    :key="size"
                    :value="size"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        size
                          ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                          : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                        active ? 'ring-2 ring-indigo-500' : '',
                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                      ]"
                    >
                      <RadioGroupLabel as="span">
                        {{ size }}
                      </RadioGroupLabel>
                      <span
                        :class="[
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'absolute -inset-px rounded-md pointer-events-none'
                        ]"
                        aria-hidden="true"
                      />
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <button
              @click="addToCart"
              class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-5 px-8 flex items-center justify-center text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        <div
        v-if="product1.data.products[0].details"
          class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
        >
          <!-- Description and details -->
          <div>
            <h3 >توضیحات</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">{{ product1.data.products[0].details}}</p>
            </div>
          </div>

      
        </div>
      </div>

      <section class="px-3 mt-10">
      <div class="swiperTitle">
       محصولات مشابه
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="30"
      >
        <swiper-slide
          v-for="product in similarProducts.data.products"
          :key="product.productId"
          tag="a"
          :href="`/products/${product.productId}/${product.title.replace(/\//g, '-').replace(/ /g, '-')}`"
          class="group py-2"
          target="_blank"
        >
          <!-- <a  :href="`/products/${product.productId}/${product.title.replace(/\//g, '-').replace(/ /g, '-')}`" target="_blank" > -->
            <div
            
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
            v-if="product.images"
              :src="product.images[0]"
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
            {{ product.price }}  تومان
          </p>
        </swiper-slide>
      </swiper>
    </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { StarIcon } from '@heroicons/vue/solid'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import Lightgallery from 'lightgallery/vue'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
// If you are using scss you can skip the css imports below and use scss instead
// import styles from 'lightgallery/scss/lightgallery.scss';
const route = useRoute()

const images = [
  {
    title: 'img 1',
    url:
      'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg'
  },
  {
    title: 'img 2',
    url:
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg'
  }
]
const modules= [Navigation, Pagination, Scrollbar, A11y];
const selectedImg = ref('')
const selectedSize = ref('')
const price = ref('')
const index = null
const plugins = [lgThumbnail]
const product = {
  name: 'Basic Tee 6-Pack',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' }
  ],
  images: [
    {
      src:
        'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.'
    },
    {
      src:
        'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.'
    },
    {
      src:
        'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.'
    },
    {
      src:
        'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.'
    }
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' }
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true }
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton'
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.'
}
const reviews = { href: '#', average: 4, totalCount: 117 }

let onInit = () => {
  console.log('lightGallery has been initialized')
}

let onBeforeSlide = () => {
  console.log('calling before slide')
}

const { data: product1, refresh: refreshProduct } = await useAsyncData('product', a => {
  return $fetch(
    useRuntimeConfig().public.BASE_URL +
      `/products?productId=${route.params.id}`
  )
})

const { data: similarProducts, refresh: refreshSProduct } = await useAsyncData('similarProducts', a => {
  console.log(`/sameproducts?productId=${route.params.id}`);
  return $fetch(
    useRuntimeConfig().public.BASE_URL +
      `/sameproducts?productId=${route.params.id}`
  )
})

onMounted(() => {
  if(product1.value.data.products[0])
  selectedImg.value = product1.value.data.products[0].images[0]
  // const selectedColor = ref(product.colors[0])
  selectedSize.value = ref(product1.value.data.products[0].sizes[0])
  price.value = useCurrencyFormat(product1.value.data.products[0].price)
})


function changeImg(i) {
  console.log(i);
  selectedImg.value = product1.value.data.products[0].images[i]
}

function addToCart() {
    console.log('add to cart')
}

// watch(() => route.params, refreshData)




</script>

<style lang="css">
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

.lg-outer {
  text-align: right;
}
</style>
