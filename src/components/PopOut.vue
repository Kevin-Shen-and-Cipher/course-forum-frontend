<template>
    <v-alert class="alert" type="success" :text="text" v-if="show"></v-alert>
</template>

<script setup>
defineProps({ show: Boolean, text: String });
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
