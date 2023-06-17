<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3" class="d-flex align-center flex-column">
                <Filter v-model:select="selectedData" v-model:tag="tagData" />
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column">
                <v-row class="d-flex justify-center align-end shrink">
                    <v-col cols="11" md="10" lg="10">
                        <Search v-model="searchInput" />
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center grow">
                    <v-col cols="11" md="12" class="d-flex flex-column scroll-container light">
                        <Post v-for="post in postsData" :post="post" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-sheet position="fixed" location="right bottom" color="#0000" style="margin: 80px 30px">
        <v-btn class="add-post-btn" icon="mdi-plus" size="large" color="#D9D9D9" @click="addPost" />
    </v-sheet>
</template>

<script setup>
import Post from '@/components/Home/Post.vue';
import Search from '@/components/Home/Search.vue';
import Filter from '@/components/Home/Filter.vue';
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
    height: 75vh;
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
