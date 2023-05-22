<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex align-end flex-column" style="width: 30%">
            <div class="d-flex justify-end" style="height: 100px"></div>
            <Filter v-model:select="selectedData" v-model:tag="tagData" />
        </div>
        <div class="d-flex flex-column align-center justify-center">
            <Search v-model="searchInput" />
            <div class="scroll-container light" v-if="postsData.length != 0">
                <Post v-for="post in postsData" :post="post" />
            </div>
            <div class="scroll-container light" v-else>
                <NoPost />
            </div>
        </div>
        <div class="d-flex justify-start align-end" style="width: 30%">
            <div class="d-flex justify-center align-center" style="width: 100%; height: 20%">
                <v-btn
                    class="add-post-btn"
                    icon="mdi-plus"
                    size="large"
                    color="#D9D9D9"
                    @click="addPost"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Post from '@/components/Home/Post.vue';
import Search from '@/components/Home/Search.vue';
import Filter from '@/components/Home/Filter.vue';
import NoPost from '@/components/Home/NoPost.vue';
import { usePostsStore } from '@/store/posts.js';

import { useRouter } from 'vue-router';
import { ref, watch, computed, onBeforeMount } from 'vue';
defineEmits('update:tag');
const router = useRouter();
const postsStore = usePostsStore();
const selectedData = ref([]);
const tagData = ref([]);
const searchInput = ref('');
const postsData = computed(() => {
    if (postsStore.searchResult == null) {
        return {};
    }
    return postsStore.searchResult.filter((data) => data.state);
});
async function addPost() {
    await router.push('/posts/add');
}

watch([searchInput, selectedData, tagData], () => {
    postsStore.searchPosts(searchInput.value, selectedData.value, tagData.value);
});

onBeforeMount(async () => postsStore.fetchPosts());
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
