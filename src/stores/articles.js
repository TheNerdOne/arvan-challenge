import { defineStore } from 'pinia'
import articlesDataProvider from '../service/services/articles';
export const useArticlesStore = defineStore('articles', {
    state: () => {
        return {
            articlesData: { articles: [], articlesCount : 0}
        }
    },
    actions: {
        async fetchArticlesData() {
            const res = await articlesDataProvider.getAllArticles()
            this.articlesData = res.data
        },
        deleteArticle(){
            let tempArticles = {...this.articlesData}
            tempArticles.articles = tempArticles.articles.filter((item)=>{item.slug!==slug})
            tempArticles.articlesCount--
            this.articlesData = tempArticles
        }
    },
})