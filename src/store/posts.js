import { defineStore } from 'pinia';
import {useAlertStore} from '@/store/Alert.js';
import {useAuthStore} from '@/store/Auth.js';
import axios from 'axios';
export const usePostsStore = defineStore({
  id: "posts",
  state: () => ({
    posts: null,
    post: null,
    searchResult: null
  }),
  actions: {
    async fetchPosts(){
        try {
            const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/posts');
            this.posts = response.data.map((data) => {
                data.created_at = data.created_at.substring(0, 10);
                data.verify = data.state ? '已審核' : '未審核';
                return data;
            });
            this.searchResult = this.posts;
        } catch (error) {
            useAlertStore().callAlert(error.message, 'error');
        }
    },
    async fetchPost(id){
        try {
            const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/posts/' + id);
            this.post = response.data;
        } catch (error) {
            useAlertStore().callAlert(error.message, 'error');
        }
    },
    async addPost(post) {
        try {
            await axios.post(import.meta.env.VITE_APP_API_URL + '/posts', post,{
                headers: {
                  Authorization: 'Bearer ' +  useAuthStore().token
                }
               });
            useAlertStore().callAlert("新增成功");
            return true;
        } catch (error) {
            useAlertStore().callAlert(error.message, "error")
            return false;
        }
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
    async verifySelectedPass(selectedData) {
        try {
            for (const i of selectedData) {
                await axios.patch(import.meta.env.VITE_APP_API_URL + '/posts/' + i, {
                    state: true,
                },
                {
                headers: {
                    Authorization: 'Bearer ' +  useAuthStore().token
                }
                });
            }
            this.fetchPosts();
            useAlertStore().callAlert('全部審核通過');
        } catch (error) {
            useAlertStore().callAlert(error.message, 'error');
        }
    },
    async deletePosts(selectedData) {
        try {
            for (const i of selectedData) {
                await axios.delete(import.meta.env.VITE_APP_API_URL + '/posts/' + i,{
                    headers: {
                      Authorization: 'Bearer ' +  useAuthStore().token
                    }
                   });
            }
            this.fetchPosts();
            useAlertStore().callAlert('全部刪除成功');
        } catch (error) {
            useAlertStore().callAlert(error.message, 'error');
        }
        
    }

  }
})