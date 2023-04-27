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
        path: '/posts',
        children: [
            {
                path: ':id',
                name: 'posts',
                component: () => import('@/views/PostView.vue'),
            },
            {
                path: 'add',
                name: 'AddPosts',
                component: () => import('@/views/AddPostView.vue'),
            },
        ],
    },
    {
        path: '/admin',
        children: [
            {
                path: 'tags',
                name: 'AdminTags',
                component: () => import('@/views/AdminTagsView.vue'),
            },
            {
                path: 'posts',
                name: 'AdminPosts',
                component: () => import('@/views/AdminPostsView.vue'),
                children: [
                    {
                        path: 'check/:id',
                        name: 'AdminPostsCheck',
                        component: () => import('@/views/CheckPosts.vue'),
                    },
                ],
            },
        ],
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
