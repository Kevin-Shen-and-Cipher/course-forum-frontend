<template>
    <div class="d-flex">
        <a v-if="checkNull" v-for="i in tagsData">#{{ i.names }}</a>
    </div>
</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
    tagsData: {
        type: Object,
        required: true
    }
})

const checkNull = computed(() => {
    return props.tagsData == null;
})
</script>