<template>
    <div class="post d-flex" @click="inPost">
        <div class="d-flex align-center justify-center" style="width: 15%">
            <v-icon icon="mdi-forum" size="40"></v-icon>
        </div>
        <div class="d-flex" style="width: 60%">
            <v-card color="transparent" border="0" variant="tonal">
                <div class="v-card__text">
                    <v-card-title>
                        {{ post.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ post.created_at.substring(0, 10) }}
                    </v-card-subtitle>
                    <v-card-text>
                        {{ post.content }}
                    </v-card-text>
                    <v-chip
                        v-for="i in post.tags"
                        style="height: 20px; font-size: 8pt; margin: 5px"
                    >
                        {{ i.name }}
                    </v-chip>
                </div>
            </v-card>
        </div>
        <div class="d-flex align-center justify-end" style="width: 25%">
            <div class="d-flex flex-column align-center justify-center" style="width: 60%">
                <a>{{ post.views }}</a>
                <a>Views</a>
            </div>
        </div>
    </div>
</template>
<script setup>
import router from '@/router/router';
const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
});

function inPost() {
    router.push('/posts/' + props.post.id);
}
</script>
<style scoped>
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
