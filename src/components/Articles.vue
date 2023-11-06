<template>
  <List
    v-if="articlesData.articles"
    :columns="['Title', 'Author', 'Tags', 'Excrept', 'Created']"
    :items="articlesData.articles"
  />
  <Loading v-else />
</template>

<script setup>
import { ref, onMounted } from "vue";
import articlesDataProvider from "../service/services/articles";
import List from "./List.vue";
import Loading from "./common/Loading.vue";

const articlesData = ref({});
const fetchArticles = async () => {
  const res = await articlesDataProvider.getAllArticles();
  articlesData.value = res.data;
};

onMounted(()=>{
  fetchArticles();
})
</script>

<style lang="scss" scoped></style>
