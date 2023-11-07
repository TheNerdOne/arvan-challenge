import { defineStore } from 'pinia'
import articlesDataProvider from '../service/services/articles';
export const useArticlesStore = defineStore('articles', {
    state: () => {
        return {
            articlesData: { articles: [], articlesCount: 0 }
        }
    },
    actions: {
        async fetchArticlesData() {
            await articlesDataProvider.getAllArticles().then((res) => {
                this.articlesData = res.data
            })
        },
        async deleteArticle(slug) {
            await articlesDataProvider.deleteArticle(slug).then((res) => {
                let tempArticles = { ...this.articlesData }
                tempArticles.articles = tempArticles.articles.filter((item) => { item.slug !== slug })
                tempArticles.articlesCount--
                this.articlesData = tempArticles
            }).catch((e) => { console.log(e) });

        },
        async createArticle(payload) {
            await articlesDataProvider.createArticle(payload).then((res) => {
                let tempArticles = { ...this.articlesData }
                tempArticles.articles.splice(0, 0, res.data.article)
                tempArticles.articlesCount++
                this.articlesData = tempArticles
            }).catch((e) => {
                console.log(e)
            })
        }
    },
})