<template>
    <v-data-table
        id="mytable"
        show-select
        v-model="selected"
        :headers="headers"
        :items="table"
        :items-per-page="10"
        class="elevation-1"
        item-key="name"
        style="height: 100%;"
        @update:modelValue="$emit('update:selectedData', selected)"
    >
        <template v-slot:item.actions="{ item }">
            <v-btn variant="text" @click="() => checkPost(item.raw.id)"> 查看文章 </v-btn>
            <v-btn
                variant="text"
                v-if="!item.raw.state"
                color="success"
                @click="() => postsStore.verifySelectedPass([item.raw.id])"
            >
                通過審核
            </v-btn>
            <v-btn variant="text" color="red" @click="() => postsStore.deletePosts([item.raw.id])">
                刪除文章
            </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, watch, computed } from 'vue';
import { usePostsStore } from '@/store/posts';
const router = useRouter();
const postsStore = usePostsStore();
defineEmits(['update:selectedData']);
const headers = ref([
    { title: '文章名稱', align: 'start', key: 'title' },
    { title: '狀態', align: 'end', key: 'verify' },
    { title: '日期', align: 'end', key: 'created_at' },
    { title: '操作', align: 'end', key: 'actions' },
]);
const selected = ref([]);
const table = computed(() => postsStore.searchResult);

function checkPost(id) {
    const routerData = router.resolve({ name: 'AdminPostsCheck', params: { id: id } });
    window.open(routerData.href, '_blank');
}

watch(table, () => {
    selected.value = [];
});
</script>
