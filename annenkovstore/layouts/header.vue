<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-200 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel
              :class="[openLate ? 'overflow-y-auto' : '']"
              class="relative max-w-[75%] w-full bg-white shadow-xl pb-12 flex flex-col "
            >
              <strong class="text-3xl px-6 mt-5">ANNENKOV STORE</strong>
             
              <div
                v-for="section in landing.data.menus.main"
                v-show="section.mainId != 3"
                :key="section.mainId"
                class="px-6 py-3"
              >
                <div >
                  <div class="accordion w-full" id="types">
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
                            py-3
                            px-2
                            text-base text-gray-800 text-left
                            bg-white
                            border-none
                            after:border-transparent
                            before:border-transparent
                            rounded-none
                            transition
                            headerAccordion
                            focus:outline-none
                          "
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="`#${section.mainType}`"
                          aria-expanded="true"
                          aria-controls="colorcollapse"
                        >
                          <p
                            :id="`${section.mainId}-heading-mobile`"
                            class="font-sm text-gray-900"
                          >
                            {{ section.mainType }}
                          </p>
                        </button>
                      </h2>
                      <div
                        :id="section.mainType"
                        class="accordion-collapse collapse  text-right"
                        aria-labelledby="colorcollapse"
                        data-bs-parent="#brandcollapse"
                      >
                        <div class="accordion-body px-5">
                          <div class=" border-gray-200  px-3 py-4 space-y-6">
                            <a
                              class="font-bold"
                              :href="
                                `/products?mainType=${section.mainType}&mainId=${section.mainId}`
                              "
                              >مشاهده همه محصولات</a
                            >
                            <div
                              v-for="brand in landing.data.menus.brands"
                              :key="brand.brandId"
                              class="flex items-center"
                            >
                              <img
                                width="35"
                                style="height: 23px !important"
                                :src="url + brand.logo"
                              />
                              <a
                                :href="
                                  `/products?mainType=${section.mainType}&mainId=${section.mainId}&brandId=${brand.brandId}`
                                "
                                class=" p-2 block font-medium text-gray-900"
                                >{{ brand.brandNameEn }}</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

               <a
                href="/annenkovfamily"
                class="md:hidden px-6 py-4 text-sm mx-1 font-bold items-center mx-auto text-green-700"
                style="white-space: nowrap;"
                >خانواده آننکوف
              </a>

              <nuxt-link
                @click="open = false"
                v-for="page in navigation.pages"
                :key="page.name"
                :to="page.href"
                class="flex items-center whitespace-nowrap mx-5 my-1 p-3 font-bold text-sm font-medium text-gray-700 hover:text-gray-800"
                >{{ page.name }}</nuxt-link
              >
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="opensearch">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="opensearch = false"
      >
        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogPanel
              :class="[open ? 'overflow-y-auto' : '']"
              class="relative digitalpanel w-full bg-white shadow-xl pb-12 flex flex-col "
            >
              <div class="py-4 px-6">
                <div class="flex flex-row">
                  <div class="basis-5/6 ">
                    <div class="absolute  left-1/4 top-7  pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">
                        <SearchIcon class="w-5 h-6" aria-hidden="true" />
                      </span>
                    </div>
                    <input
                      @input="searchProduct"
                      v-model="searchText"
                      placeholder="نام یا کد محصول را وارد نمایید..."
                      class="border px-3 h-12 rounded-lg w-full searchInput"
                    />
                  </div>
                  <div class="basis-1/6 text-center pt-3">
                    <button
                      type="button"
                      class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 searchButtonExit"
                      @click="opensearch = false"
                    >
                      <span class="sr-only">Close menu</span>
                      <XIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="searchProducts.length > 0"
                class="py-1 overflow-y-auto"
              >
                <div v-for="(product, i) in searchProducts" :key="i">
                  <a
                    target="_blank"
                    :href="
                      `/products/${product.productId}/${product.title
                        .replace(/\//g, '-')
                        .replace(/ /g, '-')}`
                    "
                    class="flex py-6 mt-4 px-10 hover:bg-gray-200 cursor-pointer"
                  >
                    <div
                      class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                    >
                      <img
                        v-if="product.images"
                        :src="product.images[0]"
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        class="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div class="mr-4 flex flex-1 flex-col">
                      <div>
                        <div
                          class="flex justify-between align-center text-base font-medium text-gray-900"
                        >
                          <h3>
                            {{ product.title }}
                          </h3>
                          <p class="mr-4">
                            {{
                              product.totalPrice
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                            }}
                            تومان
                          </p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ product.styleNumber }}
                        </p>
                      </div>
                      <div
                        class="flex flex-1 items-end justify-end text-sm"
                      ></div>
                    </div>
                  </a>
                </div>
              </div>
              <div v-else>
                <li v-if="searchText.length > 3" class="flex py-6 mt-4 px-10">
                  محصولی یافت نشد
                </li>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center">
            <button
              type="button"
              class="bg-white p-2 rounded-md hover:bg-none active:bg-none-700 lg:hidden"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <nuxt-link
              to="/products?discount=true"
              class="md:hidden text-sm mx-1 font-bold items-center m-auto text-orange-600"
              style="white-space: nowrap;"
              >فروش ویژه
            </nuxt-link>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex ">
                <nuxt-link
                  to="/products?discount=true"
                  class="text-sm mx-1 font-bold items-center m-auto text-orange-600"
                  style="white-space: nowrap;"
                  >فروش ویژه
                </nuxt-link>
                <Popover
                  v-for="(category, i) in landing.data.menus.main"
                  :key="category.id"
                  class="flex"
                  v-slot="{ open }"
                >
                  <div
                    v-if="category.mainType !== 'کودک'"
                    class="relative flex"
                  >
                    <PopoverButton
                      @click="selectSection(i)"
                      :class="[
                        open
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 mx-5'
                      ]"
                    >
                      {{ category.mainType }}
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel
                      class="absolute top-full inset-x-0 text-sm text-gray-500"
                      style="z-index: 100;
"
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        class="absolute inset-0  bg-white shadow"
                        aria-hidden="true"
                      />

                      <div class="relative bg-white">
                        <div class="max-w-5xl mx-auto px-8">
                          <div class="py-4">
                            <div
                              class=" grid grid-cols-5 gap-y-3 gap-x-3 text-sm"
                            >
                              <div
                                style="text-align: center;"
                                v-for="brand in landing.data.menus.brands"
                                :key="brand.brandId"
                              >
                                <a
                                  :href="
                                    `/products?mainType=${showSection.mainType}&mainId=${showSection.mainId}&brandId=${brand.brandId}`
                                  "
                                  class="-m-2 font-medium text-gray-900"
                                >
                                  <div
                                    class="mx-auto text-center"
                                    style="width:60px;height:60px"
                                  >
                                    <img
                                      width="60"
                                      height="60"
                                      :src="url + brand.logo"
                                    />
                                  </div>
                                  <span class="text-center text-lg">
                                    {{ brand.brandNameEn }}</span
                                  >
                                </a>
                              </div>
                              <a
                                :href="
                                  `/products?mainType=${showSection.mainType}&mainId=${showSection.mainId}`
                                "
                                class="m-auto mt-8 col-span-2 text-center text-black border p-4 hover:bg-black hover:bg-opacity-25 rounded-lg cursor-pointer text-lg flex items-center"
                                style="height:60px"
                                >مشاهده همه محصولات</a
                              >
                            </div>
                          </div>

                          <div
                            class="flex grid grid-cols-3 gap-y-10 gap-x-8 text-sm"
                            v-for="section in category.sections"
                            :key="section.name"
                          >
                            <p
                              :id="`${section.name}-heading`"
                              class="font-medium text-gray-900"
                            >
                              {{ section.name }}
                            </p>
                            <ul
                              role="list"
                              :aria-labelledby="`${section.name}-heading`"
                              class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                            >
                              <li
                                v-for="item in section.items"
                                :key="item.name"
                                class="flex"
                              >
                                <a
                                  :href="item.href"
                                  class="hover:text-gray-800"
                                >
                                  {{ item.name }}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
                <nuxt-link
                  to="/annenkovfamily"
                  class="text-sm  font-bold items-center m-auto text-green-700"
                  style="white-space: nowrap;"
                  >خانواده آننکوف
                </nuxt-link>
              </div>
            </PopoverGroup>

            <div class="flex w-full items-center">
              <!-- Logo -->
              <div class="flex w-full justify-end ml-0 items-center">
                <!-- Cart -->
                <div
                  v-if="authstore.getIsUser == 1"
                  class="mx-2 flow-root lg:ml-6"
                >
                  <NuxtLink to="/cart">
                    <ShoppingBagIcon
                      class="flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    <span class="cartNumber" v-if="authstore.getCartNumber">{{
                      authstore.getCartNumber
                    }}</span>
                  </NuxtLink>
                </div>

                <div
                  v-if="authstore.getIsUser == 1"
                  class="mx-2 flow-root lg:ml-3"
                >
                  <NuxtLink
                    to="/users"
                    class="flex items-center whitespace-nowrap text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    پنل کاربری
                  </NuxtLink>
                </div>
                <div
                  v-if="authstore.getIsUser == 0"
                  class="mx-2 flow-root  lg:ml-3"
                >
                  <NuxtLink
                    to="/users"
                    class="flex items-center  whitespace-nowrap text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    ورود / ثبت نام
                  </NuxtLink>
                </div>

                <nuxt-link
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :to="page.href"
                  class="flex items-center whitespace-nowrap hidden md:block mx-3 text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</nuxt-link
                >
                <!-- Search -->
                <div
                  class="flex  hidden md:block mx-4 w-1/3 "
                  style="position:relative"
                >
                  <input
                    id="searchinput"
                    @input="searchProduct"
                    v-model="searchText"
                    placeholder="نام یا کد محصول را وارد نمایید..."
                    class="border px-3 h-12 rounded-lg w-full searchInput"
                  />

                  <div
                    id="searchmenu"
                    class="mymenu"
                    :class="[searchText.length > 3 ? '' : 'hidden']"
                  >
                    <div v-if="searchProducts.length > 0" class="py-1">
                      <div v-for="(product, i) in searchProducts" :key="i">
                        <a
                          target="_blank"
                          :href="
                            `/products/${
                              product.productId
                            }/${product.title
                              .replace(/\//g, '-')
                              .replace(/ /g, '-')}`
                          "
                          class="flex py-6 mt-4 px-10 hover:bg-gray-200 cursor-pointer"
                        >
                          <div
                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                          >
                            <img
                              v-if="product.images"
                              :src="product.images[0]"
                              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                              class="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div class="mr-4 flex flex-1 flex-col">
                            <div>
                              <div
                                class="flex justify-between align-center text-base font-medium text-gray-900"
                              >
                                <h3>
                                  {{ product.title }}
                                </h3>
                                <p class="mr-4">
                                  {{
                                    product.totalPrice
                                      .toString()
                                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                                  }}
                                  تومان
                                </p>
                              </div>
                              <p class="mt-1 text-sm text-gray-500">
                                {{ product.styleNumber }}
                              </p>
                            </div>
                            <div
                              class="flex flex-1 items-end justify-end text-sm"
                            ></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div v-else>
                      <li class="flex py-6 mt-4 px-10">
                        محصولی یافت نشد
                      </li>
                    </div>
                  </div>
                </div>
                <span class="text-gray-500 mx-4 md:hidden sm:text-sm">
                  <SearchIcon
                    @click="opensearch = true"
                    class="w-5 h-6"
                    aria-hidden="true"
                  />
                </span>
                <a href="/">
                  <span class="sr-only">annenkovStore</span>
                  <img class="h-12 w-auto" src="~/assets/logo.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon
} from '@heroicons/vue/outline'
const searchProducts = ref('')
const searchText = ref('')
const selectedSection = ref(0)
const showSection = ref([])
const navigation = {
  pages: [
    { name: 'درباره  ما', href: '/aboutus' },
    { name: 'تماس با ما', href: '/contactus' }
  ]
}

function selectSection (i) {
  console.log(landing.value.data.menus.main)
  showSection.value = landing.value.data.menus.main[i]
}

const { data: landing } = await useAsyncData('landing', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/landing')
)

const authstore = useAuthStore()

const open = ref(false)
const openLate = ref(false)
watch(open, async (newQuestion, oldQuestion) => {
  if (newQuestion)
    setTimeout(() => {
      openLate.value = true
    }, 500)
  else openLate.value = false
})
const opensearch = ref(false)
const opensearch2 = ref(false)
const url = useRuntimeConfig().public.BASE_URL
async function searchProduct (e) {
  if (e.target.value.length > 3) {
    searchProducts.value = []
    const { data: allproducts, refresh: refreshProducts } = await $fetch(
      useRuntimeConfig().public.BASE_URL + '/products',
      {
        method: 'POST',
        body: {
          brands: [],
          sizes: [],
          colors: [],
          secondColors: [],
          types: [],
          main: [],
          search: e.target.value,
          showDiscounts: false,
          page: 1,
          orderBy: 'price',
          orderDir: 'desc',
          minprice: 0,
          maxprice: 0
        }
      }
    )

    console.log(allproducts)
    if (allproducts.products.length > 0) {
      searchProducts.value = allproducts.products
    }
  }
}

onMounted(async () => {
  document.addEventListener('click', ({ target }) => {
    if (!target.closest('#searchmenu') && !target.closest('#searchinput')) {
      searchText.value = ''
    }
  })
  if (authstore.getToken) {
    try {
      const token = await $fetch(
        useRuntimeConfig().public.BASE_URL + '/parsetoken',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authstore.getToken}`
          }
        }
      )
      authstore.setUser(1)
      let res = await $fetch(useRuntimeConfig().public.BASE_URL + '/getcart', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authstore.getToken}`
        }
      })
      authstore.setCartNumber(res.data.cart.length)
    } catch (error) {
      authstore.setUser(0)
    }
  } else authstore.setUser(0)
})
</script>

<style lang="scss">
.cartNumber {
  background: coral;
  border-radius: 5px;
  height: 19px;
  padding-right: 3px;
  /* padding: 2px; */
  position: absolute;
  top: 20px;
  width: 11px;
}
.headerAccordion::after{
  
    border: none !important;
  
}
.headerAccordion::before{
  
    border: none !important;
  
}

.mymenu {
  @media (max-width: 900px) {
    width: 80vw;
  }
  @media (min-width: 900px) {
    width: 30vw;
  }
  max-height: 50vh;
  overflow: auto;
  position: absolute;
  z-index: 150;
  background: white;
  left: 0;
  top: 50px;
  border: 1px solid #eee;
  border-radius: 6px;
}
.searchInput {
  background: #f5f5f5;
}
.searchButtonExit {
  background: #f5f5f5;
  border-radius: 100px;
  margin-right: 3px;
}
</style>
