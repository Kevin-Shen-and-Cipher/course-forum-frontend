<template>
    <v-combobox
        v-if="tagsStore.tags"
        v-model="chips"
        :items="tagsStore.tags"
        item-value="id"
        item-title="name"
        chips
        clearable
        :label="label"
        multiple
        variant="solo"
        class="tags"
        :return-object="false"
        @update:modelValue="$emit('update:modelValue', chips)"
    >
        <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
                v-bind="attrs"
                :model-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
            >
                <strong>{{ item.name }}</strong>
                <span>(interest)</span>
            </v-chip>
        </template>
    </v-combobox>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useTagsStore } from '@/store/Tags.js';
const tagsStore = useTagsStore();
tagsStore.fetchTags();
defineProps({
    label: {
        type: String,
        required: true,
    },
});
const chips = ref([]);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}

watch(chips, (newVal, oldVal) => {
    if (newVal.length > oldVal.length) {
        //回傳不存在的tag
        const invalidChips = newVal.filter((chip) => {
            if (tagsStore.tags.find((tag) => tag.id === chip) != null) {
                return false;
            } else {
                return true;
            }
        });
        //把不存在的tag移除
        chips.value = chips.value.filter((chip) => !invalidChips.includes(chip));
    }
});
</script>
<style scoped>
.tags {
    margin-left: 10px;
    margin-bottom: 20px;
    font-size: 20pt;
}
</style>
