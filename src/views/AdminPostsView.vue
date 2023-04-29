<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <Search v-model="searchInput" />
                <div class="d-flex justify-space-between">
                    <v-btn style="margin-right: 20px" color="green" :disabled="buttonDisabled"
                        >勾選審核</v-btn
                    >
                    <v-btn color="red" :disabled="buttonDisabled" >勾選拒絕</v-btn>
                </div>
            </div>
            <div class="d-flex scroll-container">
                <PostsDataTable v-model="selectedData" :searchInput="searchInput"  />
            </div>
        </div>
    </div>
</template>
<script setup>
import Search from '@/components/Home/Search.vue';
import PostsDataTable from '@/components/Admin/PostsDataTable.vue';
import { ref, watch } from 'vue';

const searchInput = ref('');
const selectedData = ref([]);
const buttonDisabled = ref(true);

watch(selectedData, () => {
    buttonDisabled.value = selectedData.value.length === 0;
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
