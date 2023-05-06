<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <JumpButton />
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <Search v-model="searchInput" />
                <div class="d-flex justify-space-between">
                    <v-btn
                        style="margin-right: 20px"
                        color="green"
                        :disabled="buttonDisabled"
                        @click="postsStore.verifySelectedPass(selectedData)"
                        >勾選審核</v-btn
                    >
                    <v-btn
                        color="red"
                        :disabled="buttonDisabled"
                        @click="postsStore.deletePosts(selectedData)"
                        >勾選刪除</v-btn
                    >
                </div>
            </div>
            <div class="d-flex scroll-container" v-if="postsStore.searchResult">
                <PostsDataTable v-model:selectedData="selectedData" :searchInput="searchInput" />
            </div>
        </div>
    </div>
</template>

<script setup>
import JumpButton from '@/components/Admin/JumpButton.vue';
import Search from '@/components/Home/Search.vue';
import PostsDataTable from '@/components/Admin/PostsDataTable.vue';
import { usePostsStore } from '@/store/posts';
import { ref, computed, watch } from 'vue';
defineEmits(['update:selectedData']);

const postsStore = usePostsStore();
postsStore.fetchPosts();

const searchInput = ref('');
const buttonDisabled = computed(() => selectedData.value.length === 0);
const selectedData = ref([]);

watch(searchInput, () => {
    postsStore.searchPosts(searchInput.value);
});
</script>

<style scoped>
.scroll-container {
    overflow-y: scroll;
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
