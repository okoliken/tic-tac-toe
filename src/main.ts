import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "nprogress/nprogress.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import * as NProgress from "nprogress";

NProgress.configure({ easing: "ease", speed: 800 });

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
