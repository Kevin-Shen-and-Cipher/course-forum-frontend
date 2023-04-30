<template>
    <v-app-bar app absolute color="rgba(189, 212,239, 1)">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="BarLogo" alt="Logo" style="float: left" @click="backMain" />
            </v-avatar>
        </v-toolbar-title>
        <div v-if="tokenFind" style="margin-right: 40px">
            <a style="margin-right: 20px">{{ apartment }}</a>
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
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const apartment = localStorage.getItem('apartment');
const tokenFind = computed(() => localStorage.getItem('token') != null);
const loginButton = computed(() => route.name === 'login');

function sendLogin() {
    router.push('/login');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('apartment');
    backMain();
}

function backMain() {
    router.push('/').then(() => { router.go() });
}
</script>
