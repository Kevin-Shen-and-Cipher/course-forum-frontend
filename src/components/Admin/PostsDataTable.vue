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
            <v-btn
                variant="text"
                v-if="!item.raw.btnCheck"
                color="success"
                @click="verifyPass(item.raw.id)"
            >
                通過審核
            </v-btn>
            <v-btn variant="text" color="red" @click="deletePosts"> 刪除文章 </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, watch, computed } from 'vue';
import { useAlertStore } from '@/store/alert';
const router = useRouter();
const alertStore = useAlertStore();
const props = defineProps({ searchInput: { type: String }, data: { type: Object } });
const emits = defineEmits(['callReFetch', 'update:selectedData']);
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
const searchDesserts = computed(() => props.data);

function checkPost(id) {
    const routerData = router.resolve({ name: 'AdminPostsCheck', params: { id: id } });
    window.open(routerData.href, '_blank');
}

async function verifyPass(id) {
    try {
        await axios.patch(import.meta.env.VITE_APP_API_URL + '/posts/' + id, {
            state: true,
        });
        emits('callReFetch');
        alertStore.callAlert("審核成功");
    } catch (error) {
        alertStore.callAlert(error.message, "error");
        console.log(alertStore.type)
    }
}

async function deletePosts(id) {
    try {
        await axios.delete(import.meta.env.VITE_APP_API_URL + '/posts/' + id);
        emits('callReFetch');
        alertStore.callAlert("刪除成功");
    } catch (error) {
        alertStore.callAlert(error.message, "error");
    }
}

function searchPosts(postTitle) {
    searchDesserts.value = props.data.filter((dessert) => {
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
