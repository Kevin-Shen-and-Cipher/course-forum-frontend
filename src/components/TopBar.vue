<template>
    <v-app-bar app absolute color="rgba(189, 212,239, 1)">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="BarLogo" alt="Logo" style="float: left" @click="backMain" />
            </v-avatar>
        </v-toolbar-title>
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
    </v-app-bar>
</template>
<script setup>
import BarLogo from '@/assets/topbar_logo.png';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const loginButton = computed(() => route.name === 'login');

function sendLogin() {
    router.push('/login');
}

function backMain() {
    router.push('/');
}
</script>
