import { defineStore } from 'pinia';
import { useAlertStore } from '@/store/alert.js';

export const useAuthStore = defineStore({
    id: 'auth',
    persist: {
        key: 'auth',
    },
    state: () => ({
        token: null,
        department: null,
        admin: false,
        exp: null,
    }),
    actions: {
        async verify() {
            const alertStore = useAlertStore();
            try {
                const nowTime = Date.now();
                if (nowTime / 1000 >= this.exp) {
                    this.removeAuth();
                    return false;
                }
                return true;
            } catch (error) {
                alertStore.callAlert(error.message, 'error');
                this.removeAuth();
                return false;
            }
        },
        async login(data) {
            const alertStore = useAlertStore();
            try {
                return await fetch(import.meta.env.VITE_APP_API_URL + '/tags', {
                    method: 'POST',
                    body: JSON.stringify(data + { name: 'test' }),
                })
                    .then((response) => {
                        if (!response.ok) throw new Error(response.status);
                        this.setAuth(data.token, data.apartment, data.identify, data.exp);
                        alertStore.callAlert('登入成功');
                        return true;
                    })
                    .catch((error) => {
                        alertStore.callAlert('錯誤發生 請查看控制台', 'error');
                        return false;
                    });
            } catch (error) {
                console.log(error);
                alertStore.callAlert(error.message, 'error');
            }
        },
        setAuth(token, apartment, identify, exp) {
            this.department = apartment;
            this.token = token;
            if (identify === 'admin') {
                this.admin = true;
            } else {
                this.admin = false;
            }
            this.exp = exp;
        },
        removeAuth() {
            this.apartment = null;
            this.token = null;
            this.admin = false;
            this.exp = null;
        },
    },
});
