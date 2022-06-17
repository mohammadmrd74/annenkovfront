<template>
  <div class="bg-white">
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
          />
        </TransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enter-to="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 md:scale-100"
              leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <DialogPanel
                class="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl"
              >
                <div
                  class="w-full relative bg-white px-4 pb-16 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                >
                  <button
                    type="button"
                    class="absolute flex top-4 p-2 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    @click="open = false"
                  >
                    <XIcon class="h-6 w-6 text-black" aria-hidden="true" />
                    <span class="text-2xl text-black mr-3">فیلتر ها</span>
                  </button>
                  <div class="flex justify-between px-6 mt-6">
                    <div>
                      <div class="font-bold text-right">بیشترین</div>
                      {{ currenyConvert(max) }} تومان
                    </div>
                    <div>
                      <div class="font-bold ">کمترین</div>
                      {{ currenyConvert(min) }} تومان
                    </div>
                  </div>
                  <div style="direction: ltr" class="mt-2">
                    <Slider
                      @update="changeCost"
                      direction="ltr"
                      :lazy="false"
                      :tooltips="false"
                      :min="filters.data.filters[0].minprice"
                      :max="filters.data.filters[0].maxprice"
                      v-model="price"
                    />
                  </div>

                 
                  <!-- <vue3-slider  class="my-3" :min="filters.data.filters[0].minprice" :max="filters.data.filters[0].maxprice" v-model="price" color="#FB278D" track-color="#FEFEFE" />   -->
                  <div class="accordion w-full mt-6" id="brands">
                    <div class="accordion-item bg-white border border-gray-200">
                      <h2 class="accordion-header mb-0" id="sizeheading">
                        <button
                          class="
                            accordion-button
                            relative
                            collapsed
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                          "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#sizecollapse"
                          aria-expanded="true"
                          aria-controls="sizecollapse"
                        >
                          <span class="mx-2 font-bold">سایز</span>
                        </button>
                      </h2>
                      <div
                        id="sizecollapse"
                        class="accordion-collapse collapse  text-right"
                        aria-labelledby="sizecollapse"
                        data-bs-parent="#sizecollapse"
                      >
                        <div
                          v-for="size in filters.data.filters[0].sizes"
                          :key="size.id"
                          class="accordion-body py-4 px-5"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              class="form-check-label inline-block text-gray-800"
                              for="flexCheckChecked"
                              style="direction: ltr;"
                            >
                              {{ size.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="accordion w-full mt-6" id="brands">
                    <div class="accordion-item bg-white border border-gray-200">
                      <h2 class="accordion-header mb-0" id="headingbrand">
                        <button
                          class="
                            accordion-button
                            relative
                            collapsed
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                          "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <span class="mx-2 font-bold">برند</span>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse  text-right"
                        aria-labelledby="brandcollapse"
                        data-bs-parent="#brandcollapse"
                      >
                        <div
                          v-for="brand in filters.data.filters[0].brands"
                          :key="brand.id"
                          class="accordion-body py-4 px-5"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              class="form-check-label inline-block text-gray-800"
                              for="flexCheckChecked"
                            >
                              {{ brand.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion w-full mt-6" id="types">
                    <div class="accordion-item bg-white border border-gray-200">
                      <h2 class="accordion-header mb-0" id="headingtype">
                        <button
                          class="
                            accordion-button
                            relative
                            collapsed
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                          "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#typecollapse"
                          aria-expanded="true"
                          aria-controls="typecollapse"
                        >
                          <span class="mx-2 font-bold">نوع</span>
                        </button>
                      </h2>
                      <div
                        id="typecollapse"
                        class="accordion-collapse collapse  text-right"
                        aria-labelledby="typecollapse"
                        data-bs-parent="#brandcollapse"
                      >
                        <div
                          v-for="typee in filters.data.filters[0].types"
                          :key="typee.id"
                          class="accordion-body py-4 px-5"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              class="form-check-label inline-block text-gray-800"
                              for="flexCheckChecked"
                            >
                              {{ typee.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="accordion w-full mt-6" id="types">
                    <div class="accordion-item bg-white border border-gray-200">
                      <h2 class="accordion-header mb-0" id="headingtype">
                        <button
                          class="
                            accordion-button
                            relative
                            collapsed
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                          "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#colorcollapse"
                          aria-expanded="true"
                          aria-controls="colorcollapse"
                        >
                          <span class="mx-2 font-bold">رنگ اصلی</span>
                        </button>
                      </h2>
                      <div
                        id="colorcollapse"
                        class="accordion-collapse collapse  text-right"
                        aria-labelledby="colorcollapse"
                        data-bs-parent="#brandcollapse"
                      >
                        <div
                          v-for="color in filters.data.filters[0].colors"
                          :key="color.id"
                          class="accordion-body py-4 px-5"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              class="form-check-label inline-block text-gray-800"
                              for="flexCheckChecked"
                            >
                              {{ color.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="accordion w-full mt-6" id="types">
                    <div class="accordion-item bg-white border border-gray-200">
                      <h2 class="accordion-header mb-0" id="headingtype">
                        <button
                          class="
                            accordion-button
                            relative
                            collapsed
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                          "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#scolorcollapse"
                          aria-expanded="true"
                          aria-controls="scolorcollapse"
                        >
                          <span class="mx-2 font-bold">رنگ دوم</span>
                        </button>
                      </h2>
                      <div
                        id="scolorcollapse"
                        class="accordion-collapse collapse  text-right"
                        aria-labelledby="scolorcollapse"
                        data-bs-parent="#brandcollapse"
                      >
                        <div
                          v-for="color in filters.data.filters[0].secondColors"
                          :key="color.id"
                          class="accordion-body py-4 px-5"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                            <label
                              class="form-check-label inline-block text-gray-800"
                              for="flexCheckChecked"
                            >
                              {{ color.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="fixed inset-x-0 mx-10 h-12 bottom-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  فیلتر
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div
      class="max-w-2xl mx-auto py-4 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div class="flex justify-between items-center my-3">
        <h2 class=" text-xl font-bold">مردانه</h2>
        <button class="flex bg-gray-100 p-2 rounded-md" @click="open = true">
          فیلتر
          <FilterIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div
        class="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <a
          v-for="product in products"
          :key="product.id"
          :href="product.href"
          class="group"
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
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// import 'tw-elements'
import { FilterIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
import Slider from '@vueform/slider'
import MoneyFormat from 'vue-money-format'
const product = {
  name: 'Basic Tee 6-Pack ',
  price: '$192',
  rating: 3.9,
  reviewCount: 117,
  href: '#',
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' }
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
    { name: 'XXXL', inStock: false }
  ]
}
const min = ref(0);
const max = ref(100);

const price = ref([0, 100000])

const { data: allproducts } = await useAsyncData('allproducts', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/products', {
    method: 'POST',
    body: {
      brands: [],
      sizes: [],
      colors: [],
      secondColors: [],
      types: [],
      main: [],
      search: '',
      showDiscounts: false,
      page: 1,
      orderBy: 'price',
      orderDir: 'desc',
      minprice: '',
      maxprice: ''
    }
  })
)

const { data: filters } = await useAsyncData('filters', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/filters')
)

onMounted(() => {
  // console.log(useRuntimeConfig().public.BASE_URL)
  console.log(filters._rawValue.data.filters[0].minprice)
  console.log(filters._rawValue.data.filters[0].maxprice)
  min.value = filters._rawValue.data.filters[0].minprice;
  max.value = filters._rawValue.data.filters[0].maxprice
  price.value = [min.value, max.value]
})


function currenyConvert(value) {
if (typeof value !== "number") {
        return value;
    }
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
function changeCost(value) {
  min.value = value[0];
  max.value = value[1];
}
const open = ref(false)
const selectedColor = ref(product.colors[0])
const selectedSize = ref(product.sizes[2])
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
  },
  {
    id: 5,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.'
  },
  {
    id: 6,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.'
  },
  {
    id: 7,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.'
  }
]
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss">
.accordion-button:after {
  margin-right: auto;
  margin-left: 0;
}
</style>
