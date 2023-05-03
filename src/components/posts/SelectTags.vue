<template>
    <v-combobox
        v-model="chips"
        :items="tags"
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
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import {useAlertStore} from '@/store/Alert.js'
const alertStore = useAlertStore();
defineProps({
    label: {
        type: String,
        required: true,
    },
});
const chips = ref([]);
const tags = ref([]);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}

function handleChipsChange(newVal, oldVal) {
    if (newVal.length > oldVal.length) {
        const invalidChips = newVal.filter((chip) => !tags.value.includes(chip));
        chips.value = chips.value.filter((chip) => !invalidChips.includes(chip));
    }
}

watch(chips, handleChipsChange);
async function fetchTags() {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
        tags.value = response.data;
    } catch (error) {
        alertStore.callAlert(error.message, 'error')
    }
}

onMounted(fetchTags);
</script>
<style scoped>
.tags {
    margin-left: 10px;
    margin-bottom: 20px;
    font-size: 20pt;
}
</style>
