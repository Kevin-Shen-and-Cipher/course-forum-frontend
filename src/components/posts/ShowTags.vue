<template>
  <div class="d-flex">
    <a v-if="tagsData" v-for="i in tagsData">#{{ i.names }}</a>
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
