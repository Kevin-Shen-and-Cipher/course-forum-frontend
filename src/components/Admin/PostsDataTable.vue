<template>
    <v-data-table
        id="mytable"
        show-select
        v-model="selected"
        :headers="headers"
        :items="searchDesserts"
        :items-per-page="5"
        class="elevation-1"
        item-key="name"
        @update:modelValue="$emit('update:selectedData', selected)"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn variant="text" @click="checkPost(item.raw.id)"> 查看文章 </v-btn>
            <v-btn variant="text" v-if="item.raw.btnCheck"> 審核 </v-btn>
            <v-btn variant="text" color="red"> 刪除文章 </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
const selected = ref([]);
const headers = ref([
    {
        title: '文章名稱',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: '狀態', align: 'end', key: 'state' },
    { title: '日期', align: 'end', key: 'date' },
    { title: '操作', align: 'end', key: 'actions' },
]);
const desserts = ref([]);
const searchDesserts = ref([]);
const props = defineProps({ searchInput: { type: String } });
const router = useRouter();

function checkPost(id) {
    const routerData = router.resolve({ name: 'AdminPostsCheck', params: { id: id } });
    console.log(routerData);
    window.open(routerData.href, '_blank');
}

async function fetchPosts() {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/posts');
        for (const i of response.data) {
            const state = ref(false);
            if (i.state) {
                state.value = '未審核';
            } else {
                state.value = '審核通過';
            }
            desserts.value.push({
                id: i.id,
                name: i.title,
                state: state.value,
                date: i.created_at.substring(0, 10),
                btnCheck: i.state,
            });
        }
        searchDesserts.value = desserts.value;
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

onMounted(fetchPosts);

function searchPosts(postTitle) {
    searchDesserts.value = desserts.value.filter((dessert) => {
        if (postTitle !== '' && !dessert.name.includes(postTitle)) {
            return false;
        }
        return true;
    });
}

watch(
    () => props.searchInput,
    (now) => {
        searchPosts(now);
    },
);
</script>
