<template>
    <div class="post d-flex" @click="inPost">
        <div class="d-flex align-center justify-center" style="width: 15%">
            <v-icon icon="mdi-forum" size="40"></v-icon>
        </div>
        <div class="d-flex" style="width: 60%">
            <v-card color="transparent" border="0" variant="tonal">
                <div class="v-card__text">
                    <v-card-title>
                        posts-title
                    </v-card-title>
                    <v-card-subtitle>
                        time
                    </v-card-subtitle>
                    <v-card-text>
                        content
                    </v-card-text>
                </div>
            </v-card>
        </div>
        <div class="d-flex align-center justify-center" style="width: 25%">
            <div class="d-flex flex-column align-center justify-center" style="width: 40%">
                <a>20</a>
                <a>Views</a>
            </div>
            <div class="d-flex flex-column align-center" style="height: 80%;border-right: 2px solid black;">
            </div>
            <div class="d-flex flex-column align-center justify-center" style="width: 40%">
                <a>20</a>
                <a>Likes</a>
            </div>
        </div>
    </div>
</template>
<script setup>
import router from "@/router/router";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

function inPost() {
    router.push("/posts/" + props.id);
}
</script>
<style>
.post {
    background-color: rgba(232, 230, 230, 1);
    height: 150px;
    width: 650px;
    margin: 20px;
    border-radius: 10px;
    transition: 0.5s;
}

.post:hover {
    background-color: rgba(173, 173, 173, 1);
    transition: 100ms;
}

.v-card__text {
    color: black;
}
</style>