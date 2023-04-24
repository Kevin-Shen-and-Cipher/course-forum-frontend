<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <Search />
                <div class="d-flex justify-space-between">
                    <v-btn>勾選刪除</v-btn>
                </div>
            </div>
            <TagsDataTable />
        </div>
    </div>
</template>
<script setup>
import Search from '@/components/Home/Search.vue';
import TagsDataTable from '@/components/Admin/TagsDataTable.vue';
</script>
