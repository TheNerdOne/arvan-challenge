import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import App from '../src/App.vue'
import './style.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosApiWrapper from './service/axiosApiWrapper'
import { cookieFuns } from './service/cookies'
const CookiesFunctions = new cookieFuns()

axiosApiWrapper.init()

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')