import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/views/HomeView.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/LoginView.vue")
    },
    {
        path: '/posts/:id',
        name: 'posts',
        component: (id) => import("@/views/PostView.vue")
    },
    {
        path: "/error",
        name: "error",
        component: () => import("@/views/ErrorView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;