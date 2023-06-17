<template>
    <v-app>
        <v-layout>
            <top-bar />
            <v-main class="h-sm-100 h-md-screen">
                <PopOut />
                <router-view />
            </v-main>
            <v-app-bar location="bottom">
                <Footer />
            </v-app-bar>
        </v-layout>
    </v-app>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue';
import TopBar from '@/components/TopBar.vue';
import PopOut from '@/components/PopOut.vue';
import { onMounted } from 'vue';
onMounted(() => {
    document.title = import.meta.env.VITE_APP_TITLE;
});
</script>