<template>
    <div class="d-flex flex-column justify-center align-center" style="width: 100%;height: 100%">
        <div class="content d-flex flex-column justify-end" style="height: 20%">
            <div class="d-flex" style="width: 500px">
                <SelectTags :label="label"/>
            </div>
            <div class="d-flex align-end justify-space-between">
                <PostCreatedDetail :department="department" :showDate="showDate"/>
                <div class="d-flex align-center">
                    <Rating/>
                </div>
                <AddPostBtn/>
            </div>
            <v-divider
                :thickness="4"
                class="border-opacity-100"
                color="grey"
                style="margin: 5px 0px"
            />
        </div>
        <div class="content d-flex" style="height: 80%;">
            <div class="d-flex flex-column" style="width: 73%">
                <input placeholder="請輸入標題" style="font-size: 32pt;margin: 10px 0px;">
                <v-textarea auto-grow class="my-custom-textarea" label="(請在此地方寫下你最好的文章)"></v-textarea>
            </div>
            <PostRule/>
        </div>
    </div>
</template>
<script setup>
import SelectTags from "@/components/posts/SelectTags.vue";
import AddPostBtn from "@/components/posts/AddPostBtn.vue";
import PostCreatedDetail from "@/components/posts/PostCreatedDetail.vue";
import Rating from "@/components/posts/Rating.vue";
import PostRule from "@/components/posts/PostRule.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const label = "設定標籤";
const department = "資訊工程系";
const date = new Date();
const showDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();


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