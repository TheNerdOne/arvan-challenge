import { defineStore } from 'pinia'
import articlesDataProvider from '../service/services/articles';
import tagsDataProvider from '../service/services/tags';
export const useArticlesStore = defineStore('articles', {
    state: () => {
        return {
            articlesData: { articles: [], articlesCount: 0 },
            tags: []
        }
    },
    actions: {
        async fetchTags() {
            await tagsDataProvider.getAllTag().then((res) => {
                this.tags = res.data.tags
            })
        },
        updateTagList(payload) {
            this.tags.push(payload)
        },
        async fetchArticlesData({offset=0,limit=10}) {
            const payload = {offset:offset - 1,limit}
            await articlesDataProvider.getAllArticles(payload).then((res) => {
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
            try {
                const res = await articlesDataProvider.createArticle(payload)
                let tempArticles = { ...this.articlesData }
                tempArticles.articles.splice(0, 0, res.data.article)
                tempArticles.articlesCount++
                this.articlesData = tempArticles
            } catch (error) {
                return error
            }
        },
        async editArticle(article) {
            try {
                const res = await articlesDataProvider.editArticle(article)
                let tempArticles = { ...this.articlesData }
                const finded = tempArticles.articles.find((item) => item.slug === article.slug);
                const index = tempArticles.articles.indexOf(finded)
                if (index > -1) {
                    tempArticles.articles[index] = res.data.article
                    this.articlesData = tempArticles
                }
            } catch (error) {
                return error
            }
        }
    },
})