<template>
    <v-data-table
        id="mytable"
        show-select
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
        item-key="name"
    >
        <template v-slot:top>
            <TagsEdit v-model="showDialog" :tags="editTag" />
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn variant="text" @click="editOn(item.raw)"> 編輯標籤 </v-btn>
            <v-btn variant="text" color="red"> 刪除標籤 </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import TagsEdit from '@/components/Admin/TagsEdit.vue';

const selected = ref([]);
const headers = ref([
    {
        title: '標籤名稱',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: '建立日期', align: 'end', key: 'date' },
    { title: '操作', align: 'end', key: 'actions' },
]);
const desserts = ref([]);
const editTag = ref([]);
const showDialog = ref(false);
function editOn(data) {
    showDialog.value = true;
    editTag.value = data;
}

async function fetchTags() {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
        for (const i of response.data) {
            desserts.value.push({
                id: i.id,
                name: i.name,
                date: i.created_at.substring(0, 10),
            });
        }
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

onMounted(fetchTags);
</script>
