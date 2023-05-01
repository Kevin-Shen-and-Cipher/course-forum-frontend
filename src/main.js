import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/main.css';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const vuetify = createVuetify({
    components: {
        VDataTable,
    },
    defaults: {
        VDataTable: {
            fixedHeader: true,
            noDataText: 'Results not found',
        },
    },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
