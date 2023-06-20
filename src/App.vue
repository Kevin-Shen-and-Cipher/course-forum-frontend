<template>
    <v-app>
        <v-layout>
            <top-bar />
            <v-main class="h-sm-100 h-md-screen">
                <PopOut />
                <router-view />
            </v-main>
            <v-app-bar  location="bottom" color="blue-lighten-4">
                <v-app-var-title class="text-black text-body-1 ml-5">
                    2023 - class project by 沈育安 and 劉官瑜
                </v-app-var-title>
            </v-app-bar>
        </v-layout>
    </v-app>
</template>
<script setup>
import { RouterView } from 'vue-router';
import TopBar from '@/components/TopBar.vue';
import PopOut from '@/components/PopOut.vue';
import { onMounted } from 'vue';
onMounted(() => {
    document.title = import.meta.env.VITE_APP_TITLE;
});
</script>