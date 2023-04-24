import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';
import '@/assets/main.css';

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
app.mount('#app');
