<template>
    <v-alert class="alert" type="success" :text="text" v-if="visiable"></v-alert>
</template>

<script setup>
import { watch, ref } from 'vue';
const emits = defineEmits(['update:modelValue']);
const props = defineProps({ alertShow: Boolean, text: String });

const visiable = ref(false);

watch(
    () => props.alertShow,
    () => {
        alertTimeOut(props.text);
    },
);

function alertTimeOut() {
    visiable.value = true;
    setTimeout(() => {
        visiable.value = false;
        emits('update:modelValue', visiable.value)
    }, 1000);
}
</script>

<style scoped>
.alert {
    z-index: 1;
    position: absolute;
    width: 300px;
    right: 40px;
    transition: 1s;
}
</style>
