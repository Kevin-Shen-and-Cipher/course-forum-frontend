<template>
    <label style="font-size: 14pt" v-if="!ratingReadonly">設定課程評分：</label>
    <v-rating
        v-model="rate"
        :readonly="ratingReadonly"
        hover
        @update:modelValue="$emit('update:rating', rate)"
    ></v-rating>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
    showLabel: {
        type: Boolean,
        required: false,
        default: false,
    },
    ratingReadonly: {
        type: Boolean,
        required: false,
        default: false,
    },
    rating: {
        type: Number,
        required: false,
        default: 0,
    },
});
const rate = ref(props.rating);
</script>
