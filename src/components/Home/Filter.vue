<template>
    <div class="d-flex flex-column" style="width: 100%;min-width: 200px;max-width: 300px">
        <v-expansion-panels variant="popout"  class="my-2">
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
            v-if="tagsStore.tags"
            v-model="chips"
            :items="tagsStore.tags"
            item-value="name"
            item-title="name"
            chips
            clearable
            label="標籤"
            multiple
            variant="solo"
            style="margin: 15px 15px 0px 15px"
            hide-details
            :return-object="false"
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
                    <strong>{{ item.name }}</strong>
                    <span>(interest)</span>
                </v-chip>
            </template>
        </v-combobox>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useTagsStore } from '@/store/Tags';
const tagsStore = useTagsStore();

const chips = ref([]);
const apartment = ref(['資訊工程系', '機械工程系']);
const selectedApartment = ref([]);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}

function removeInvaildChip(newVal, oldVal) {
    if (newVal.length > oldVal.length) {
        //回傳不存在的tag
        const invalidChips = newVal.filter((chip) => {
            if (tagsStore.tags.find((tag) => tag.name === chip) != null) {
                return false;
            } else {
                return true;
            }
        });
        //把不存在的tag移除
        chips.value = chips.value.filter((chip) => !invalidChips.includes(chip));
    }
}

watch(chips, removeInvaildChip);
onBeforeMount(async () => tagsStore.fetchTags());
</script>

<style scoped>
.checkBox {
    color: black;
}
</style>
