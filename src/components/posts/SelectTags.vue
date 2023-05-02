<template>
    <v-combobox
        v-model="chips"
        :items="tagsNames"
        :item-value="(item) => item.id"
        item-title="name"
        chips
        clearable
        :label="label"
        multiple
        variant="solo"
        class="tags"
        return-object
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
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
defineProps({
    label: {
        type: String,
        required: true,
    },
});
const chips = ref([]);
const tagsNames = ref([]);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}

function handleChipsChange(newVal, oldVal) {
    if (newVal.length > oldVal.length) {
        const invalidChips = newVal.filter((chip) => !tagsNames.value.includes(chip));
        chips.value = chips.value.filter((chip) => !invalidChips.includes(chip));
    }
}

watch(chips, handleChipsChange);
async function fetchTags() {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
        tagsNames.value = response.data;
    } catch (error) {
        console.log(error);
        await router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
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
