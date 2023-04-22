<template>
    <keep-alive>
        <AddContent v-if="checkKey"></AddContent>
    </keep-alive>
    <Content></Content>
</template>

<script setup>
import Content from "@/components/posts/Content.vue";
import AddContent from "@/components/posts/AddContent.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
console.log(route.params.key);

const checkKey = computed(() => {
    return route.params.key === "add";
})
</script>

<style scoped>
</style>