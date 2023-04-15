<template>
    <div class="d-flex justify-center align-center" style="width: 400px;height: 90px; padding-top: 30px">
        <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="搜尋"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
        ></v-text-field>
    </div>
</template>
<script>
export default {
    data: () => ({
        loaded: false,
        loading: false,
    }),
    methods: {
        onClick() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },
    },
}
</script>
<style>
.search {
    width: 400px;
}
</style>