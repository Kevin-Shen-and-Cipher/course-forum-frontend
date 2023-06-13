<template>
    <v-container v-if="postData">
        <v-row class="d-flex align-center">
            <v-col cols="8" offset="2">
                <v-row>
                    <v-col class="content d-flex flex-column justify-end" style="margin-top: 50px">
                        <div class="d-flex align-end">
                            <PostCreatedDetail
                                :show-date="postData.created_at.substring(0, 10)"
                                :department="postData.create_by"
                            />
                        </div>
                        <v-divider
                            :thickness="4"
                            class="border-opacity-100"
                            color="grey"
                            style="margin: 5px 0px"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-label
                            :text="postData.title"
                            style="font-size: 32pt; margin: 10px 0px"
                        ></v-label>
                    </v-col>
                    <v-col cols="12" md="4" class="d-flex jutify-center align-center">
                        <Rating :rating-readonly="true" :rating="postData.score" />
                    </v-col>
                    <v-col>
                        <ShowTgas :tagsData="postData.tags" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-field style="font-size: 16pt; color: black" variant="plain">
                            {{ postData.content }}
                        </v-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
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
const postData = computed(() => postsStore.post);

function verifyDeny() {
    window.close();
}

async function passVerify(id) {
    if (await postsStore.verifySelectedPass([id])) {
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
