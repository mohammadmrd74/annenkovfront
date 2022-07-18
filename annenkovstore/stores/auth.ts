import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: 0,
    isUser: -1,
    userMobile: 0,
    name: 'Auth',
    productToBuy: {},
    cartNumber : 0,
    orderAmount: {}
  }),
  persist: true,
  getters: {
    getToken: state => state.token,
    getIsUser: state => state.isUser,
    getUserMobile: state => state.userMobile,
    getProductToBuy: state => state.productToBuy,
    getCartNumber: state => state.cartNumber,
    getOrderAmount: state => state.orderAmount
  },
  actions: {
    setToken (token) {
      this.token = token;
    },
    setProductToBuy (productToBuy) {
      this.productToBuy = productToBuy;
    },
    setUserMobile (mobile) {
      this.userMobile = mobile;
    },
    setUser (isUser) {
      this.isUser = isUser;
    },
    setCartNumber (number) {
      this.cartNumber = number
    },
    setOrderAmount(amount) {
      this.orderAmount = amount;
    }
  }
})
