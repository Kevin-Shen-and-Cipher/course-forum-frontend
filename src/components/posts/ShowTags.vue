<template>
  <div class="d-flex">
    <a 
        v-for="i in tagsData" 
        v-if="tagsData"
    >
    #{{ i.names }}</a>
  </div>
</template>
<script setup>
const props = defineProps({
  tagsData: {
    type: Object,
    required: true,
  },
});
</script>
