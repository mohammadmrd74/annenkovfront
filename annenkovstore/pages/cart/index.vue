<template>
  <div style="min-height: 70vh" class="container mx-auto">
    <h1 class="m-9 text-2xl font-bold">سبد خرید</h1>
    <hr class="my-4 " />
    <div v-if="authstore.getIsUser == 0">
      <div
        class="flex flex-col border items-center mx-5 py-10 rounded-lg justify-center text-2xl font-bold mt-10"
      >
        <h2 class="text-center">
          لطفا ابتدا وارد شوید
        </h2>
        <nuxt-link
          to="/users"
          class="mt-10 group relative  w-1/3 flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >ورود / ثبت نام</nuxt-link
        >
      </div>
    </div>
    <div v-else-if="authstore.getIsUser == 1">
      <div v-if="pstate === 0">
        <div v-if="cartItems.length > 0">
          <li
            v-for="(product, i) in cartItems"
            :key="product.productId"
            class="flex py-6 mt-4 px-10"
          >
            <div
              class="h-28 md:w-48 w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
            >
              <img
                :src="product.image"
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
                    <a href="#"> {{ product.title }} </a>
                  </h3>
                  <p class="mr-4">
                    {{
                      product.price
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    }}
                    تومان
                  </p>
                </div>
                <p class="mt-1">سایز {{ product.size }}</p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ product.styleNumber }}
                </p>
              </div>
              <div class="text-left  items-end justify-end text-sm">
                <Menu as="div" class="relative inline-block  text-left">
                  <div>
                    <MenuButton
                      class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    >
                      تعداد: {{ product.count }}
                      <ChevronDownIcon
                        class="-mr-1 ml-5 h-5 w-5"
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
                      class="origin-top-right absolute left-0 mt-2 w-20 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <div
                            @click="changeCount(1, i)"
                            :class="[
                              orderDir == 'desc'
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            ]"
                          >
                            1
                          </div>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
                <button
                  @click="deleteCart(product.id)"
                  class=" justify-center md:mx-3 mt-3 p-3 w-full md:w-fit mx-auto border border-transparent text-md font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  حذف
                </button>
                <!-- <div class="flex">
              <button
                type="button"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div> -->
              </div>
            </div>
          </li>

          <div class="flex items-center justify-center px-10 mt-12">
            <span
              v-if="sumProduct"
              class="text-center text-xl font-bold w-2/3 items-center"
              >مبلغ کل: {{ sumProduct }} تومان</span
            >
            <button
              @click="countinuePurchase"
              class=" justify-center py-4 w-1/3 px-2 mx-auto border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ادامه خرید
            </button>
          </div>
        </div>
        <div v-else>
          <span class="text-xl mx-5">
            سبد خرید خالی می باشد.
          </span>
        </div>
      </div>
      <div v-else-if="pstate === 1">
        <div class="mt-10 sm:mt-0 md:px-12 px-4 py-3">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-6 md:mt-10">
              <div class="flex justify-between px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  مشخصات خریدار
                </h3>
                <h3
                  @click="pstate = 0"
                  class="text-lg cursor-pointer font-medium leading-6 text-gray-900"
                >
                  بازگشت
                </h3>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-12 mb-12">
              <div class="shadow sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="first-name"
                        class="block text-sm font-medium text-gray-700"
                        >نام</label
                      >
                      <input
                        v-model="firstname"
                        type="text"
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="last-name"
                        class="block text-sm font-medium text-gray-700"
                        >نام خانوادگی</label
                      >
                      <input
                        v-model="lastname"
                        type="text"
                        name="last-name"
                        id="last-name"
                        autocomplete="family-name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-2 lg:col-span-2">
                      <label
                        for="last-name"
                        class="block text-sm font-medium text-gray-700"
                        >موبایل</label
                      >
                      <input
                        v-model="userMobile"
                        type="text"
                        name="last-name"
                        id="last-name"
                        autocomplete="family-name"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        for="city"
                        class="block text-sm font-medium text-gray-700"
                        >استان</label
                      >
                      <input
                        v-model="province"
                        type="text"
                        name="city"
                        id="city"
                        autocomplete="address-level2"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        for="city"
                        class="block text-sm font-medium text-gray-700"
                        >شهر</label
                      >
                      <input
                        v-model="city"
                        type="text"
                        name="city"
                        id="city"
                        autocomplete="address-level2"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        for="region"
                        class="block text-sm font-medium text-gray-700"
                        >کدپستی</label
                      >
                      <input
                        v-model="postalCode"
                        type="text"
                        name="region"
                        id="region"
                        autocomplete="address-level1"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div class="col-span-6">
                      <label
                        for="street-address"
                        class="block text-sm font-medium text-gray-700"
                        >آدرس</label
                      >
                      <textarea
                        v-model="address"
                        type="text"
                        name="street-address"
                        id="street-address"
                        autocomplete="street-address"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 mb-12">
                  <div class="my-4 flex">
                    <input
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      type="checkbox"
                      v-model="agree"
                      id="flexCheckChecked"
                    />
                    <label
                      class="form-check-label mx-2  inline-block text-gray-800"
                      for="flexCheckChecked"
                      style="direction: ltr;"
                    >
                      با
                      <a href="/rules" class="text-indigo-900" target="_blank"
                        >قوانین و مقررات</a
                      >
                      آننکوف استور موافق هستم
                    </label>
                  </div>
                  <button
                    :disabled="!agree"
                    @click="pay"
                    :class="[
                      !agree
                        ? 'bg-indigo-400'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    ]"
                    class="inline-flex w-full h-14 pt-3 justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    ورود به صفحه پرداخت
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid'
import { createToaster } from '@meforma/vue-toaster'
import { useAuthStore } from '@/stores/auth'
import VOtpInput from 'vue3-otp-input'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
useHead({
  title: 'سبد خرید',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'آننکوف استور' }]
})
const authstore = useAuthStore()
const toaster = createToaster({ position: 'top' })
const mobile = ref('')
const state = ref(0)
const firstname = ref('')
const lastname = ref('')
const userMobile = ref('')
const province = ref('')
const city = ref('')
const address = ref('')
const postalCode = ref('')
const otpInput = ref(null)
const agree = ref(false)
let userData = ref({})
const code = ref('')
const sumProduct = ref('')

const token = authstore.getToken

const cartItems = ref([])
const pstate = ref(0)

userMobile.value = authstore.getUserMobile

function changeCount (value, i) {
  console.log(cartItems)
  cartItems.value[i].count = value
  sumProduct.value = cartItems.value
    .reduce((acc, curr) => acc + curr.price * curr.count, 0)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function countinuePurchase () {
  window.scrollTo(0, 0)
  pstate.value = 1
}

function validate () {
  if (
    firstname.value &&
    lastname.value &&
    userMobile.value &&
    address.value &&
    city.value &&
    province.value
  ) {
    return true
  }
  return false
}

async function deleteCart(pId) {
  try {
      let res = await $fetch(
        useRuntimeConfig().public.BASE_URL + '/removeItemCart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authstore.getToken}`
          },
          body: {
            productId: pId
          }
        }
      )
      init();
  } catch(e) {
    console.log(e);
  }
}

async function pay () {
  if (validate()) {
    let payBody = {
      userData: {
        firstname: firstname.value,
        lastname: lastname.value,
        postalCode: postalCode.value,
        mobile: userMobile.value,
        province: province.value,
        city: city.value,
        address: address.value
      },
      orderedProducts: cartItems.value
    }
    console.log(payBody)
    try {
      let res = await $fetch(
        useRuntimeConfig().public.BASE_URL + '/insertorder',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authstore.getToken}`
          },
          body: payBody
        }
      )
      console.log('order', res.data)
      authstore.setOrderAmount({
        id: res.data.orderId,
        amount: parseInt(sumProduct.value.replaceAll('.', ''))
      })

      let bank = await $fetch(
        useRuntimeConfig().public.BASE_URL + '/bank/sign',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authstore.getToken}`
          },
          body: {
            Amount: parseInt(sumProduct.value.replaceAll('.', '')),
            Description: `خرید از آننکوف استور`
          }
        }
      )
      console.log(bank)

      window.open(
        'https://www.zarinpal.com/pg/StartPay/' + bank.data.authority,
        '_self'
      )

      //go to bank and then confirm
    } catch (error) {
      console.log(13, error)
    }
  } else {
    toaster.error('لطفا همه اطلاعات را پر نمایید')
  }
}

async function init(){
  if (authstore.getToken) {
    try {
      let res = await $fetch(useRuntimeConfig().public.BASE_URL + '/getcart', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authstore.getToken}`
        }
      })
      cartItems.value = res.data.cart
      sumProduct.value = cartItems.value
        .reduce((acc, curr) => acc + curr.price * curr.count, 0)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      console.log(cartItems)
      authstore.setCartNumber(res.data.cart.length)
    } catch (error) {
      console.log(13, error)
    }
  } else authstore.setUser(0)
}
onMounted(async () => {
  init();
})
</script>

<style>
.otp-input {
  width: 60px;
  height: 60px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
.v--default-css .c-toast {
  font-family: inherit !important;
}
</style>
