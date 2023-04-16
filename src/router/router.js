import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;