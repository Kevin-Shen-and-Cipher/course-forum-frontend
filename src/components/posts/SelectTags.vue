<template>
    <v-combobox
        v-model="chips"
        :items="tags"
        chips
        clearable
        :label="label"
        multiple
        variant="solo"
        class="tags"
    >
        <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
                v-bind="attrs"
                :model-value="selected"
                closable
                @click="select"
                @click:close="remove(item)"
            >
                <strong>{{ item }}</strong>
                <span>(interest)</span>
            </v-chip>
        </template>
    </v-combobox>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

const router = new useRouter();
const props = defineProps({
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
        for (const i of response.data) {
            tags.value.push(i.name);
        }
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
