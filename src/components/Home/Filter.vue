<template>
    <div class="d-flex flex-column" style="width: 100%;min-width: 200px;max-width: 300px">
        <v-combobox
            v-if="apartment"
            v-model="apartmentChips"
            :items="apartment"
            chips
            clearable
            label="科系"
            multiple
            variant="solo"
            class="mx-4 mt-4"
            hide-details
            :return-object="false"
            @update:modelValue="$emit('update:select', apartmentChips)"
        >
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                    v-bind="attrs"
                    :model-value="selected"
                    closable
                    @click="select"
                    @click:close="apremove(item)"
                >
                    <strong>{{ item.name }}</strong>
                    <span>(interest)</span>
                </v-chip>
            </template>
        </v-combobox>
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
            class="mx-4 mt-4"
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
const apartmentChips = ref([]);
const apartment = ref(['資訊工程系', '機械工程系']);

function remove(item) {
    chips.value.splice(chips.value.indexOf(item), 1);
}
function apremove(item) {
    apartmentChips.value.splice(apartmentChips.value.indexOf(item), 1);
}

function removeInvaildApartmentChip(newVal, oldVal) {
    if (newVal.length > oldVal.length) {
        //回傳不存在的tag
        const invalidChips = newVal.filter((chip) => {
            if (apartment.value.find((apartment) => apartment === chip) != null) {
                return false;
            } else {
                return true;
            }
        });
        //把不存在的tag移除
        apartmentChips.value = apartmentChips.value.filter((chip) => !invalidChips.includes(chip));
    }
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
watch(apartmentChips, removeInvaildApartmentChip);
onBeforeMount(async () => tagsStore.fetchTags());
</script>

<style scoped>
.checkBox {
    color: black;
}
</style>
