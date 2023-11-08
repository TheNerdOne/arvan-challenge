import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import App from '../src/App.vue'
import './style.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosApiWrapper from './service/axiosApiWrapper'
import { useUsersStore } from './stores/users'
import JWT from './service/JWT'

axiosApiWrapper.init()

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

router.beforeEach((to, from, next) => {
    const userStore = useUsersStore();
    const isAuthenticated = JWT.getToken()
    if (!userStore.user.token && isAuthenticated) userStore.getUser()
    if (to.name !== 'auth' && !isAuthenticated) next({ name: 'auth' })
    else if (to.name === 'auth' && isAuthenticated) next({ name: 'articles' })
    else next()
})

app.mount('#app')