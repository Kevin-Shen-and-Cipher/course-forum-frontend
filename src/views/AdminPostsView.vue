<template>
    <div class="d-flex justify-center" style="width: 100%">
        <div class="d-flex flex-column" style="width: 80%; padding-top: 60px">
            <div class="d-flex justify-space-between align-center" style="padding-left: 10px">
                <Search />
                <div class="d-flex justify-space-between">
                    <v-btn style="margin-right: 20px">勾選審核</v-btn>
                    <v-btn>勾選拒絕</v-btn>
                </div>
            </div>
            <PostsDataTable />
        </div>
    </div>
</template>
<script setup>
import Search from '@/components/Home/Search.vue';
import PostsDataTable from '@/components/Admin/PostsDataTable.vue';
</script>
