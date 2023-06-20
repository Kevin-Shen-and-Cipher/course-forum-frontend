<template>
    <v-sheet class="alert" position="fixed" location="right top" color="#0000">
        <v-alert
            class="w-auto"
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
    z-index: 1001;
    margin: 80px 30px;
}
</style>
