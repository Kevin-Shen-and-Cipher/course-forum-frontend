<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <JumpButton />
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <div class="d-flex align-center">
                    <Search v-model="searchInput" />
                    <v-btn style="margin-left: 20px" @click="dialogAction(true)">新增標籤</v-btn>
                    <TagsAdd v-model="showDialog" @addTags="addTags" @dialogAction="dialogAction" />
                </div>
                <div class="d-flex">
                    <v-btn color="red" :disabled="buttonDisabled" @click="deleteSelected"
                        >勾選刪除</v-btn
                    >
                </div>
            </div>
            <div class="d-flex scroll-container">
                <TagsDataTable
                    v-model="selectedData"
                    :searchInput="searchInput"
                    :data="tagsData"
                    @callReFetch="fetchTags"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import JumpButton from '@/components/Admin/JumpButton.vue';
import Search from '@/components/Home/Search.vue';
import TagsDataTable from '@/components/Admin/TagsDataTable.vue';
import { useAlertStore } from '@/store/alert.js';
import TagsAdd from '@/components/Admin/TagsAdd.vue';
import { ref, watch, onMounted } from 'vue';
defineEmits(['callAlert', 'update:modelValue', 'callReFetch', 'closeDialog']);
const alertStore = useAlertStore();
const searchInput = ref('');
const selectedData = ref([]);
const buttonDisabled = ref(true);
const tagsData = ref([]);
const showDialog = ref(false);

function dialogAction(action) {
    showDialog.value = action;
}

async function addTags(data) {
    try {
        await axios.post(import.meta.env.VITE_APP_API_URL + '/tags', { name: data });
        alertStore.callAlert('新增成功');
        fetchTags();
        dialogAction(false);
    } catch (error) {
        alertStore.callAlert(error.message, 'error');
    }
}
async function deleteSelected() {
    try {
        for (const i of selectedData.value) {
            await axios.delete(import.meta.env.VITE_APP_API_URL + '/tags/' + i);
        }
        alertStore.callAlert('全部刪除成功');
        fetchTags();
    } catch (error) {
        alertStore.callAlert(error.message, 'error');
    }
}

watch(selectedData, () => {
    buttonDisabled.value = selectedData.value.length === 0;
});

async function fetchTags() {
    try {
        selectedData.value = [];
        tagsData.value = [];
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
        for (const i of response.data) {
            tagsData.value.push({
                id: i.id,
                name: i.name,
                date: i.created_at.substring(0, 10),
            });
        }
    } catch (error) {
        alertStore.callAlert(error.message, 'error');
    }
}

onMounted(fetchTags);
</script>
<style scoped>
.scroll-container {
    overflow-y: scroll;
}

.light::-webkit-scrollbar {
    width: 15px;
}

.light::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 20px;
}

.light::-webkit-scrollbar-thumb:hover {
    background: black;
}
</style>
