<template>
    <label class="d-flex justify-start" style="padding-left: 10px;"
        >{{ department }} &nbsp;&nbsp;&nbsp;{{ showDate }}</label
    >
</template>

<script setup>
import { onMounted } from 'vue';
import { useDisplay } from 'vuetify';
const  {mdAndUp}  = useDisplay();
const props = defineProps({
    department: {
        type: String,
        required: true,
    },
    showDate: {
        type: String,
        required: true,
    },
});
onMounted(()=>{
    console.log(mdAndUp);
});
</script>
