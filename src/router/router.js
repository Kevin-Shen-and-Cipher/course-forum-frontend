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
        path: '/admin/tags',
        name: 'AdminTags',
        component: () => import('@/views/AdminTagsView.vue'),
    },
    {
        path: '/admin/posts',
        name: 'AdminPosts',
        component: () => import('@/views/AdminPostsView.vue'),
    },
    {
        path: '/admin/posts/check/:id',
        name: 'AdminPostsCheck',
        component: () => import('@/views/CheckPosts.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
