import { defineStore } from 'pinia';
import { useAlertStore } from '@/store/alert.js';
import axios from 'axios';
export const useAuthStore = defineStore({
  id: "auth",
  persist:{
    key: "auth"
  },
  state: () => ({
    token: null,
    apartment: null,
    admin: false
  }),
  actions: {
    async verify(){
      try {
        const response = await axios.post(import.meta.env.VITE_APP_API_URL + '/verify',{
                headers: {
                  Authorization: 'Bearer ' +  useAuthStore().token
              }
              });
        if (response.status != 200){
          this.removeAuth();
        }
        useAlertStore().callAlert("登入成功");
    } catch (error) {
        useAlertStore().callAlert(error.message, "error")
    }
    },
    async login(data){
      try {
          //const response = await axios.post(import.meta.env.VITE_APP_API_URL + '/login', data);
          this.setAuth("test", "資訊工程系", 'admin');
          useAlertStore().callAlert("登入成功");
      } catch (error) {
          useAlertStore().callAlert(error.message, "error")
      }
    },
    setAuth(token, apartment, identify) {
      this.apartment = apartment;
      this.token = token;
      if (identify === "admin"){
        this.admin = true
      }
    },
    removeAuth() {
      this.apartment = null;
      this.token = null;
      this.admin = false;
    }
  }
})