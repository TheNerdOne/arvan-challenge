import { defineStore } from 'pinia'
import articlesDataProvider from '../service/services/articles';
import tagsDataProvider from '../service/services/tags';
export const useArticlesStore = defineStore('articles', {
    state: () => {
        return {
            articlesData: { articles: [], articlesCount: 0 },
            tags:[]
        }
    },
    actions: {
        async fetchTags() {
            await tagsDataProvider.getAllTag().then((res)=>{
                this.tags = res.data.tags
            })
        },
        async fetchArticlesData() {
            await articlesDataProvider.getAllArticles().then((res) => {
                this.articlesData = res.data
            })
        },
        async deleteArticle(article) {
            await articlesDataProvider.deleteArticle(article.slug).then((res) => {
                let tempArticles = { ...this.articlesData }
                const index = tempArticles.articles.indexOf(article);
                if (index > -1) {
                    tempArticles.articles.splice(index, 1);
                }
                this.articlesData.articlesCount--
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
        },
        async editArticle(payload) {
            await articlesDataProvider.editArticle(payload).then((res) => {
                console.log(res.data)
            }).catch((e) => console.log(e))
        }
    },
})