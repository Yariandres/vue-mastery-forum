import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const forumApp = createApp(App);

forumApp.use(pinia);
forumApp.use(router);
forumApp.mount('#app');
