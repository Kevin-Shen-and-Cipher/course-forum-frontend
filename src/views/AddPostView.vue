<template>
    <div
        class="d-flex flex-column justify-center align-center scroll-container"
        style="width: 100%; height: 100%"
    >
        <div class="content d-flex flex-column justify-end" style="height: 20%; overflow: auto">
            <div class="d-flex" style="width: 500px">
                <SelectTags :label="label" v-model="selectedTags" />
            </div>
            <div class="d-flex align-end justify-space-between">
                <PostCreatedDetail :department="department" :showDate="showDate" />
                <div class="d-flex align-center">
                    <Rating v-model:rating="rating" />
                </div>
                <v-btn prepend-icon="mdi-note-plus-outline" @click="addPost"> 發表文章 </v-btn>
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
                    v-model="title"
                    style="font-size: 32pt; margin: 10px 0px"
                />
                <v-textarea
                    auto-grow
                    class="my-custom-textarea"
                    label="(請在此地方寫下你最好的文章)"
                    v-model="content"
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
import { ref, watch } from 'vue';
import axios from 'axios';

const router = useRouter();
const label = '設定標籤';
const department = '資訊工程系';
const selectedTags = ref([]);
const rating = ref(0);
const title = ref('');
const tags = ref([]);
const content = ref('');
const date = new Date();
const showDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
watch(title, () => console.log(title.value));
function backMain() {
    router.go(-1);
}
async function transforTags() {
    try {
        tags.value = [];
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
        tags.value = selectedTags.value.map((selectedTag) => {
            const tag = response.data.find((tag) => tag.name === selectedTag);
            return tag ? tag.id : null;
        });
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}
async function addPost() {
    await transforTags();
    console.log(tags.value);
    try {
        await axios.post(import.meta.env.VITE_APP_API_URL + '/posts',{
            title: title.value,
            tags:tags.value,
            content: content.value,
            score: rating.value,
            create_by: "資訊工程系"
        });
        router.push("/home");
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}
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
