import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/LoginView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/views/Home.vue")
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