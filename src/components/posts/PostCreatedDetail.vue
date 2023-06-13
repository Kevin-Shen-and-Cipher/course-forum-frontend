<template>
    <label class="d-none d-lg-flex justify-start" style="padding-left: 10px;"
        >{{ department }} &nbsp;&nbsp;&nbsp;{{ showDate }}</label
    >
    <label class="d-flex d-lg-none justify-start">
        {{ department }}<br>{{  showDate  }}
    </label>
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
