<template>
    <div class="d-flex align-center w-100">
        <v-text-field
            density="compact"
            variant="solo"
            label="搜尋"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        ></v-text-field>
    </div>
</template>
<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>