<template>
    <div class="d-flex">
        <v-chip v-for="i in tagsData" v-if="tagsData"> #{{ i.names }}</v-chip>
    </div>
</template>
<script setup>
const props = defineProps({
    tagsData: {
        type: Object,
        required: true,
    },
});
</script>
