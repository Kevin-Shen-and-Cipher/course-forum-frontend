<template>
    <div
        v-if="postData"
        class="d-flex flex-column justify-center align-center"
        style="width: 100%; height: 100%"
    >
        <div class="content d-flex flex-column justify-end" style="height: 10%">
            <div class="d-flex align-end justify-space-between">
                <PostCreatedDetail
                    :show-date="postData.created_at.substring(0, 10)"
                    :department="postData.create_by"
                />
                <div class="d-flex" v-if="!postData.state">
                    <v-btn
                        size="large"
                        @click="passVerify([postData.id])"
                        color="green"
                        style="margin-right: 10px"
                    >
                        通過審核
                    </v-btn>
                    <v-btn size="large" color="red" @click="verifyDeny"> 拒絕 </v-btn>
                </div>
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
                    :text="postData.title"
                    style="font-size: 32pt; margin: 10px 0px"
                ></v-label>
                <div class="d-flex">
                    <Rating :rating-readonly="true" :rating="postData.score" />
                </div>
            </div>
            <v-field style="font-size: 16pt; color: black" variant="plain">
                {{ postData.content }}
            </v-field>
            <div class="d-flex justify-space-between">
                <ShowTgas :tagsData="postData.tags" />
                <v-btn
                    prepend-icon="mdi-keyboard-return"
                    variant="text"
                    size="large"
                    @click="verifyDeny"
                >
                    關閉
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script setup>
import Rating from '@/components/posts/Rating.vue';
import ShowTgas from '@/components/posts/ShowTags.vue';
import PostCreatedDetail from '@/components/posts/PostCreatedDetail.vue';
import { usePostsStore } from '@/store/Posts.js';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount } from 'vue';

const postsStore = usePostsStore();
const route = useRoute();
const postData = computed(() => postsStore.post)


function verifyDeny() {
    window.close();
}

async function passVerify(id){
    if (await postsStore.verifySelectedPass([id])){
        window.close();
        
    }
}

onBeforeMount(async () => postsStore.fetchPost(route.params.id));
</script>

<style scoped>
.content {
    width: 60%;
}
</style>
