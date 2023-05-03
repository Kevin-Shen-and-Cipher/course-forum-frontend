import { createRouter, createWebHistory } from 'vue-router';
import {useAuthStore} from "@/store/auth";
const alertStore = useAuthStore();
const ifAuthenticated = (to, from, next) => {
    if (alertStore.token !== null) {
      next();
      return;
    }
    router.push({ 
      name: 'login'
    });
   };
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
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/admin/tags',
        name: 'AdminTags',
        component: () => import('@/views/AdminTagsView.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/admin/posts',
        name: 'AdminPosts',
        component: () => import('@/views/AdminPostsView.vue'),
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/admin/posts/check/:id',
        name: 'AdminPostsCheck',
        component: () => import('@/views/CheckPosts.vue'),
        beforeEnter: ifAuthenticated,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
