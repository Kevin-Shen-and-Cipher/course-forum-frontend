import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'


const vuetify = createVuetify();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.mount('#app');