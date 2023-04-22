<template>
    <v-expansion-panels variant="popout" class="my-2">
        <v-expansion-panel style="width: 100%">
            <v-expansion-panel-title>
                系所
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-checkbox label="資訊工程系" style="height: 45px;color: black"/>
                <v-checkbox label="機械工程系" style="height: 45px;color: black"/>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-combobox
            v-model="chips"
            :items="tags"
            chips
            clearable
            label="標籤"
            multiple
            variant="solo"
            style="margin: 15px"
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
import {useRouter} from "vue-router";
import axios from 'axios';
import {ref, watch, onMounted} from "vue";

const router = useRouter();
const chips = ref([]);
const tags = ref(["hi"]);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}

watch(chips, (newVal, oldVal) => {
    if (newVal.length > oldVal.length) {
        const invalidChips = newVal.filter((chip) => !tags.value.includes(chip));
        chips.value = chips.value.filter((chip) => !invalidChips.includes(chip));
    }
})

onMounted(async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + "/tags")
        for (const i of response.data) {
            tags.value.push(i.name);
        }
    } catch (error) {
        console.log(error);
        router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
})
</script>

<style scoped>

</style>