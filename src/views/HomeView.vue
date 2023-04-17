<template>
    <div class="d-flex justify-center" style="width: 100%;">
        <div class="d-flex flex-column align-center">
            <Search/>
            <div class="scroll-container light">
                <Post v-for="post in state.data"
                      :id="post.id"
                      :title="post.title"
                      :update_at="post.updated_at"
                      :views="post.views"
                      :content="post.content"/>
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

const state = reactive({
    data: null,
    error: null
})

onMounted(async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + "/posts")
        state.data = response.data
    } catch (error) {
        state.error = error;
        router.push('/error');
    }
})

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