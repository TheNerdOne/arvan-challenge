import { defineStore } from 'pinia'
import articlesDataProvider from '../service/services/articles';
export const useArticlesStore = defineStore('articles', {
    state: () => {
        return {
            articlesData: {
                bio: '',
                email: '',
                image: '',
                token: '',
                username: '',
            }
        }
    },
    actions: {
        async fetchArticlesData() {
            const res = await articlesDataProvider.getAllArticles()
            this.articlesData = res.data
        },
    },
})