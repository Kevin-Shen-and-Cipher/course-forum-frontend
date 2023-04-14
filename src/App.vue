<template>
    <v-app>
        <v-container style="height: 100%;width: 100%">
            <top-bar/>
            <v-row style="height: 95%">
                <router-view/>
            </v-row>
            <v-row align="end" style="height: 5%;">
                <Footer/>
            </v-row>
        </v-container>
    </v-app>
</template>
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
</script>
