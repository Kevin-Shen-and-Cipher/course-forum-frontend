<template>
    <v-row>
        <v-rating
            v-model="rate"
            :readonly="ratingReadonly"
            hover
            @update:modelValue="$emit('update:rating', rate)"
        ></v-rating>
    </v-row>
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
