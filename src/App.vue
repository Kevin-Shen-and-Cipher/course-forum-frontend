<template>
    <v-app>
        <div class="d-flex flex-column" style="height: 100%;overflow-x: scroll;min-width: 1000px;">
            <div class="d-flex flex-column" style="height: 64px">
                <top-bar />
            </div>
            <div class="d-flex main-section">
                <PopOut />
                <router-view />
            </div>
            <div class="d-flex" style="height: 64px">
                <Footer />
            </div>
        </div>
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
<style scoped>
.main-section {
    min-height: 100vh;
    margin: 20px;
}
</style>
