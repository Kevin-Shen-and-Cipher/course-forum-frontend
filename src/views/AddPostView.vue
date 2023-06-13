<template>
    <div
        class="d-flex flex-column justify-center align-center"
        style="width: 100%;min-width: 1200px;"
    >
        <div
            class="d-flex flex-column justify-end align-start"
            style="width: 60%; max-width: 1120px;margin-top: 5vh;"
        >
            <div class="d-flex" style="width: 40%">
                <v-row>
                    <v-col cols="12">
                        <SelectTags :label="label" v-model="post.tags" />
                    </v-col>
                </v-row>
            </div>
            <div class="d-none d-lg-flex d-md-none justify-end" style="width:100%">
                <v-row>
                    <v-col cols="4" class="d-flex align-end justify-start">
                        <PostCreatedDetail
                            :department="authStore.department"
                            :showDate="showDate"
                        />
                    </v-col>
                    <v-col cols="6">
                        <div class="d-none d-lg-flex d-md-none align-center">
                            <label style="font-size: 14pt">設定課程評分：</label>
                            <Rating v-model:rating="post.score" width="200px" />
                        </div>
                    </v-col>
                    <v-col cols="2" class="d-flex align-end justify-center">
                        <v-btn prepend-icon="mdi-note-plus-outline" @click="createPost()"
                            >發表文章</v-btn
                        >
                    </v-col>
                </v-row>
            </div>
            <div class="d-none d-lg-none d-md-flex justify-end">
                <v-row>
                    <v-col cols="4" md="2" lg="4" sm="2" class="d-flex align-end justify-start">
                        <PostCreatedDetail
                            :department="authStore.department"
                            :showDate="showDate"
                        />
                    </v-col>
                    <v-col cols="6">
                        <div class="d-flex align-start flex-column">
                            <label style="font-size: 14pt">設定課程評分：</label>
                            <Rating v-model:rating="post.score" width="200px" />
                        </div>
                    </v-col>
                    <v-col cols="2" sm="4" md="4" lg="2" class="d-flex align-end justify-center">
                        <v-btn prepend-icon="mdi-note-plus-outline" @click="createPost()"
                            >發表文章</v-btn
                        >
                    </v-col>
                </v-row>
            </div>
            <v-divider
                :thickness="4"
                class="border-opacity-100"
                color="grey"
                style="margin: 5px 0px; width: 100%"
            />
        </div>
        <div class="d-flex" style="width: 60%; max-width: 1120px">
            <div class="d-flex flex-column" style="width: 100%">
                <input
                    placeholder="請輸入標題"
                    v-model="post.title"
                    style="font-size: 32pt; margin: 10px 0px"
                />
                <v-textarea
                    density="comfortable"
                    name="input-7-1"
                    variant="filled"
                    label="Label"
                    auto-grow
                    model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    style="min-height: 50vh;"
                ></v-textarea>
            </div>
            <PostRule />
        </div>
        <div class="d-flex justify-end align-end" style="width: 60%;">
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
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';
import { create } from '@/API/Posts.js';

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const { mdAndUp } = useDisplay();

const label = ref(null);
const showDate = ref(null);
const post = reactive({
    title: '',
    content: '',
    score: 0,
    tags: [],
    create_by: authStore.department,
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

onBeforeMount(() => {
    const date = new Date();
    label.value = '設定標籤';
    showDate.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
});
</script>

<style scoped>
input:hover,
input:focus,
input:active {
    outline: none;
    border-bottom: 1px solid purple;
}

.my-custom-textarea >>> .v-textarea__slot {
    font-size: 40px;
}

label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
</style>
