<template>
    <v-app-bar app absolute color="rgba(189, 212,239, 1)">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="BarLogo" alt="Logo" style="float: left;">
            </v-avatar>
        </v-toolbar-title>
        <v-btn v-if="button_login" variant="outlined" color="rgba(70, 105,147, 1)" @click="login">
            login
        </v-btn>
        <v-btn v-else v-show="visible" variant="outlined" color="rgba(70, 105,147, 1)" @click="login">
            login
        </v-btn>
    </v-app-bar>
</template>
<script>
import BarLogo from "@/assets/topbar_logo.png"

export default {
    data() {
        return {
            BarLogo: BarLogo
        }
    },
    computed: {
        button_login() {
            return this.$route.path === '/login';
        },
        visible(){
            return false;
        }
    },
    methods: {
        login() {
            this.$router.push('/login')
        }
    }
}
</script>