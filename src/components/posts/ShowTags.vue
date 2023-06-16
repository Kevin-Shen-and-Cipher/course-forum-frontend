<template>
    <v-col>
        <v-chip class="mr-3" v-for="i in tagsData" v-if="tagsData">
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
