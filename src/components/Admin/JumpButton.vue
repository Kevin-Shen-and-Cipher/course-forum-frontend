<template>
    <div class="d-flex flex-colume">
        <v-btn class="mr-4" @click="toPost()"> 貼文管理 </v-btn>
        <v-btn @click="toTags()"> 標籤管理 </v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function toPost() {
    router.push('/admin/posts');
}
function toTags() {
    router.push('/admin/tags');
}
</script>
