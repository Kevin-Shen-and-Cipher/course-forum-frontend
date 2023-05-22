import { defineStore } from 'pinia';
import { useAlertStore } from '@/store/Alert.js';
import { get, create, getById, updateById, deleteById } from '@/API/Tags.js';
const alertStore = useAlertStore();
export const useTagsStore = defineStore({
    id: 'tags',
    state: () => ({
        tags: null,
        tag: null,
        searchResult: null,
    }),
    actions: {
        async fetchTags() {
            this.tags = await get();
            this.tags.map((data) => {
                data.created_at = data.created_at.substring(0, 10);
                return data;
            });
            this.searchResult = this.tags;
        },
        async fetchTag(id) {
            try {
                const response = await getById(id);
                this.tag = response.data;
            } catch (error) {
                alertStore.callAlert(error.message, 'error');
            }
        },
        async addTag(tagName) {
            try {
                if (await create(tagName)) {
                    alertStore.callAlert('新增成功');
                    this.fetchTags();
                }
            } catch (error) {
                alertStore.callAlert(error.message, 'error');
            }
        },
        async editTag(editTag) {
            try {
                if (await updateById(editTag.id, editTag)) {
                    alertStore.callAlert('編輯完成');
                }
            } catch (error) {
                alertStore.callAlert(error.message, 'error');
            }
            this.fetchTags();
        },
        searchtags(searchString = '') {
            this.searchResult = this.tags.filter((tag) => {
                if (searchString && !tag.name.includes(searchString)) {
                    return false;
                }
                return true;
            });
        },
        async deleteTags(selectedData) {
            for (const i of selectedData) {
                if (!(await deleteById(i))) {
                    return false;
                }
            }
            this.fetchTags();
            alertStore.callAlert('刪除成功', 'success');
            return true;
        },
    },
});
