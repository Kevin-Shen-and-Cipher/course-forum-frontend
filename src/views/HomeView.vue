<template>
    <div class="d-flex justify-center" style="width: 100%;">
        <div class="d-flex flex-column align-center">
            <Search/>
            <div class="scroll-container light">
                <Post v-for="i in 50" :id = "i"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Post from "@/components/Home/Post.vue";
import Search from "@/components/Home/Search.vue";
</script>

<style>
.scroll-container {
    overflow-y: scroll;
    height: 80vh;
}

.light::-webkit-scrollbar {
    width: 15px;
}

.light::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 20px;
}

.light::-webkit-scrollbar-thumb:hover {
    background: black;
}
</style>