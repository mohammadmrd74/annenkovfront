import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: 0,
    isUser: -1,
    userMobile: 0,
    name: 'Auth'
  }),
  persist: true,
  getters: {
    getToken: state => state.token,
    getIsUser: state => state.isUser,
    getUserMobile: state => state.userMobile
  },
  actions: {
    setToken (token) {
      this.token = token;
    },
    setUserMobile (mobile) {
      this.userMobile = mobile;
    },
    setUser (isUser) {
      this.isUser = isUser;
    }
  }
})
