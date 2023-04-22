<template>
    <label style="font-size: 14pt" v-if="!ratingReadonly">設定課程評分：</label>
    <v-rating v-model="rating" :readonly="ratingReadonly" hover></v-rating>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
    showLabel: {
        type: Boolean,
        default: false,
    },
    ratingReadonly: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
    },
});
const rating = ref(props.rating);
</script>
