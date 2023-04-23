<template>
    <label class="d-flex justify-start" style="padding-left: 10px; font-size: 14pt"
        >{{ department }} &nbsp;&nbsp;&nbsp;{{ showDate }}</label
    >
</template>

<script setup>
const props = defineProps({
    department: {
        type: String,
        required: true,
    },
    showDate: {
        type: String,
        required: true,
    },
});
</script>

<script setup>
const props = defineProps({
    department: {
        type: String,
        required: true
    },
    showDate: {
        type: String,
        required: true
    }
})
</script>