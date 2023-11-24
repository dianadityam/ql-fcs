import { createApp } from 'vue'
import './style.css';
import { globalcomponent } from "./plugin/global-component"
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
globalcomponent(app);
app.use(router)
app.use(pinia)
app.mount('#app')