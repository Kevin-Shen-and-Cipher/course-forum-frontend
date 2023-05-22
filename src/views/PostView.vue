<template>
    <div
        v-if="postStore.post"
        class="d-flex flex-column justify-center align-center"
        style="width: 100%; height: 100%"
    >
        <div class="content d-flex flex-column justify-end" style="height: 10%">
            <div class="d-flex align-end">
                <PostCreatedDetail
                    :show-date="postStore.post.created_at.substring(0, 10)"
                    :department="postStore.post.create_by"
                />
            </div>
            <v-divider
                :thickness="4"
                class="border-opacity-100"
                color="grey"
                style="margin: 5px 0px"
            />
        </div>
        <div class="content d-flex flex-column" style="height: 90%">
            <div class="d-flex align-center justify-space-between mb-6">
                <v-label
                    :text="postStore.post.title"
                    style="font-size: 32pt; margin: 10px 0px"
                ></v-label>
                <div class="d-flex">
                    <Rating :rating-readonly="true" :rating="postStore.post.score" />
                </div>
            </div>
            <v-field style="font-size: 16pt; color: black" variant="plain">
                {{ postStore.post.content }}
            </v-field>
            <div class="d-flex justify-space-between">
                <ShowTgas :tagsData="postStore.post.tags" />
                <v-btn
                    prepend-icon="mdi-keyboard-return"
                    variant="text"
                    size="large"
                    @click="backMain"
                >
                    首頁
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script setup>
import Rating from '@/components/posts/Rating.vue';
import ShowTgas from '@/components/posts/ShowTags.vue';
import PostCreatedDetail from '@/components/posts/PostCreatedDetail.vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostsStore } from '@/store/posts';

const route = useRoute();
const router = useRouter();
const postStore = usePostsStore();
postStore.fetchPost(route.params.id);

function backMain() {
    router.push('/home');
}
</script>

<style scoped>
.content {
    width: 60%;
}
</style>
