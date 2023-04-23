<template>
    <div class="d-flex justify-center" style="width: 100%;">
        <div class="d-flex justify-start flex-column" style=" width: 100%;height: 100%">
            <div class="d-flex" style="height: 100px">

            </div>
        </div>
        <div class="d-flex flex-column align-center justify-center">
            <Search/>
            <div class="scroll-container light">
                <Post v-for="post in posts.data"
                      :id="post.id"
                      :title="post.title"
                      :update_at="post.updated_at"
                      :views="post.views"
                      :content="post.content"
                      :tag="post.tags"
                />
            </div>
        </div>
        <div class="d-flex justify-center align-end" style="width: 100%">
            <div class="d-flex align-center" style="height: 20%">
                <v-btn class="add-post-btn" icon="mdi-plus" size="large" color="#D9D9D9" @click="addPost"></v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import Post from "@/components/Home/Post.vue";
import Search from "@/components/Home/Search.vue";

import axios from 'axios';
import {useRouter} from 'vue-router';
import {onMounted, reactive} from "vue";

const router = useRouter();

const posts = reactive({
    data: null,
    error: null
})

async function addPost() {
    await router.push('/posts/add');
}

async function fetchPosts(){
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + "/posts")
        posts.data = response.data
    } catch (error) {
        posts.error = error;
        await router.push({path: import.meta.env.VITE_APP_ERROR_ROUTER});
    }
}

onMounted(fetchPosts);

</script>

<style scoped>
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