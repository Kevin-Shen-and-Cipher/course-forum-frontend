<template>
    <div v-if="postData.data" class="d-flex flex-column justify-center align-center" style="width: 100%;height: 100%">
        <div class="content d-flex flex-column justify-end" style="height: 10%">
            <div class="d-flex align-end">
                {{ postData.data.create_by }}
                {{ postData.data.created_at.substring(0, 10) }}
            </div>
            <v-divider :thickness="4"
                       class="border-opacity-100"
                       color="grey"
                       style="margin: 5px 0px"
            />
        </div>
        <div class="content d-flex flex-column" style="height: 90%;">
            <div class="d-flex align-center justify-space-between mb-6">
                <v-label :text=postData.data.title style="font-size: 32pt;margin: 10px 0px;"></v-label>
                <div class="d-flex ">
                    <v-rating
                            v-model="rating"
                            readonly
                    ></v-rating>
                </div>
            </div>
            <v-field style="font-size: 16pt; color: black" variant="plain">
                {{ postData.data.content }}
            </v-field>
        </div>
    </div>
</template>
<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {ref, reactive, onBeforeMount} from "vue";

const route = useRoute();
const router = useRouter();
const rating = ref(4);
const postData = reactive({
    data: null,
    error: null
});

async function fetchPostData(){
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + "/posts/" + route.params.id);
        postData.data = response.data;
        rating.value = postData.data.score;
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

onBeforeMount(fetchPostData);


</script>

<style scoped>
.content {
    width: 60%;
}

.v-card__text {
    color: black;
}
</style>