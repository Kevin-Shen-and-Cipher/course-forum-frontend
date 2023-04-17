<template>
    <v-app>
<<<<<<< HEAD
        <div class="d-flex flex-column" style="height: 100%">
=======
        <div class="d-flex flex-column" style = "height: 100%">
>>>>>>> f10a358 (feat: change template flex)
            <div class="d-flex flex-column" style="height: 64px">
                <top-bar/>
            </div>
            <div class="d-flex main-section">
                <router-view/>
            </div>
            <div class="d-flex" style="height: 64px">
                <Footer/>
            </div>
        </div>
    </v-app>
</template>
<<<<<<< HEAD
<script setup>
<<<<<<< HEAD
import {RouterView} from 'vue-router';
import Footer from '@/components/Footer.vue';
import TopBar from "@/components/TopBar.vue";
<<<<<<< HEAD

=======
    import {RouterView} from 'vue-router';
    import Footer from '@/components/Footer.vue';
    import TopBar from "@/components/TopBar.vue";
=======
import {onMounted} from "vue";

onMounted(() => {
    document.title = import.meta.env.VITE_APP_TITLE;
});
>>>>>>> b96c342 (feat: change title in app.vue)
</script>
<style>
body::-webkit-scrollbar {
    display: none;
}

.main-section {
    height: calc(90vh - 100px);
    margin: 20px
}
</style>