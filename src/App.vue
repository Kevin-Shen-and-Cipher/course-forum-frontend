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
            <div class="d-flex" style="height: 100%;margin: 20px">
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
    import {RouterView} from 'vue-router';
    import Footer from '@/components/Footer.vue';
    import TopBar from "@/components/TopBar.vue";
=======
<script>
import {RouterView} from 'vue-router';
import Footer from '@/components/Footer.vue';
import TopBar from "./components/TopBar.vue";

export default {
    components: {
        Footer,
        TopBar
    }
}
>>>>>>> f10a358 (feat: change template flex)
</script>
