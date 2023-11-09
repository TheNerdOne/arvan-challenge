<template>
  <List
    v-if="pageData.articles"
    :columns="['Title', 'Author', 'Tags', 'Excrept', 'Created']"
    :items="pageData.articles"
    @onPageChange="fetchArticles"
  />
  <Loading v-else />
</template>

<script setup>
import { ref, onMounted } from "vue";
import List from "./List.vue";
import { useArticlesStore } from "../stores/articles";
import Loading from "./common/Loading.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const pageData = ref({});
const articlesStore = useArticlesStore();
onMounted(async () => {
  const {offset} = route.query
  !articlesStore.articlesData.articles.length && await articlesStore.fetchArticlesData({offset:offset || 1,limit:10});
  pageData.value = articlesStore.articlesData
});
const fetchArticles = async (payload) => {
  router.replace({query:{offset:payload.offset}})
  await articlesStore.fetchArticlesData(payload)
  pageData.value = articlesStore.articlesData
}
</script>

<style lang="scss" scoped></style>
