<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <JumpButton />
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <div class="d-flex align-center">
                    <Search v-model="searchInput" />
                    <v-btn style="margin-left: 20px" @click="dialogAction(true)">新增標籤</v-btn>
                    <TagsAdd v-model="showDialog" @dialogAction="dialogAction" />
                </div>
                <div class="d-flex">
                    <v-btn
                        color="red"
                        :disabled="buttonDisabled"
                        @click="tagsStore.deleteTags(selectedData)"
                        >勾選刪除</v-btn
                    >
                </div>
            </div>
            <div class="d-flex scroll-container" v-if="tagsStore.searchResult">
                <TagsDataTable v-model:selectedData="selectedData" :searchInput="searchInput" />
            </div>
        </div>
    </div>
</template>
<script setup>
import JumpButton from '@/components/Admin/JumpButton.vue';
import Search from '@/components/Home/Search.vue';
import TagsDataTable from '@/components/Admin/TagsDataTable.vue';
import { useTagsStore } from '@/store/Tags.js';
import TagsAdd from '@/components/Admin/TagsAdd.vue';
import { ref, computed, watch } from 'vue';
defineEmits(['update:selectedData', 'closeDialog']);
const tagsStore = useTagsStore();
tagsStore.fetchTags();
const searchInput = ref('');
const selectedData = ref([]);
const buttonDisabled = computed(() => selectedData.value.length == 0);
const showDialog = ref(false);
function dialogAction(action) {
    showDialog.value = action;
}
watch(searchInput, () => {
    tagsStore.searchtags(searchInput.value);
});
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
