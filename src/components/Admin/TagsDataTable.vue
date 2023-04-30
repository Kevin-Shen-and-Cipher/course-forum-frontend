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
        @update:modelValue="$emit('update:modelValue', selected)"
    >
        <template v-slot:top>
            <TagsEdit
                v-model="showDialog"
                :tags="editTag"
                @closeDialog="closeDialog"
                @editData="editData"
            />
            <DeleteData
                v-model="showDeleteDialog"
                title="標籤"
                :data="editTag"
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
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import TagsEdit from '@/components/Admin/TagsEdit.vue';
import DeleteData from '@/components/Admin/DeleteData.vue';
const emits = defineEmits(['callAlert', 'update:modelValue', 'callReFetch']);
const router = useRouter();
const props = defineProps({ searchInput: { type: String }, data: { type: Object } });

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
    { title: '建立日期', align: 'end', key: 'date' },
    { title: '操作', align: 'end', key: 'actions' },
]);
const selected = ref([]);
const searchDesserts = ref(props.data);

//編輯Tag的暫存變數
const editTag = ref([]);

//關閉小視窗
function closeDialog() {
    showDialog.value = false;
    showDeleteDialog.value = false;
}

//開啟編輯視窗
function editOn(data) {
    showDialog.value = true;
    editTag.value = data;
}

//編輯資料
async function editData() {
    try {
        console.log(editTag.value);
        await axios.patch(
            import.meta.env.VITE_APP_API_URL + '/tags/' + editTag.value.id,
            editTag.value,
        );
        emits('callReFetch');
        emits('callAlert', '編輯完成');
        closeDialog();
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

//開啟刪除確認視窗
function deleteOn(data) {
    showDeleteDialog.value = true;
    editTag.value = data;
}

//刪除資料
async function deleteData() {
    showDeleteDialog.value = false;
    try {
        await axios.delete(import.meta.env.VITE_APP_API_URL + '/tags/' + editTag.value.id);
        emits('callReFetch');
        emits('callAlert', '刪除成功');
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
}

//搜尋標籤
function searchTags(tagName) {
    searchDesserts.value = props.data.filter((dessert) => {
        if (tagName !== '' && !dessert.name.includes(tagName)) {
            return false;
        }
        return true;
    });
}

watch(
    () => props.data,
    () => {
        searchDesserts.value = props.data;
    },
);

//隨時判斷搜尋字串的輸入
watch(
    () => props.searchInput,
    (now) => {
        searchTags(now);
    },
);
</script>
