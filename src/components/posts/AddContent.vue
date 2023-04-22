<template>
    <div class="d-flex flex-column justify-center align-center" style="width: 100%;height: 100%">
        <div class="content d-flex flex-column justify-end" style="height: 20%">
            <div class="d-flex" style="width: 500px">
                <v-combobox
                        v-model="chips"
                        :items="tags"
                        chips
                        clearable
                        label="設定標籤"
                        multiple
                        variant="solo"
                        style="margin-left: 10px;margin-bottom: 20px;font-size: 20pt"
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
            <div class="d-flex">
                <label class="d-flex align-self-end justify-start"
                       style="padding-left: 10px;width: 60%; font-size: 14pt">資訊工程系 &nbsp;&nbsp;&nbsp; {{ showDate }}</label>
                <div class="d-flex align-center">
                    <label style="font-size: 14pt">設定課程評分：</label>
                    <v-rating
                            v-model="rating"
                    ></v-rating>
                </div>
            </div>
            <v-divider :thickness="4"
                       class="border-opacity-100"
                       color="grey"
                       style="margin: 5px 0px"
            />
        </div>
        <div class="content d-flex" style="height: 80%;">
            <div class="d-flex flex-column" style="width: 73%">
                <input placeholder="請輸入標題" style="font-size: 32pt;margin: 10px 0px;">
                <v-textarea auto-grow class="my-custom-textarea" label="(請在此地方寫下你最好的文章)"></v-textarea>
            </div>
            <div class="d-flex flex-column" style="width: 27%;padding-left: 20px">
                <label class="d-flex align-center" style="font-size: 16pt;height: 50px;padding-top: 20px"><v-icon>mdi-shield-alert-outline</v-icon>  文章規範</label>
                <div class="d-flex" style="width: 100%;padding-top: 10px">
                    <v-textarea class="my-custom-textarea" no-resize disabled readonly></v-textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {ref, reactive, watch, onMounted} from "vue";
import axios from "axios";

const router = useRouter();
const rating = ref(0);
const date = new Date();
const showDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

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
    const response = await axios.get(import.meta.env.VITE_APP_API_URL + "/tags");
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
.content {
    width: 60%;
}

input:hover,
input:focus,
input:active {
    outline: none;
    border-bottom: 1px solid purple;
}

.my-custom-textarea >>> .v-textarea__slot {
    font-size: 40px;
}
</style>