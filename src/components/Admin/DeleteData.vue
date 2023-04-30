<template>
    <v-dialog max-width="500px">
        <v-card>
            <v-card-title class="text-h5">確定要刪除 {{ title }} {{ data.name }}</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="$emit('deleteData')"
                    >確認</v-btn
                >
                <v-btn color="blue-darken-1" variant="text" @click="$emit('closeDialog')"
                    >取消</v-btn
                >
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
defineProps({
    data: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
</script>
