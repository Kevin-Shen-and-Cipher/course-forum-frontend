<template>
    <v-container v-if="postStore.post">
        <v-row class="d-flex align-center">
            <v-col cols="8" offset="2">
                <v-row>
                    <v-col class="d-flex flex-column justify-end mt-5">
                        <div class="d-flex align-end">
                            <PostCreatedDetail
                                :show-date="postStore.post.created_at.substring(0, 10)"
                                :department="postStore.post.create_by"
                            />
                        </div>
                        <v-divider
                            :thickness="4"
                            class="border-opacity-100 my-2 mx-0"
                            color="grey"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="8">
                        <v-field class="text-h5 text-lg-h4 text-md-h4 my-2 mx-0"  variant="flat">{{ postStore.post.title }}</v-field>
                    </v-col>
                    <v-col cols="12" md="4" class="d-flex jutify-center align-center">
                        <Rating :rating-readonly="true" :rating="postStore.post.score" />
                    </v-col>
                    <v-col>
                        <ShowTgas :tagsData="postStore.post.tags" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-field class="text-black text-body-1" variant="plain">
                            {{ postStore.post.content }}
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
