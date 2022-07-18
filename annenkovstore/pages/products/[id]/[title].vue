<template>
  <div class="bg-white container mx-auto">
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

      <div class="md:grid  grid-cols-2 gap-4 block">
        <div>
          <div
            class=""
            v-if="product1.data.products[0].images"
            :href="product1.data.products[0].images[0]"
          >
            <img
              :src="
                selectedImg ? selectedImg : product1.data.products[0].images[0]
              "
            />
          </div>
          <!-- <a
          v-for="(img, j) in product1.data.products[0].images"
          :key="j"
          :href="img"
        >
        </a> -->
          <div class="grid grid-cols-4 gap-4 px-3">
            <div
              v-for="(img, i) in product1.data.products[0].images"
              :key="i"
              class="group py-2"
            >
              <div @click="changeImg(i)">
                <img
                  :src="img"
                  class="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Product info -->
        <div
          class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8  lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
        >
          <div class="lg:col-span-4 ">
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-3xl">
              {{ product1.data.products[0].brandNameFa }}
              {{ product1.data.products[0].title }}
            </h1>
          </div>

          <!-- Options -->
          <div class="mt-5 lg:mt-0 lg:row-span-3">
            <p v-if="product1.data.products[0].totalPrice !== product1.data.products[0].price" class="lg:mt-5">
              <span class="text-xl line-through  text-gray-900">
                {{
                product1.data.products[0].price
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
              }}
              تومان
              </span>
              <span class="discount mx-3" style="position: static" v-if="product1.data.products[0].totalPrice !== product1.data.products[0].price">&#37;{{product1.data.products[0].discount}}</span>
            </p>
            <p  class="text-3xl mt-5 text-gray-900">
              {{
                product1.data.products[0].totalPrice
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
              }}
              تومان
              
            </p>

            <p class="mt-4 text-sm font-medium text-gray-500">
               کد محصول:    {{ product1.data.products[0].styleNumber }}  
              </p>

            <div class="mt-10">
              <!-- Sizes -->
              <div class="mt-10">
                <div class="flex items-center justify-between px-3 py-2">
                  <h3 class="text-lg text-gray-900 font-medium">سایز ها</h3>
                  <a
                    target="_blank"
                    :href="url + '/files/sizes/' + product1.data.products[0].brandNameFa + '.jpeg'"
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
                      style="direction:ltr"
                        :class="[
                          size
                            ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                            : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                        ]"
                      >
                        <RadioGroupLabel as="span">
                          {{ size.size }}
                        </RadioGroupLabel>
                        <span
                          :class="[
                            active ? 'border' : 'border-2',
                            checked
                              ? 'border-indigo-500'
                              : 'border-transparent',
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
                {{buttonName}}
              </button>
            </div>
          </div>

          <div
            class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 "
          >
            <!-- Description and details -->
            <div>
              <div class="space-y-6">
                <p class="text-base text-lg text-gray-900">
                  <ul>
                    <li >زمان تقریبی تحویل:  سه هفته کاری</li>
                    <li class="mt-4">هزینه ارسال:  رایگان</li>
                    <li class="mt-4">
                      برای خرید این کفش نیاز به راهنمایی دارید؟
                    </li>
                      <li class="mt-4 supportButton">
                        <a target="_blank" href="https://wa.link/19kpt3" class="hover:underline flex justify-center">
                            <svg class="w-5 h-5 ml-4" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
                            پشتیبانی واتساپ</a>
                    </li>
                      <li class="mt-4 supportButton">
                        <a target="_blank" href="https://www.instagram.com/annenkovstore/" class="hover:underline flex justify-center">
                            <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                            پشتیبانی اینستاگرام</a>
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="product1.data.products[0].details"
            class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 "
          >
            <!-- Description and details -->
            <div>
              <h3>توضیحات</h3>

              <div class="space-y-6">
                <p class="text-base text-gray-900">
                  {{ product1.data.products[0].details }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section v-if="similarProducts.data.products.length > 0" class="px-3 mt-10">
        <div class="swiperTitle">
          رنگ های دیگر
        </div>
        <swiper
          :modules="modules"
          :slides-per-view="isDesktop ? 4 : 2"
          :cssMode="isDesktop ? true : false"
          :navigation="isDesktop ? true : false"
          :space-between="30"
        >
          <swiper-slide
            v-for="product in similarProducts.data.products"
            :key="product.productId"
            tag="a"
            :href="
              `/products/${product.productId}/${product.title
                .replace(/\//g, '-')
                .replace(/ /g, '-')}`
            "
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
              {{ product.brandNameFa }} {{ product.title }} 
            </h2>
            <h3 class="mt-1 text-sm font-semibold text-gray-700">
              
            </h3>
              <p class="mt-1 text-sm font-medium text-gray-500">
                {{ product.styleNumber }} 
              </p>
            <p class="mt-1 text-lg font-medium text-gray-900">
              {{ product.totalPrice.toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }} تومان
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
import { createToaster } from '@meforma/vue-toaster'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
const toaster = createToaster({ position: 'top' })
// If you are using scss you can skip the css imports below and use scss instead
// import styles from 'lightgallery/scss/lightgallery.scss';

const route = useRoute()
useHead({
  title: `${route.params.title}  |  آننکوف استور`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'آننکوف استور' }
  ]
})

const modules = [Navigation, Pagination, Scrollbar, A11y]
const selectedImg = ref('')
const selectedSize = ref('')
const price = ref('')
const index = null
const plugins = [lgThumbnail]
const buttonName = ref('افزودن به سبد خرید')
const reviews = { href: '#', average: 4, totalCount: 117 }
const prId = ref(0)
prId.value = route.params.id
let onInit = () => {
  console.log('lightGallery has been initialized')
}

let onBeforeSlide = () => {
  console.log('calling before slide')
}

const { data: product1, refresh: refreshProduct } = await useAsyncData(
  'product',
  a => {
    return $fetch(
      useRuntimeConfig().public.BASE_URL + `/products?productId=${prId.value}`
    )
  }
)

const url = useRuntimeConfig().public.BASE_URL;

const authstore = useAuthStore()

const isDesktop = computed(() => {
  if (process.client) {
    return window.innerWidth > 900
  }
  return -1
})

const { data: similarProducts, refresh: refreshSProduct } = await useAsyncData(
  'similarProducts',
  a => {
    let res = $fetch(
      useRuntimeConfig().public.BASE_URL +
        `/sameproducts?productId=${route.params.id}`
    )
    // selectedImg.value = res.data.products[0].images[0]
    // price.value = useCurrencyFormat(res.data.products[0].totalPrice)

    return res
  }
)

onMounted(() => {
  if (route.params.id !== product1.value.data.products[0].productId) {
    console.log(route.params.id, product1.value.data.products[0].productId)
    prId.value = route.params.id
    refreshSProduct()
    refreshProduct()
  }

  // if (product1.value.data.products[0])
  //   selectedImg.value = product1.value.data.products[0].images[0]
  // const selectedColor = ref(product.colors[0])
  // selectedSize.value = ref(product1.value.data.products[0].sizes[0])
})

function changeImg (i) {
  console.log(i)
  selectedImg.value = product1.value.data.products[0].images[i]
}

async function addToCart () {
  console.log(12, product1.value.data.products[0])
  if (selectedSize.value) {
    if (!authstore.getIsUser) {
      console.log(authstore.getIsUser)
      authstore.setProductToBuy({
        productId: product1.value.data.products[0].productId,
        selectedColor: '',
        selectedSize: selectedSize.value,
        productPrice: product1.value.data.products[0].totalPrice
      })
      return navigateTo({
        path: '/users',
        query: {
          type: 'cart'
        }
      })
    } else {
      try {
        buttonName.value = 'لطفا کمی صبر کنید...'
        const checkproduct = await $fetch(
          useRuntimeConfig().public.BASE_URL + `/updateproduct?productId=${product1.value.data.products[0].productId}&sizeId=${selectedSize.value.id}`,
          {
            method: 'GET'
          }
        )
        console.log('checked', checkproduct.data);
        if(product1.value.data.products[0].totalPrice !== checkproduct.data.totalPrice)
          toaster.error(`قیمت این محصول هم اکنون ${checkproduct.data.totalPrice} می باشد.`)
        const res = await $fetch(
          useRuntimeConfig().public.BASE_URL + '/insertToCart',
          {
            method: 'POST',
            body: {
              productId: product1.value.data.products[0].productId,
              selectedColor: '',
              selectedSize: selectedSize.value.id,
              productPrice: product1.value.data.products[0].totalPrice,
              count: 1
            },
            headers: {
              Authorization: `Bearer ${authstore.getToken}`
            }
          }
        )
        return navigateTo({
          path: '/cart'
        })
      } catch (error) {
        buttonName.value = 'افزودن به سبد خرید'
        if (error.response._data.message.includes('Duplicate'))
          toaster.error('این محصول هم اکنون در سبد خرید موجود می باشد')
        else if (error.response._data.message.includes('Size not Found.'))
          toaster.error('با عرض پوزش سایز انتخابی شما به پایان رسیده است.')
      }
    }
  } else {
    toaster.error('لطفا یکی از سایز ها را انتخاب نمایید.')
  }
}

// watch(() => route.params, refreshData)
</script>

<style lang="css">
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';
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
.supportButton{
      border: 1px solid;
    border-radius: 8px;
    padding: 11px;
    text-align: center;
    justify-content: center;
}
.lg-outer {
  text-align: right;
}
</style>
