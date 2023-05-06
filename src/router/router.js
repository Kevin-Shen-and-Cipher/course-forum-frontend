import { createRouter, createWebHistory } from 'vue-router';
import {useAuthStore} from '@/store/auth.js';
import {useAlertStore} from '@/store/alert.js';
function checkToken(to, from, next){
    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    if (to.name === 'AdminTags' || to.name === 'AdminPosts' || to.name === 'AdminPostsCheck'){
        if (authStore.admin){
            next();
            return;
        }
        alertStore.callAlert("權限不足", 'info');
        router.push('/home');
        return;
    }
    if (authStore.token){
        next();
        return;
    }
    alertStore.callAlert("請先登入", 'info');
    router.push('/home');
    return;
}
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        
    },
    {
        path: '/posts/:id',
        name: 'posts',
        component: () => import('@/views/PostView.vue'),
    },
    {
        path: '/posts/add',
        name: 'AddPosts',
        component: () => import('@/views/AddPostView.vue'),
        beforeEnter: checkToken,
    },
    {
        path: '/admin/tags',
        name: 'AdminTags',
        component: () => import('@/views/AdminTagsView.vue'),
        beforeEnter: checkToken,
    },
    {
        path: '/admin/posts',
        name: 'AdminPosts',
        component: () => import('@/views/AdminPostsView.vue'),
        beforeEnter: checkToken,
    },
    {
        path: '/admin/posts/check/:id',
        name: 'AdminPostsCheck',
        component: () => import('@/views/CheckPosts.vue'),
        beforeEnter: checkToken,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
