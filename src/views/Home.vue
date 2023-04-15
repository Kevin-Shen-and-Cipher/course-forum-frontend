<template>
    <div class="d-flex justify-center overflow-auto" style="width: 100%">
        <div class="d-flex flex-column align-center">
            <Search/>
            <div class="scroll-container" ref="scrollContainer">
                <div class="scroll-content">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>

        </div>
    </div>

</template>
<script>
import Post from "@/components/Home/Post.vue";
import Search from "@/components/Home/Search.vue";

export default {
    components: {
        Post,
        Search
    },
    mounted() {
        this.$nextTick(() => {
            this.hideScrollbar();
        });
    },
    methods: {
        hideScrollbar() {
            // 获取滚动容器 DOM 元素
            const scrollContainer = this.$refs.scrollContainer;

            // 当滚动容器内的内容不超出容器高度时，隐藏滚动条
            if (scrollContainer.scrollHeight <= scrollContainer.clientHeight) {
                scrollContainer.style.overflowY = 'hidden';
            }
        },
    },

}
</script>
<style>
.scroll-container {
    overflow-y: scroll;
}

.scroll-content {
    /* Set width and height to match the content */
    height: calc(75vh);
}

/* 隐藏滚动条的轨道和滑块 */
::-webkit-scrollbar {
    display: none;
}
</style>