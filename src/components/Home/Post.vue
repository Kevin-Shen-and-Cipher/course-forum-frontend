<template>
    <v-hover v-slot="{ isHovering, props }" close-delay="10">
        <v-sheet
            class="post d-flex mb-4 rounded-lg"
            v-bind="props"
            :color="isHovering ? 'grey-lighten-1' : 'grey-lighten-2'"
            @click="inPost"
        >
            <v-col class="d-none d-md-flex d-lg-flex align-center justify-center" cols="2">
                <v-icon icon="mdi-forum" size="40"></v-icon>
            </v-col>
            <v-col class="d-flex pa-1" cols="8">
                <v-card color="transparent" variant="tonal">
                    <div class="text-black">
                        <v-card-title>
                            {{ post.title }}
                        </v-card-title>
                        <v-card-subtitle>
                            {{ post.created_at.substring(0, 10) }}
                        </v-card-subtitle>
                        <v-card-text>
                            {{ post.content }}
                        </v-card-text>
                        <v-chip class="ma-1 text-caption h-auto" v-for="i in post.tags">
                            {{ i.name }}
                        </v-chip>
                    </div>
                </v-card>
            </v-col>
            <v-col class="d-flex align-center justify-end" cols="4" md="2" lg="2" xl="2">
                <div class="d-flex flex-column align-center justify-center">
                    <a>{{ post.views }}</a>
                    <a>Views</a>
                </div>
            </v-col>
        </v-sheet>
    </v-hover>
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
