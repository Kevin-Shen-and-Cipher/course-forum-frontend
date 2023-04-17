<template>
    <v-card
            width="550"
            height="300"
            class="d-flex flex-column"
    >
        <v-card-title>
            課程論壇
        </v-card-title>
        <div class="d-flex flex-column justify-center card-text">
            <div class="d-flex flex-column align-center">
                <v-text-field label="學號" v-model="username" variant="outlined" style="width: 85%"></v-text-field>
            </div>
            <div class="d-flex flex-column align-center justify-center">
                <v-text-field label="密碼" v-model="password" variant="outlined" style="width: 85%"></v-text-field>
            </div>
        </div>
        <div class="d-flex flex-column align-center justify-center">
            <v-card-actions class="justify-center">
                <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)" @click="login">
                    <span style="color: white">登入</span>
                </v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router';

const username = ref("");
const password = ref("");
const router = useRouter();

function login() {
    router.push("/");
}


</script>
<style scoped>
.card-text {
    height: 175px;
    padding-top: 10px;
}
</style>
