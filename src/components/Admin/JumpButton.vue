<template>
    <div class="d-flex flex-colume">
        <v-btn class="buttonGap" @click="toPost()"> 貼文管理 </v-btn>
        <v-btn class="buttonGap" @click="toTags()"> 標籤管理 </v-btn>
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
<style scope>
.buttonGap {
    margin: 0px 10px;
}
</style>
