<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="11" md="10" class="d-flex justify-center flex-column">
                <v-row class="pt-2">
                    <v-col>
                        <JumpButton />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" class="d-flex align-center pl-3">
                        <Search v-model="searchInput" />
                    </v-col>
                    <v-col cols="12" md="4" offset-md="4" class="d-flex align-center justify-end">
                        <v-btn
                            class="mr-2"
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
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex align-start" v-if="postsStore.searchResult">
                        <PostsDataTable
                            v-model:selectedData="selectedData"
                            :searchInput="searchInput"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import JumpButton from '@/components/Admin/JumpButton.vue';
import Search from '@/components/Home/Search.vue';
import PostsDataTable from '@/components/Admin/PostsDataTable.vue';
import { usePostsStore } from '@/store/Posts.js';
import { ref, computed, watch, onBeforeMount } from 'vue';
defineEmits(['update:selectedData']);

const postsStore = usePostsStore();

const searchInput = ref('');
const buttonDisabled = computed(() => selectedData.value.length === 0);
const selectedData = ref([]);

watch(searchInput, () => {
    postsStore.searchPosts(searchInput.value);
});

onBeforeMount(async () => postsStore.fetchPosts());
</script>

<style scoped>
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
