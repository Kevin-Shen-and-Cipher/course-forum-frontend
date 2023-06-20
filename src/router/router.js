import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: { requiredAdmin: false, requiredAuth: false },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: { requiredAdmin: false, requiredAuth: false },
    },
    {
        path: '/posts/:id',
        name: 'posts',
        component: () => import('@/views/PostView.vue'),
        meta: { requiredAdmin: false, requiredAuth: false },
    },
    {
        path: '/posts/add',
        name: 'AddPosts',
        component: () => import('@/views/AddPostView.vue'),
        meta: { requiredAdmin: false, requiredAuth: true },
    },
    {
        path: '/admin/tags',
        name: 'AdminTags',
        component: () => import('@/views/AdminTagsView.vue'),
        meta: { requiredAdmin: true, requiredAuth: true },
    },
    {
        path: '/admin/posts',
        name: 'AdminPosts',
        component: () => import('@/views/AdminPostsView.vue'),
        meta: { requiredAdmin: true, requiredAuth: true },
    },
    {
        path: '/admin/posts/check/:id',
        name: 'AdminPostsCheck',
        component: () => import('@/views/CheckPosts.vue'),
        meta: { requiredAdmin: true, requiredAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    if (to.meta.requiredAuth) {
        const authStore = useAuthStore();
        const alertStore = useAlertStore();
        if (authStore.verify()) {
            alertStore.callAlert('請先登入', 'info');
            router.push('/home');
            return;
        }
        if (to.meta.requiredAdmin) {
            if (!authStore.admin) {
                alertStore.callAlert('權限不足', 'info');
                router.push('/home');
                return;
            }
        }
    }
});

export default router;
