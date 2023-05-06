<template>
    <v-data-table
        id="mytable"
        show-select
        v-model="selected"
        :headers="headers"
        :items="table"
        :items-per-page="5"
        class="elevation-1"
        item-key="name"
        @update:modelValue="$emit('update:selectedData', selected)"
    >
        <template v-slot:top>
            <TagsEdit
                v-model="showDialog"
                :tags="tagData"
                @closeDialog="closeDialog"
                @editData="editTag"
            />
            <DeleteData
                v-model="showDeleteDialog"
                title="標籤"
                :data="tagData"
                @closeDialog="closeDialog"
                @deleteData="deleteData"
            />
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn variant="text" @click="editOn(item.raw)"> 編輯標籤 </v-btn>
            <v-btn variant="text" color="red" @click="deleteOn(item.raw, '標籤')"> 刪除標籤 </v-btn>
        </template>
    </v-data-table>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useTagsStore } from '@/store/Tags.js';
import TagsEdit from '@/components/Admin/TagsEdit.vue';
import DeleteData from '@/components/Admin/DeleteData.vue';
const tagsStore = useTagsStore();
const table = computed(() => tagsStore.searchResult);

//編輯Tag的暫存變數
const tagData = ref([]);

//編輯以及刪除的小視窗顯示
const showDialog = ref(false);
const showDeleteDialog = ref(false);

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
    showDeleteDialog.value = false;
}

//開啟編輯視窗
function editOn(data) {
    showDialog.value = true;
    tagData.value = data;
}

//開啟刪除確認視窗
function deleteOn(data) {
    showDeleteDialog.value = true;
    tagData.value = data;
}

//編輯資料
async function editTag() {
    tagsStore.editTag(tagData.value);
    closeDialog();
}

//刪除資料
async function deleteData() {
    await tagsStore.deleteTags([tagData.value.id]);
    closeDialog();
}

watch(table, () => {
    selected.value = [];
});
</script>
