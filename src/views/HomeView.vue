<template>
    <div class="d-flex justify-center" style="width: 100%;">
        <div class="d-flex flex-column align-center">
            <Search/>
            <div class="scroll-container" ref="scrollContainer" @scroll="handleScroll">
                <Post v-for="i in 50"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import Post from "@/components/Home/Post.vue";
import Search from "@/components/Home/Search.vue";
import {onMounted, ref} from "vue";

const scrollContainer = ref(null);

function handleScroll() {
    console.log("true");
}

onMounted(() => {
    scrollContainer.value.style.overflowY = "scroll";
});
</script>
<style>
.scroll-container {
    overflow-y: scroll;
    height: 80vh;
}
</style>