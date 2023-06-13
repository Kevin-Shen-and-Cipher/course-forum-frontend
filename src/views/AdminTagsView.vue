<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="11" md="10" class="d-flex justify-center flex-column">
                <v-row style="padding: 12px 0px 0px 0px">
                    <v-col>
                        <JumpButton />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" class="d-flex align-center" style="padding-left: 10px">
                        <Search v-model="searchInput" />
                        <TagsAdd v-model="showDialog" @dialogAction="dialogAction" />
                    </v-col>
                    <v-col cols="12" md="4" offset-md="4" class="d-flex align-center justify-end">
                        <v-btn style="margin: 0px 20px" @click="dialogAction(true)"
                            >新增標籤</v-btn
                        >
                        <v-btn
                            color="red"
                            :disabled="buttonDisabled"
                            @click="tagsStore.deleteTags(selectedData)"
                            >勾選刪除</v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="d-flex scroll-container" v-if="tagsStore.searchResult">
                        <TagsDataTable
                            v-model:selectedData="selectedData"
                            :searchInput="searchInput"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import JumpButton from '@/components/Admin/JumpButton.vue';
import Search from '@/components/Home/Search.vue';
import TagsDataTable from '@/components/Admin/TagsDataTable.vue';
import { useTagsStore } from '@/store/Tags.js';
import TagsAdd from '@/components/Admin/TagsAdd.vue';
import { ref, computed, watch, onBeforeMount } from 'vue';
defineEmits(['update:selectedData', 'closeDialog']);
const tagsStore = useTagsStore();

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
onBeforeMount(async () => {
    tagsStore.fetchTags();
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
