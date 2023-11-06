<template>
  <List
    v-if="pageData.articles"
    :columns="['Title', 'Author', 'Tags', 'Excrept', 'Created']"
    :items="pageData.articles"
  />
  <Loading v-else />
</template>

<script setup>
import { ref, onMounted } from "vue";
import List from "./List.vue";
import { useArticlesStore } from "../stores/articles";
import Loading from "./common/Loading.vue";
const pageData = ref({});
const articlesStore = useArticlesStore();
onMounted(async () => {
  !articlesStore.articlesData.articles && await articlesStore.fetchArticlesData();
  pageData.value = articlesStore.articlesData
});
</script>

<style lang="scss" scoped></style>
