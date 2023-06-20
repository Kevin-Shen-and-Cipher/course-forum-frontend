<template>
    <v-app-bar color="blue-lighten-4">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="BarLogo" class="float-left" alt="Logo" @click="backMain" />
            </v-avatar>
        </v-toolbar-title>
        <v-row>
            <v-col class="d-flex justify-end" cols="12">
                <v-row v-if="authStore.token" class="d-flex justify-end mr-3">
                    <a class="mr-5 d-flex align-center">{{ authStore.department }}</a>
                    <v-btn
                        variant="outlined"
                        class="mr-2"
                        color="rgba(70, 105,147, 1)"
                        @click="admin"
                        v-if="authStore.admin"
                    >
                        管理員
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        color="rgba(70, 105,147, 1)"
                        @click="logout"
                    >
                        登出
                    </v-btn>
                </v-row>
                <v-row v-else class="d-flex justify-end mr-3">
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
                </v-row>
            </v-col>
        </v-row>
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
    backMain();
    authStore.removeAuth();
    alertStore.callAlert('登出!');
}

function backMain() {
    router.push('/');
}
onBeforeMount(() => {
    if (authStore.token != null) {
        authStore.verify();
    }
});
</script>
