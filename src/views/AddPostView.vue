<template>
    <div
        class="d-flex flex-column justify-center align-center scroll-container"
        style="width: 100%; height: 100%"
    >
        <div class="content d-flex flex-column justify-end" style="height: 20%; overflow: auto">
            <div class="d-flex" style="width: 500px">
                <SelectTags :label="label" v-model="post.tags" />
            </div>
            <div class="d-flex align-end justify-space-between">
                <PostCreatedDetail :department="authStore.department" :showDate="showDate" />
                <div class="d-flex align-center">
                    <Rating v-model:rating="post.score" />
                </div>
                <v-btn prepend-icon="mdi-note-plus-outline" @click="createPost()"> 發表文章 </v-btn>
            </div>
            <v-divider
                :thickness="4"
                class="border-opacity-100"
                color="grey"
                style="margin: 5px 0px"
            />
        </div>
        <div class="content d-flex" style="height: 60%">
            <div class="d-flex flex-column" style="width: 73%">
                <input
                    placeholder="請輸入標題"
                    v-model="post.title"
                    style="font-size: 32pt; margin: 10px 0px"
                />
                <v-textarea
                    auto-grow
                    variant="solo"
                    class="my-custom-textarea elevation-0"
                    label="(請在此地方寫下你最好的文章)"
                    v-model="post.content"
                ></v-textarea>
            </div>
            <PostRule />
        </div>
        <div class="d-flex justify-end" style="width: 60%">
            <v-btn prepend-icon="mdi-keyboard-return" variant="text" size="large" @click="backMain">
                首頁
            </v-btn>
        </div>
    </div>
</template>
<script setup>
import SelectTags from '@/components/posts/SelectTags.vue';
import PostCreatedDetail from '@/components/posts/PostCreatedDetail.vue';
import Rating from '@/components/posts/Rating.vue';
import PostRule from '@/components/posts/PostRule.vue';
import { useRouter } from 'vue-router';
import { onBeforeMount, reactive, ref } from 'vue';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';
import { create } from '@/API/Posts.js';


const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const label = ref(null);
const showDate = ref(null);
const post = reactive({
    title: '',
    content: '',
    score: 0,
    tags: [],
    create_by: authStore.apartment,
});

function backMain() {
    router.go(-1);
}

async function createPost() {
    if (await create(post)) {
        alertStore.callAlert('新增成功');
        router.push('/home');
    }
}

onBeforeMount(()=>{
    const date = new Date();
    label.value = '設定標籤';
    showDate.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
});
</script>

<style scoped>
.content {
    width: 60%;
}

input:hover,
input:focus,
input:active {
    outline: none;
    border-bottom: 1px solid purple;
}

.my-custom-textarea >>> .v-textarea__slot {
    font-size: 40px;
}
</style>
