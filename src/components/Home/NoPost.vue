<template>
    <v-sheet
            class="post d-flex mb-4 rounded-lg"
            v-bind="props"
            :color="isHovering ? 'grey-lighten-1' : 'grey-lighten-2'"
        >
            <v-col class="d-none d-md-flex d-lg-flex align-center justify-center" cols="2">
                <v-icon icon="mdi-forum" size="40"></v-icon>
            </v-col>
            <v-col class="d-flex pa-1" cols="8">
                <v-card color="transparent" variant="tonal">
                    <div class="text-black">
                        <v-card-text>
                            無貼文
                        </v-card-text>
                    </div>
                </v-card>
            </v-col>
            <v-col class="d-flex align-center justify-end" cols="4" md="2" lg="2" xl="2">
            </v-col>
        </v-sheet>
</template>
<script setup></script>
