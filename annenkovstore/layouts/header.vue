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
              class="relative max-w-[75%] w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
            >
              <!-- <div class="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  @click="open = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div> -->

              <!-- Links -->

              <strong class="text-3xl px-6 mt-5">ANNENKOV STORE</strong>
              <!-- <div
                  class="aspect-w-2 max-w-sm w-sm aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75"
                >
                  <img
                    src="~/assets/logo.jpg"
                    class="object-center object-cover"
                  />
                </div> -->

              <div v-for="section in landing.data.menus.main" :key="section.mainId" class="p-6">
                <p
                  :id="`${section.mainId}-heading-mobile`"
                  class="font-medium text-gray-900"
                >
                  {{ section.mainType }}
                </p>
                <ul
                  role="list"
                  :aria-labelledby="
                    `${section.mainType}-heading-mobile`
                  "
                  class="mt-6 flex flex-col space-y-6"
                >
                  <li
                    v-for="item in section.categories"
                    :key="item.categoryId"
                    class="flow-root"
                  >
                    <a  class="-m-2 p-2 block text-gray-500">
                      {{ item.categoryTitle }}
                    </a>
                  </li>
                </ul>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <div
                  v-for="brand in landing.data.menus.brands"
                  :key="brand.brandId"
                  class="flow-root"
                >
                  <a
                    class="-m-2 p-2 block font-medium text-gray-900"
                    >{{ brand.brandNameEn }}</a
                  >
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 p-2 block font-medium text-gray-900"
                    >ورود یا ثبت نام</a
                  >
                </div>
              </div>
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
              class="relative w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
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
                      placeholder="جستجو کنید..."
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <!-- <p
        class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8"
      >
        Get free delivery on orders over $100
      </p> -->

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

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  class="flex"
                  v-slot="{ open }"
                >
                  <div class="relative flex">
                    <PopoverButton
                      :class="[
                        open
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                      ]"
                    >
                      {{ category.name }}
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
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      />

                      <div class="relative bg-white">
                        <div class="max-w-7xl mx-auto px-8">
                          <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <div
                                  class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75"
                                >
                                  <img
                                    :src="item.imageSrc"
                                    :alt="item.imageAlt"
                                    class="object-center object-cover"
                                  />
                                </div>
                                <a
                                  :href="item.href"
                                  class="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    class="absolute z-10 inset-0"
                                    aria-hidden="true"
                                  />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div
                              class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm"
                            >
                              <div
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
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :href="page.href"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</a
                >
              </div>
            </PopoverGroup>

            <div class="flex w-full items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <a
                  href="#"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Sign in</a
                >
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Create account</a
                >
              </div>

              <!-- Search -->
              <div class="flex mx-2">
                <div href="#" class="">
                  <span class="sr-only">Search</span>
                  <SearchIcon
                    @click="opensearch = true"
                    class="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <!-- Cart -->
              <!-- <div class="mx-2 flow-root lg:ml-6">
                <div  class="group ">
                  <ShoppingBagIcon
                    class="flex-shrink-0 h-8 w-8 "
                    aria-hidden="true"
                  />
                  <span class="sr-only">items in cart, view bag</span>
                </div>
              </div> -->

              <div class="mx-2 flow-root pt-1 lg:ml-6">
                <NuxtLink to="/users">
                  <UserIcon class="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                </NuxtLink>
              </div>

              <!-- Logo -->
              <div class="flex w-full justify-end ml-0">
                <a href="/">
                  <span class="sr-only">Workflow</span>
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
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
import { ref } from 'vue'
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
  TransitionRoot
} from '@headlessui/vue'
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon
} from '@heroicons/vue/outline'

const navigation = {
  categories: [
    {
      sections: [
        {
          id: 'show',
          name: 'کفش',
          items: [
            { name: 'نایکی', href: '#' },
            { name: 'آدیداس', href: '#' },
            { name: 'پوما', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' }
          ]
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' }
          ]
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' }
          ]
        }
      ]
    }
  ],
  pages: [
    { name: 'درباره  ما', href: '#' },
    { name: 'تماس با ما', href: '#' }
  ]
}

import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon
} from '@heroicons/vue/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false }
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' }
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false }
    ]
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false }
    ]
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true }
    ]
  }
]

const { data: landing } = await useAsyncData('landing', () =>
  $fetch(useRuntimeConfig().public.BASE_URL + '/landing')
)
// const { data } = await useAsyncData('filter', () =>
//       $fetch(useRuntimeConfig().public.BASE_URL + '/landing')
// )

onMounted(() => {
  // console.log(useRuntimeConfig().public.BASE_URL)
  console.log(landing._rawValue.data)
})

const open = ref(false)
const opensearch = ref(false)
</script>

<style lang="scss">
.searchInput {
  background: #f5f5f5;
}
.searchButtonExit {
  background: #f5f5f5;
  border-radius: 100px;
  margin-right: 3px;
}
</style>
