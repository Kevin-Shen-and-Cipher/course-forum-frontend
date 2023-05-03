import { defineStore } from 'pinia'
export const useAuthStore = defineStore({
  id: "auth",
  persist:{
    key: "auth"
  },
  state: () => ({
    token: null,
    apartment: null,
  }),
  actions: {
    setAuth(token, apartment) {
      this.apartment = apartment;
      this.token = token;
    },
    removeAuth() {
      this.apartment = null;
      this.token = null
    }
  }
})