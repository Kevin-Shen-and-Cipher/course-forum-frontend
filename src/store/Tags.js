import { defineStore } from 'pinia';
import {useAlertStore} from '@/store/alert.js';
import axios from 'axios';
const alertStore = useAlertStore();
export const useTagsStore = defineStore({
  id: "tags",
  state: () => ({
    tags: null,
    tag: null,
    searchResult: null
  }),
  actions: {
    async fetchTags(){
        try {
            const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags');
            this.tags = response.data.map((data) => {
                data.created_at = data.created_at.substring(0, 10);
                return data;
            });
            this.searchResult = this.tags;
        } catch (error) {
            alertStore.callAlert(error.message, 'error');
        }
    },
    async fetchtag(id){
        try {
            const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/tags/' + id);
            this.tag = response.data;
        } catch (error) {
            alertStore.callAlert(error.message, 'error');
        }
    },
    async addTag(tagName) {
        try {
            await axios.post(import.meta.env.VITE_APP_API_URL + '/tags', {name: tagName});
            alertStore.callAlert("新增成功");
            this.fetchTags();
        } catch (error) {
            alertStore.callAlert(error.message, "error")
        }
    },
    async editTag(editTag) {
        try {
            await axios.patch(
                import.meta.env.VITE_APP_API_URL + '/tags/' + editTag.id,
                editTag
            );
            alertStore.callAlert('編輯完成');
        } catch (error) {
            alertStore.callAlert(error.message, 'error');
        }
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
        try {
            for (const i of selectedData) {
                await axios.delete(import.meta.env.VITE_APP_API_URL + '/tags/' + i);
            }
            this.fetchTags();
            alertStore.callAlert('刪除成功');
            this.selectedData = [];
        } catch (error) {
            alertStore.callAlert(error.message, 'error');
        }
        
    }
  }
})