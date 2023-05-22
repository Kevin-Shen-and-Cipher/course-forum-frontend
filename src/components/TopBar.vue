<template>
    <v-app-bar app absolute color="rgba(189, 212,239, 1)">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="BarLogo" alt="Logo" style="float: left" @click="backMain" />
            </v-avatar>
        </v-toolbar-title>
        <div v-if="authStore.token" style="margin-right: 40px">
            <a style="margin-right: 20px">{{ authStore.department }}</a>
            <v-btn
                variant="outlined"
                color="rgba(70, 105,147, 1)"
                @click="admin"
                style="margin-right: 10px"
                v-if="authStore.admin"
            >
                管理員
            </v-btn>
            <v-btn variant="outlined" color="rgba(70, 105,147, 1)" @click="logout"> 登出 </v-btn>
        </div>
        <div v-else style="margin-right: 40px">
            <v-btn
                v-if="!loginButton"
                variant="outlined"
                color="rgba(70, 105,147, 1)"
                @click="sendLogin"
            >
                登入
            </v-btn>
            <v-btn v-else variant="outlined" color="rgba(70, 105,147, 1)" @click="backMain">
                返回首頁
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script setup>
import BarLogo from '@/assets/topbar_logo.png';
import { useRoute, useRouter } from 'vue-router';
import { computed, onBeforeMount } from 'vue';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';
const authStore = useAuthStore();
const alertStore = useAlertStore();
const route = useRoute();
const router = useRouter();
const loginButton = computed(() => route.name === 'login');



function sendLogin() {
    router.push('/login');
}

function admin() {
    router.push('/admin/posts');
}

function logout() {
    authStore.removeAuth();
    backMain();
    alertStore.callAlert('登出!');
}

function backMain() {
    router.push('/');
}
onBeforeMount(()=>{
    if (authStore.token != null){
        authStore.verify();
    }
})
</script>
