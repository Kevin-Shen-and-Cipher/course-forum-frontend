import { defineStore } from 'pinia';
import { get, getById, deleteById, updateById } from '@/API/Posts.js';
import { useAlertStore } from '@/store/Alert.js';
export const usePostsStore = defineStore({
    id: 'posts',
    state: () => ({
        posts: null,
        post: null,
        searchResult: null,
    }),
    actions: {
        async fetchPosts() {
            this.posts = await get();
            this.posts.map((post) => {
                post.created_at = post.created_at.substring(0, 10);
                post.verify = post.state ? '通過' : '未審核';
            });
            this.searchResult = this.posts;
        },
        async fetchPost(id) {
            this.post = await getById(id);
        },
        async verifySelectedPass(selectedData) {
            const alertStore = useAlertStore();
            for (const i of selectedData) {
                if (!(await updateById(i, { state: true }))) {
                    return false;
                }
            }
            this.fetchPosts();
            alertStore.callAlert('審核通過');
            return true;
        },
        async deletePosts(selectedData) {
            const alertStore = useAlertStore();
            for (const i of selectedData) {
                if (!(await deleteById(i))) {
                    this.fetchPosts();
                    return false;
                }
            }
            alertStore.callAlert('刪除成功');
            this.fetchPosts();
            return true;
        },
        searchPosts(searchString = '', selectData = [], tagData = []) {
            this.searchResult = this.posts.filter((post) => {
                if (searchString && !post.title.includes(searchString)) {
                    return false;
                }
                if (selectData.length && !selectData.includes(post.create_by)) {
                    return false;
                }
                if (tagData.length && !post.tags.some((tag) => tagData.includes(tag.name))) {
                    return false;
                }
                return true;
            });
        },
    },
});
