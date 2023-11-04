import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import App from '../src/App.vue'
import './style.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosApiWrapper from './service/axiosApiWrapper'

axiosApiWrapper.init()

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(App)
app.use(router)

app.mount('#app')