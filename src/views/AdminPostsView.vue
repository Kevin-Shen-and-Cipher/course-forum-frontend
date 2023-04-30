<template>
    <PopOut
        :alert-show="alertShow"
        :text="alertText"
        @update:model-value="(newValue) => (alertShow = newValue)"
    />
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <Search v-model="searchInput" />
                <div class="d-flex justify-space-between">
                    <v-btn
                        style="margin-right: 20px"
                        color="green"
                        :disabled="buttonDisabled"
                        @click="verifySelectedPass"
                        >勾選審核</v-btn
                    >
                    <v-btn color="red" :disabled="buttonDisabled" @click="deletePosts"
                        >勾選刪除</v-btn
                    >
                </div>
            </div>
            <div class="d-flex scroll-container">
                <PostsDataTable
                    v-model="selectedData"
                    :searchInput="searchInput"
                    :data="postsData"
                    @callReFetch="fetchPosts"
                    @callAlert="callAlert"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import Search from '@/components/Home/Search.vue';
import PostsDataTable from '@/components/Admin/PostsDataTable.vue';
import PopOut from '@/components/PopOut.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
defineEmits(['update:selectedData']);

const router = useRouter();
const searchInput = ref('');
const selectedData = ref([]);
const postsData = ref([]);
const buttonDisabled = ref(true);
const alertShow = ref(false);
const alertText = ref('');

watch(selectedData, () => {
    buttonDisabled.value = selectedData.value.length === 0;
});

function callAlert(text) {
    alertShow.value = true;
    alertText.value = text;
}

async function verifySelectedPass() {
    try {
        for (const i of selectedData.value) {
            await axios.patch(import.meta.env.VITE_APP_API_URL + '/posts/' + i, {
                state: true,
            });
        }
        fetchPosts();
        callAlert('全部審核成功');
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

async function fetchPosts() {
    try {
        postsData.value = [];
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/posts');
        for (const i of response.data) {
            const state = ref(false);
            if (i.state) {
                state.value = '審核通過';
            } else {
                state.value = '未審核';
            }
            postsData.value.push({
                id: i.id,
                name: i.title,
                state: state.value,
                date: i.created_at.substring(0, 10),
                btnCheck: i.state,
            });
        }
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

async function deletePosts() {
    try {
        for (const i of selectedData.value) {
            await axios.delete(import.meta.env.VITE_APP_API_URL + '/posts/' + i.id);
        }
        fetchPosts();
        callAlert('全部刪除成功');
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

onMounted(fetchPosts);
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
