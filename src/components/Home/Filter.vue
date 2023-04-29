<template>
    <div class="d-flex flex-column" style="width: 250px">
        <v-expansion-panels variant="popout" class="my-2">
            <v-expansion-panel>
                <v-expansion-panel-title> 系所 </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-checkbox
                        class="checkBox"
                        label="資訊工程系"
                        :value="apartment[0]"
                        v-model="selectedApartment"
                        @change="$emit('update:select', selectedApartment)"
                    />
                    <v-checkbox
                        class="checkBox"
                        label="機械工程系"
                        :value="apartment[1]"
                        v-model="selectedApartment"
                        @change="$emit('update:select', selectedApartment)"
                    />
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
            @update:modelValue="$emit('update:tag', chips)"
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
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref, watch, onMounted } from 'vue';
const router = useRouter();
const chips = ref([]);
const apartment = ref(['資訊工程系', '機械工程系']);
const selectedApartment = ref([]);
const tags = ref([]);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}

watch(chips, (newVal, oldVal) => {
    if (newVal.length > oldVal.length) {
        const invalidChips = newVal.filter((chip) => !tags.value.includes(chip));
        chips.value = chips.value.filter((chip) => !invalidChips.includes(chip));
    }
});

onMounted(async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
        for (const i of response.data) {
            tags.value.push(i.name);
        }
    } catch (error) {
        console.log(error);
        router.push(import.meta.env.VITE_APP_ERROR_ROUTER);
    }
});
</script>

<style scoped>
.checkBox {
    height: 45px;
    color: black;
}
</style>
