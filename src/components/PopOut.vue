<template>
    <v-sheet position="fixed" location="right top" color="#0000" style="margin: 80px 30px">
        <v-alert
            class="alert"
            :type="alertStore.type"
            :text="alertStore.text"
            v-model="alertStore.show"
        ></v-alert>
    </v-sheet>
</template>

<script setup>
import { useAlertStore } from '@/store/Alert.js';
const alertStore = useAlertStore();
</script>

<style scoped>
.alert {
    z-index: 1;
    position: absolute;
    width: 300px;
    right: 40px;
    transition: 1s;
}
</style>
