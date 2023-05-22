<template>
    <v-alert
        class="alert"
        :type="alertStore.type"
        :text="alertStore.text"
        v-model="alertStore.show"
    ></v-alert>
</template>

<script setup>
import { useAlertStore } from '@/store/alert';
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
