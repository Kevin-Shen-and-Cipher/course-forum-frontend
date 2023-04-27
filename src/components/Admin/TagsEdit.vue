<template>
    <v-dialog max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">編輯標籤</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-text-field v-model="tags.name" label="標籤名稱"></v-text-field>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text"> 儲存 </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
const data = defineProps({
    tags: {
        type: Object,
        required: true,
    },
});
</script>
