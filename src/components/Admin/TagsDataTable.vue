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
        @update:modelValue="$emit('update:selectedData', selected)"
    >
        <template v-slot:top>
            <TagsEdit v-model="showDialog" :tags="tagData" @closeDialog="closeDialog" />
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn variant="text" @click="editOn(item.raw)"> 編輯標籤 </v-btn>
            <v-btn variant="text" color="red" @click="() => tagsStore.deleteTags([item.raw.id])">
                刪除標籤
            </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useTagsStore } from '@/store/Tags.js';
import TagsEdit from '@/components/Admin/TagsEdit.vue';
const tagsStore = useTagsStore();
const table = computed(() => tagsStore.searchResult);

//編輯Tag的暫存變數
const tagData = ref([]);

//編輯以及刪除的小視窗顯示
const showDialog = ref(false);

//DataTable的相關變數
const headers = ref([
    {
        title: '標籤名稱',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: '建立日期', align: 'end', key: 'created_at' },
    { title: '操作', align: 'end', key: 'actions' },
]);
const selected = ref([]);

//關閉小視窗
function closeDialog() {
    showDialog.value = false;
}

//開啟編輯視窗
function editOn(data) {
    showDialog.value = true;
    tagData.value = data;
}

watch(table, () => {
    selected.value = [];
});
</script>
