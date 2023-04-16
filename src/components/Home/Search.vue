<template>
    <div class="d-flex justify-center align-center search">
        <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="搜尋"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
        ></v-text-field>
    </div>
</template>
<script setup>
import {ref} from "vue";

const loaded = ref(false);
const loading = ref(false);

function onClick() {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        loaded.value = true;
    }, 2000);
}
</script>
<style>
.search {
    width: 400px;
    height: 90px;
}
</style>