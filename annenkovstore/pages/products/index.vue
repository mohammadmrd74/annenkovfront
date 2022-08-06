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
                  class="w-full relative bg-white px-4 filterdialog pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                >
                  <button
                    type="button"
                    class="absolute flex top-4 p-2 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    @click="open = false"
                  >
                    <XIcon class="h-6 w-6 text-black" aria-hidden="true" />
                    <span class="text-2xl text-black mr-3">فیلتر ها</span>
                  </button>
                  <div class="flex justify-between px-6 mt-9 md:mt-12">
                    <div>
                      <div class="font-bold text-right">بیشترین</div>
                      {{ currenyConvert(max) }} تومان
                    </div>
                    <div>
                      <div class="font-bold ">کمترین</div>
                      {{ currenyConvert(min) }} تومان
                    </div>
                  </div>
                  <div style="direction: ltr" class="mt-4 mb-2 px-8">
                    <Slider
                      @update="changeCost"
                      direction="ltr"
                      :lazy="false"
                      :tooltips="false"
                      :min="parseInt(filters.data.filters[0].minprice)"
                      :max="parseInt(filters.data.filters[0].maxprice)"
                      v-model="price"
                    />
                  </div>

                  <!-- <vue3-slider  class="my-3" :min="filters.data.filters[0].minprice" :max="filters.data.filters[0].maxprice" v-model="price" color="#FB278D" track-color="#FEFEFE" />   -->
                  <div
                    style="max-height: 55vh;
                  overflow: auto;"
                  >
                    <div class="accordion w-full mt-6" id="brands">
                      <div
                        class="accordion-item bg-white border border-gray-200"
                      >
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
                            v-for="(size, i) in filters.data.filters[0].sizes"
                            :key="size.id"
                            class="accordion-body py-4 px-5"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                v-model="sizes[i]"
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
                      <div
                        class="accordion-item bg-white border border-gray-200"
                      >
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
                            v-for="(brand, i) in filters.data.filters[0].brands"
                            :key="brand.id"
                            class="accordion-body py-4 px-5"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                v-model="brands[i]"
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
                      <div
                        class="accordion-item bg-white border border-gray-200"
                      >
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
                            v-for="(typee, i) in filters.data.filters[0].types"
                            :key="typee.id"
                            class="accordion-body py-4 px-5"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                v-model="types[i]"
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
                      <div
                        class="accordion-item bg-white border border-gray-200"
                      >
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
                            v-for="(color, i) in filters.data.filters[0].colors"
                            :key="color.id"
                            class="accordion-body py-4 px-5"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                v-model="colors[i]"
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
                      <div
                        class="accordion-item bg-white border border-gray-200"
                      >
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
                            v-for="(color, i) in filters.data.filters[0]
                              .secondColors"
                            :key="color.id"
                            class="accordion-body py-4 px-5"
                          >
                            <div class="form-check">
                              <input
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="checkbox"
                                v-model="scolors[i]"
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
                </div>
                <button
                  @click="filterItems"
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
        <h2 class=" text-md font-bold">
          {{ route.query.mainType || 'همه محصولات' }}
          <div>({{ allproducts.data.recordNumbers }} عدد)</div>
        </h2>
        <div class="flex" style="min-width:120px">
          <Menu as="div" class="relative inline-block  mx-3 text-left">
            <div>
              <MenuButton
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                مرتب سازی
                <ChevronDownIcon
                  class="-mr-1 ml-2 md:h-5 md:w-5"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-40 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <div
                      @click="sortItems('desc')"
                      :class="[
                        orderDir == 'desc'
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      ]"
                    >
                      گران ترین
                    </div>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <div
                      @click="sortItems('asc')"
                      :class="[
                        orderDir == 'asc'
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      ]"
                    >
                      ارزان ترین
                    </div>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <button class="flex bg-gray-100 p-2 rounded-md items-center" @click="open = true">
            فیلتر
            <FilterIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <nuxt-link
          v-for="product in allproducts.data.products"
          :key="product.productId"
          class="group"
          style="position: relative"
          :to="
            `/products/${product.productId}/${product.title
              .replace(/\//g, '-')
              .replace(/ /g, '-')}`
          "
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <!-- {{product.images}} -->
            <img
              v-if="product.images && product.images[0]"
              :src="product.images[0]"
              :alt="product.title"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <span class="discount" v-if="product.discount > 0">&#37;{{Math.floor(((product.price - product.totalPrice)/product.price) * 100)}}</span>
          <h3 class="mt-4 text-md text-gray-900">
            {{product.brandNameFa}} <span class="mx-1">{{ product.title }} </span>
          </h3>
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
        </nuxt-link>
      </div>
      <div class="flex justify-center mt-5">
        <button
          @click="changePageNum(0)"
          class="m-3 w-16 text-center p-2 rounded-md"
          :class="[pageNum == 1 ? 'bg-gray-50' : 'bg-gray-200']"
          :disabled="pageNum == 1"
        >
          قبلی
        </button>
        <div class="flex items-center mx-4">{{ pageNum }}</div>
        <button
          @click="changePageNum(1)"
          :class="[
            pageNum == Math.ceil(allproducts.data.recordNumbers / 40)
              ? 'bg-gray-50'
              : 'bg-gray-200'
          ]"
          class="w-32 text-center m-3 bg-gray-200 p-2 rounded-md"
          :disabled="pageNum == Math.ceil(allproducts.data.recordNumbers / 40)"
        >
          بعدی
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import 'tw-elements'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
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
import { useRoute } from 'vue-router'
const route = useRoute()
useHead({
  title: `${route.query.mainType || 'محصولات'}  |  آننکوف استور`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'آننکوف استور' }
  ]
})

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
const min = ref(0)
const max = ref(100)
const open = ref(false)
const pageNum = ref(1)

const brands = ref([])
const brandsToFilter = ref([])
const sizesToFilter = ref([])
const sizes = ref([])
const typesToFilter = ref([])
const types = ref([])
const colorsToFilter = ref([])
const colors = ref([])
const scolorsToFilter = ref([])
const scolors = ref([])
const orderDir = ref('asc')

const price = ref([0, 0])
function queryChanged (id) {
  console.log('12')
  console.log(id)

  //assign article..
}

const { data: allproducts, refresh: refreshProducts } = await useAsyncData(
  'allproducts',
  () => {
    console.log(route.query.mainId)
    return $fetch(useRuntimeConfig().public.BASE_URL + '/products', {
      method: 'POST',
      body: {
        brands:
          brandsToFilter.value.length > 0
            ? brandsToFilter.value
            : parseInt(route.query.brandId)
            ? [parseInt(route.query.brandId)]
            : [],
        sizes: sizesToFilter.value,
        colors: colorsToFilter.value,
        secondColors: scolorsToFilter.value,
        types: typesToFilter.value,
        main: [route.query.mainId ? [parseInt(route.query.mainId)] : []],
        search: '',
        showDiscounts: route.query.discount ? true : false,
        page: pageNum.value,
        orderBy: 'price',
        orderDir: orderDir.value,
        minprice: parseInt(price.value[0]),
        maxprice: parseInt(price.value[1])
      }
    })
  }
)

function changePageNum (d) {
  if (d) pageNum.value++
  else pageNum.value--
  refreshProducts()
  window.scrollTo(0, 0)
}

const { data: filters } = await useAsyncData('filters', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/filters')
)

onMounted(() => {
  // console.log(useRuntimeConfig().public.BASE_URL)
  console.log(route.query)
  min.value = filters.value.data.filters[0].minprice
  max.value = filters.value.data.filters[0].maxprice
  price.value = [min.value, max.value]
})

function currenyConvert (value) {
  if (typeof value !== 'number') {
    return value
  }
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
function changeCost (value) {
  min.value = value[0]
  max.value = value[1]
}

function sortItems (sort) {
  orderDir.value = sort
  refreshProducts()
}

function filterItems () {
  brandsToFilter.value = filters.value.data.filters[0].brands
    .filter((br, i) => {
      if (brands.value[i]) return br
    })
    .map(bri => bri.id)

  sizesToFilter.value = filters.value.data.filters[0].sizes
    .filter((br, i) => {
      if (sizes.value[i]) return br
    })
    .map(bri => bri.id)

  typesToFilter.value = filters.value.data.filters[0].types
    .filter((br, i) => {
      if (types.value[i]) return br
    })
    .map(bri => bri.id)

  colorsToFilter.value = filters.value.data.filters[0].colors
    .filter((br, i) => {
      if (colors.value[i]) return br
    })
    .map(bri => bri.id)

  scolorsToFilter.value = filters.value.data.filters[0].secondColors
    .filter((br, i) => {
      if (scolors.value[i]) return br
    })
    .map(bri => bri.id)

  refreshProducts()
  open.value = false
}
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss">
.accordion-button:after {
  margin-right: auto;
  margin-left: 0;
}
.filterdialog {
  padding-bottom: 110px;
}
</style>
