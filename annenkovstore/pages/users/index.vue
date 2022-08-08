<template>
  <div style="min-height: 70vh" class="container mx-auto">
    <div v-if="authstore.getIsUser == 0">
      <div
        v-if="state == 0"
        class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-md w-full  space-y-8" style="height: 70vh">
          <div>
            <img
              class="mx-auto h-28 w-auto"
              src="~/assets/logo.jpg"
              alt="Workflow"
            />
            <h2 class="mt-6 text-right text-2xl font-extrabold text-gray-900">
              ورود / ثبت نام
            </h2>
            <h2 class="mt-3 text-right text-1xl font-extrabold text-gray-900">
              لطفا شماره موبایل خود را وارد نمایید
            </h2>
          </div>
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">شماره تماس</label>
              <input
                @keydown.enter="sendSms"
                v-model="mobile"
                id="mobile"
                name="phonenumber"
                type="number"
                style="direction:ltr"
                required=""
                class="appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="09XXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <button
              @click="sendSms"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              ورود
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-md w-full  space-y-8" style="height: 70vh">
          <div>
            <img
              class="mx-auto h-28 w-auto"
              src="~/assets/logo.jpg"
              alt="Workflow"
            />
            <h2 class="mt-6 text-right text-2xl font-extrabold text-gray-900">
              ورود / ثبت نام
            </h2>
            <h2 class="mt-3 text-right text-1xl font-extrabold text-gray-900">
              لطفا کد تایید به شماره {{ mobile }} را وارد نمایید
            </h2>
          </div>
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="flex justify-center mt-8" style="direction:ltr">
              <!-- <label for="email-address" class="sr-only">شماره تماس</label> -->
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator="-"
                :num-inputs="5"
                v-model="code"
                :should-auto-focus="true"
                :is-input-num="true"
                :conditionalClass="['', 'two', 'three', 'four']"
                :placeholder="['', '', '', '']"
                @on-complete="handleOnComplete"
                @on-change="handleOnChange"
              />
            </div>
          </div>
          <div>
            <button
              @click="active"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div v-if="!wait">ارسال</div>
              <div v-else class="flex justify-center items-center">
                <div
                  class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="authstore.getIsUser == 1">
      <div class="min-h-full flex mt-12 justify-between  px-10 sm:px-6 lg:px-8">
        <div>
          <h2 class=" text-right text-2xl font-extrabold text-gray-900">
            سفارش ها
          </h2>
        </div>
        <div>
          <button
            @click="logout"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            خروج
          </button>
        </div>
      </div>
      <div v-if="orders.length">
        <div
          class="border rounded-xl m-5 px-5 my-3"
          v-for="(order, i) in orders"
          :key="i"
        >
          <div>
            <div class="md:flex m-4 px-3 md:justify-between">
              <h1 class=" text-lg py-3 font-bold">اطلاعات خریدار</h1>
              <h1 v-if="order.status == 'created'" class=" text-lg font-bold">
                وضعیت: {{ 'ایجاد شده' }}
              </h1>
              <h1
                v-else-if="order.status == 'paymented'"
                class=" text-lg font-bold text-green-500"
              >
                وضعیت: {{ 'پرداخت شده' }}
               <div class=" text-lg font-bold text-indigo-500">
                 کد پیگیری: {{order.trackNumber}}
               </div>
              </h1>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 p-4">
              <li>نام: {{ order.userData.firstname }}</li>
              <li>نام خانوادگی: {{ order.userData.lastname }}</li>
              <li>موبایل: {{ order.userData.mobile }}</li>
              <li>استان: {{ order.userData.province }}</li>
              <li>شهر: {{ order.userData.city }}</li>
              <li>آدرس: {{ order.userData.address }}</li>
              <li>کد پستی: {{ order.userData.postalCode }}</li>
            </div>
          </div>
          <li
            v-for="product in order.orderedProducts"
            :key="product.id"
            class="flex py-6 mt-4 px-3"
          >
            <div
              class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
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
                  <div class="mr-4">
                    <p>
                      {{
                        product.price
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                      }}
                      تومان
                    </p>
                    <p>سایز {{ product.size }}</p>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-500">
                  {{ product.styleNumber }}
                </p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">{{ product.count }} عدد</p>
              </div>
            </div>
          </li>
        </div>
      </div>
      <div v-else class="md:mt-10 md:mx-7">
        <span>سفارشی ثبت نشده است.</span>
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
import { useRoute } from 'vue-router'
const authstore = useAuthStore()
useHead({
  title: authstore.getIsUser == 0 ? `ورود/ثبت نام` : 'سفارش ها',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'آننکوف استور' }]
})
const route = useRoute()
const toaster = createToaster({ position: 'top' })
const mobile = ref('')
const state = ref(0)
const otpInput = ref(null)
let userData = ref({})
const code = ref('')
const orders = ref([])
const wait = ref(false)

const isUser = authstore.getIsUser

async function handleOnComplete (value) {
  try {
    const token = await $fetch(
      useRuntimeConfig().public.BASE_URL + '/activeuser',
      {
        method: 'POST',
        body: {
          userId: userData.userId,
          verificationNumber: parseInt(value, 10)
        }
      }
    )
    toaster.success(`با موفقیت وارد شدید.`)
    authstore.setUserMobile('0' + mobile.value)
    authstore.setToken(token.token)
    if (route.query.type !== 'cart') {
      authstore.setUser(true)
      state.value = 0
    }
    await getOrders()
    if (route.query.type === 'cart') {
      wait.value = true
      try {
        const checkproduct = await $fetch(
          useRuntimeConfig().public.BASE_URL +
            `/updateproduct?productId=${authstore.getProductToBuy.productId}&sizeId=${authstore.getProductToBuy.selectedSize.id}`,
          {
            method: 'GET'
          }
        )
        console.log('checked', checkproduct.data)
        // if (
        //   authstore.getProductToBuy.productPrice !==
        //   checkproduct.data.totalPrice
        // )
        //   toaster.error(
        //     `قیمت این محصول هم اکنون ${checkproduct.data.totalPrice} می باشد.`
        //   )
        const res = await $fetch(
          useRuntimeConfig().public.BASE_URL + '/insertToCart',
          {
            method: 'POST',
            body: {
              productId: authstore.getProductToBuy.productId,
              selectedColor: authstore.getProductToBuy.selectedColor,
              selectedSize: authstore.getProductToBuy.selectedSize.size,
              productPrice: authstore.getProductToBuy.productPrice,
              count: 1
            },
            headers: {
              Authorization: `Bearer ${authstore.getToken}`
            }
          }
        )
        wait.value = false
        authstore.setUser(true)

        return navigateTo({
          path: '/cart'
        })
      } catch (error) {
        wait.value = false

        console.log(error)
        if (error.response._data.message.includes('Duplicate'))
          toaster.error('این محصول هم اکنون در سبد خرید موجود می باشد')
        else if (error.response._data.message.includes('Size not Found.'))
          toaster.error('با عرض پوزش سایز انتخابی شما به پایان رسیده است.')
        return navigateTo({
          path: '/'
        })
      }
    }
  } catch (error) {
    console.log(error)
    toaster.error('کد اشتباه است')
  }
}
function handleOnChange (value) {
  code.value = value
}

function logout () {
  authstore.setToken(0)
  authstore.setUser(false)
}

onMounted(async () => {
  console.log(authstore.getProductToBuy)
  await getOrders()
  console.log(route.query.type === 'cart')
})

async function getOrders () {
  try {
    const res = await $fetch(
      useRuntimeConfig().public.BASE_URL + '/getorders',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authstore.getToken}`
        }
      }
    )
    orders.value = res.data.orders
    console.log(orders.value)
  } catch (error) {
    console.log(error)
  }
}

async function sendSms () {
  if (mobile.value) {
    try {
      const { data: user } = await $fetch(
        useRuntimeConfig().public.BASE_URL + '/otplogin',
        {
          method: 'POST',
          body: {
            firstname: '',
            lastname: '',
            username: '0' + mobile.value,
            password: '123456'
          }
        }
      )
      userData = user
    } catch (error) {
      console.log(error)
      toaster.error(`شماره همراه اشتباه است`)
    }

    state.value = 1
    console.log(state.value)
  }
}
async function active () {
  try {
    const { token: token } = await $fetch(
      useRuntimeConfig().public.BASE_URL + '/activeuser',
      {
        method: 'POST',
        body: {
          userId: userData.userId,
          verificationNumber: parseInt(code.value, 10)
        }
      }
    )
    console.log(2, token)
    await getOrders()
    toaster.success(`با موفقیت وارد شدید.`)
  } catch (error) {
    console.log(error)
    toaster.error('کد اشتباه است')
  }
}
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.otp-input {
  @media (min-width: 969px) {
    width: 60px;
  height: 60px;
  }
  @media (max-width: 968px) {
    width: 45px;
  height: 45px;
  }
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
