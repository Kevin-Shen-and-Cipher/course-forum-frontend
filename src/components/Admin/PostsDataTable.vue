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
        <template v-slot:item.actions="{ item }">
            <v-btn variant="text">
                查看文章
            </v-btn>
            <v-btn variant="text" v-if="item.btnCheck">
                審核
            </v-btn>
            <v-btn variant="text" color="red">
                刪除文章
            </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

const selected = ref([]);
const headers = ref([
    {
        title: '文章名稱',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    {title: '狀態', align: 'end', key: 'state'},
    {title: '日期', align: 'end', key: 'date'},
    {title: '操作', align: 'end', key: 'actions'},
]);
const desserts = ref([]);

async function fetchPosts() {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + "/posts");
        for (const i of response.data) {
            const state = ref(false);
            if (i.state) {
                state.value = "未審核"
            } else {
                state.value = "審核通過"
            }
            desserts.value.push(
                {
                    "name": i.title,
                    "state": state.value,
                    "date": i.created_at.substring(0, 10),
                    "btnCheck": i.state
                });
        }
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

onMounted(fetchPosts)
</script>