import Auth from './components/Auth.vue'
import Articles from './components/Articles.vue'
import ArticleForm from './components/ArticleForm.vue'
import Layout from './layout/index.vue'

const routes = [
    { path: '/auth', component: Auth },
    { path: '/articles', name:"articles", meta: { layout: Layout }, component: Articles },
    { path: '/articles/create', name:"createArticle", meta: { layout: Layout }, component: ArticleForm },
    { path: '/articles/edit/:slug', name:"editArticle", meta: { layout: Layout }, component: ArticleForm },
]

export default routes