import { createRouter, createWebHistory } from 'vue-router';

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
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('@/views/ErrorView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
