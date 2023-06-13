<template>
    <v-col>
        <v-chip v-for="i in tagsData" v-if="tagsData" style="margin-left: 10px">
            #{{ i.name }}</v-chip
        >
    </v-col>
</template>
<script setup>
const props = defineProps({
    tagsData: {
        type: Object,
        required: true,
    },
});
</script>
