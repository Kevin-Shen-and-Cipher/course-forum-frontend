<template>
    <v-container>
        <v-row class="d-flex flex-column align-center">
            <v-col cols="10" lg="8">
                <v-row class="d-flex flex-column align-start justify-start">
                    <v-col cols="12" class="pt-10 pb-2 px-0">
                        <PostCreatedDetail
                            :department="authStore.department"
                            :showDate="showDate"
                        />
                        <v-divider
                            :thickness="4"
                            class="border-opacity-100 w-100 "
                            color="grey"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12" md="6" class="pb-3 d-flex align-center">
                        <div
                            class="d-none d-md-flex align-center justify-center"
                        >
                            <label>設定課程評分：</label>
                            <Rating v-model:rating="post.score" width="200px" />
                        </div>
                        <div
                            class="d-flex d-md-none flex-column align-start justify-center"
                        >
                            <label>設定課程評分：</label>
                            <Rating v-model:rating="post.score" width="200px" />
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" class="d-flex align-center">
                        <SelectTags :label="label" v-model="post.tags" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            placeholder="請輸入標題"
                            v-model="post.title"
                            variant="flat"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea
                            density="comfortable"
                            name="input-7-1"
                            variant="flat"
                            placeholder="請輸入文章內容"
                            auto-grow
                            hide-details
                            v-model="post.content"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex align-end justify-end pt-10">
                        <v-btn
                            prepend-icon="mdi-note-plus-outline"
                            @click="createPost()"
                            >發表文章</v-btn
                        >
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import SelectTags from '@/components/posts/SelectTags.vue';
import PostCreatedDetail from '@/components/posts/PostCreatedDetail.vue';
import Rating from '@/components/posts/Rating.vue';
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
    create_by: authStore.department,
});


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