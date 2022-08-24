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
                <div>
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
                                `/products?mainType=${
                                  section.mainType
                                }&mainId=${
                                  section.categories
                                    ? section.categories[0].mainAndCategId
                                    : ''
                                }`
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
                                  `/products?mainType=${
                                    section.mainType
                                  }&mainId=${
                                    section.categories
                                      ? section.categories[0].mainAndCategId
                                      : ''
                                  }&brandId=${brand.brandId}`
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

              <button
                  @click="sizeChartDialog = true"
                  class="font-bold ml-auto px-7 py-4"
                  style="white-space: nowrap;"
                >
                  راهنمای سایز
                </button>

              <a
                href="/annenkovfamily"
                class="md:hidden px-6 py-4 text-sm mx-1 font-bold items-center  text-green-700"
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
            <a
              href="/products?discount=true"
              class="md:hidden text-sm mx-1 font-bold items-center m-auto text-orange-600"
              style="white-space: nowrap;"
              >فروش ویژه
            </a>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="h-full flex ">
                <a
                  href="/products?discount=true"
                  class="text-sm mx-1 font-bold items-center m-auto text-orange-600"
                  style="white-space: nowrap;"
                  >فروش ویژه
                </a>
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
                                    `/products?mainType=${showSection.mainType}&mainId=${category.categories[0].mainAndCategId}&brandId=${brand.brandId}`
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
                                  `/products?mainType=${showSection.mainType}&mainId=${category.categories[0].mainAndCategId}`
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
                <button
                  @click="sizeChartDialog = true"
                  class="text-sm ml-4 font-bold items-center m-auto"
                  style="white-space: nowrap;"
                >
                  راهنمای سایز
                </button>
                <nuxt-link
                  to="/annenkovfamily"
                  class="text-sm  font-bold items-center m-auto text-green-700"
                  style="white-space: nowrap;"
                  >خانواده آننکوف
                </nuxt-link>
              </div>
            </PopoverGroup>

            <TransitionRoot as="template" :show="sizeChartDialog">
              <Dialog
                as="div"
                class="relative z-50"
                @close="sizeChartDialog = false"
              >
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

                <div class="fixed z-50 inset-0 overflow-y-auto">
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
                        class="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-6xl"
                      >
                        <div
                          class="w-full relative bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                        >
                          <div class="grid grid-cols-2">
                            <div class="text-right text-lg font-bold">
                              راهنمای سایز
                            </div>

                            <div class=" text-left text-lg font-bold">
                              <XIcon
                                @click="sizeChartDialog = false"
                                class="h-6 w-6 mr-auto cursor-pointer"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                          <hr class="my-4" />
                          <div class="grid grid-cols-12">
                            <div class="md:col-span-9 col-span-12">
                              <div class="text-right  font-md">
                                <span class="text-red-600 font-bold">چطوری اندازه کفشمونو بفهمیم؟</span>
                                <ul class="p-4" style="list-style: disc">
                                  <li class="my-2 font-bold">
                                    برای اندازه گیری دقیق تر، پاهاتونو در آخر
                                    روز ( زمانی که بیشترین اندازه رو دارند)
                                    اندازه بگیرید.
                                  </li>
                                  <li class="font-bold">
                                    قبل از اندازه گیری جورابی که معمولا استفاده
                                    می کنید رو بپوشید.
                                  </li>
                                  <li class="my-2 font-bold">
                                    پاهاتونو روی یه کاغذ سفید بذارین و مثل عکس
                                    راهنما، بالاترین نقطه شست پا و پایین ترین
                                    نقطه پاشنه پا رو علامت گذاری کنید و فاصله
                                    بین این علامت ها رو پیدا کنید
                                  </li>
                                  <li class="font-bold">
                                    این کار رو با پای دیگرتون هم انجام بدین
                                  </li>
                                  <li class="my-2 font-bold">
                                    بعد از اندازه گیری جفت پاها هر کدوم که بیشتر
                                    بود میشه اندازه واقعی پای شما
                                  </li>
                                  <li class="font-bold">
                                    حالا اون اندازه رو با استفاده از راهنمای زیر
                                    برای برند مورد نظرتون بزنید تا سایز مناسب
                                    شما رو پیدا کنیم.
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="md:col-span-3 col-span-8">
                              <img
                                src="~/assets/images/sizechart.png"
                                alt="راهنمای سایز"
                              />
                            </div>
                          </div>
                          <hr class="my-3" />
                          <div class="text-right">
                            <div class="md:grid md:grid-cols-5">
                              <div class="my-4 md:my-0">
                                <select
                                  id="brands"
                                  v-model="selectedBrand"
                                  style="background-position: left 0.5rem center;"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option disabled selected>انتخاب برند</option>
                                  <option
                                    v-for="(brand, i) in brands"
                                    :key="i"
                                    :value="brand.en"
                                    >{{ brand.fa }}</option
                                  >
                                </select>
                              </div>
                              <div
                                class="col-span-6 md:mx-3 my-4 md: my-0 sm:col-span-1 lg:col-span-1"
                              >
                                <input
                                  placeholder="سایز به سانتی متر"
                                  v-model="sizeInCM"
                                  type="number"
                                  class=" focus:ring-indigo-500 focus:border-indigo-500 block w-full  border-gray-300 rounded-md"
                                />
                              </div>
                              <div class="my-4 md:my-0">
                                <select
                                  id="brands"
                                  v-model="selectedType"
                                  style="background-position: left 0.5rem center;"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  <option disabled selected>انتخاب نوع</option>
                                  <option value="men">مردانه</option>
                                  <option value="women">زنانه</option>
                                  <option value="sport">اسپورت</option>
                                </select>
                              </div>
                              <div>
                                <button
                                  class="bg-blue-500 hover:bg-blue-700 text-white flex bg-gray-100 md:mx-3 p-2 px-10 font-bold rounded-md items-center"
                                  @click="calculate"
                                >
                                  محاسبه
                                </button>
                              </div>
                            </div>
                            
                          </div>
                          <div v-if="foundedSizes.length > 0" class="text-center my-5">
                            <!-- {{foundedSizes}} -->
                            <table id="sizechart" class="m-auto">
                              <thead>
                                <tr>
                                  <th>برند</th>
                                  <th>اندازه به سانتی متر</th>
                                  <th>سایز</th>
                                  <th>نوع</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(size, i) in foundedSizes" :key="i">
                                  <td class="p-5">{{size.brandName}}</td>
                                  <td class="p-5">{{size.sizeInCM}}</td>
                                  <td class="p-5" style="direction:ltr">{{size.size}}</td>
                                  <td class="p-5">{{size.type=='men' ? 'مردانه' : size.type=='women' ? 'زنانه' : 'اسپورت'}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </TransitionRoot>

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
                    پیگیری خرید
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
                    پیگیری خرید
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
import sizeChart from '~/plugins/sizeCharts'
import { createToaster } from '@meforma/vue-toaster'

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

const { $bus } = useNuxtApp()

const searchProducts = ref('')
const toaster = createToaster({ position: 'top' })
const searchText = ref('')
const sizeInCM = ref('')
const foundedSizes = ref([])
const selectedBrand = ref('انتخاب برند')
const selectedType = ref('انتخاب نوع')
const sizeChartDialog = ref(false)
const selectedSection = ref(0)

 $bus.$on('sizeChartEvent', (data) => {
     sizeChartDialog.value = true
 })
const brands = [
  {
    en: 'nike',
    fa: 'نایکی'
  },
  {
    en: 'adidas',
    fa: 'آدیداس'
  },
  {
    en: 'new balance',
    fa: 'نیو بالانس'
  },
  {
    en: 'puma',
    fa: 'پوما'
  },
  {
    en: 'asics',
    fa: 'اسیکس'
  },
  {
    en: 'reebok',
    fa: 'ریبوک'
  },
  {
    en: 'salomon',
    fa: 'سالومون'
  },
  {
    en: 'timberland',
    fa: 'تیمبرلند'
  }
]

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

function calculate () {
  if (!sizeInCM.value || selectedBrand.value === 'انتخاب برند' || selectedType.value === 'انتخاب نوع')
    toaster.error('لطفا سایز و برند خود را وارد نمایید')
  else {
    foundedSizes.value = []
    let goal = parseFloat(sizeInCM.value)
    let min = 0
    let max = 0
    console.log(11, goal % 1);
    if (goal % 1 > 0.5) {
      max = Math.ceil(goal)
      min = Math.floor(goal) + 0.5
    } else if (goal % 1 < 0.5) {
      max = Math.floor(goal) + 0.5
      min = Math.floor(goal)
    } else {
      max = goal
      min = goal
    }
    console.log(max)
    console.log(min)
    let filteredBrands = sizeChart.sizeCharts.filter(
      brand => brand.brandName === selectedBrand.value && brand.type === selectedType.value
    )
    var closest1 = filteredBrands.reduce(function (prev, curr) {
      return Math.abs(parseFloat(curr.sizeInCM) - max) <
        Math.abs(parseFloat(prev.sizeInCM) - max)
        ? curr
        : prev
    })
    var closest2 = filteredBrands.reduce(function (prev, curr) {
      return Math.abs(parseFloat(curr.sizeInCM) - min) <
        Math.abs(parseFloat(prev.sizeInCM) - min)
        ? curr
        : prev
    })
  }

  console.log(closest1)
  console.log(closest2)
  if(closest1.size !== closest2.size) {
    foundedSizes.value.push(closest1)
    foundedSizes.value.push(closest2)
  } else {
    foundedSizes.value.push(closest2)
  }
  
}

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
.headerAccordion::after {
  border: none !important;
}
.headerAccordion::before {
  border: none !important;
}

#sizeChart {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#sizechart td, #sizechart th {
  border: 1px solid #ddd;
  padding: 8px;
}

#sizechart tr:nth-child(even){background-color: #f2f2f2;}

#sizechart tr:hover {background-color: #ddd;}

#sizechart th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #0468aa;
  color: white;
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
