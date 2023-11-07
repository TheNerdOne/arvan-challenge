<template>
  <div class="d-flex flex-column align-items-center justify-content-between">
    <h1 class="text-left d-flex align-self-baseline py-5">All Posts</h1>
    <div class="table-responsive table-responsive-sm table-responsive-md">
      <table class="table">
        <thead>
          <tr class="table-active">
            <th scope="col">#</th>
            <th scope="col" v-for="column in props.columns" :key="column">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in props.items" :key="item.id">
            <th scope="row">{{ idx + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.author.username }}</td>
            <td>
              <span v-for="tag in item.tagList" :key="tag">{{ `${tag} ` }}</span>
            </td>
            <td>{{ item.body.split(" ").slice(0, 19).join(" ") }}</td>
            <td>
              <div class="d-flex align-items-center justify-content-start gap-2">
                <div>{{ dateFormatter(item.createdAt) }}</div>
                <div>
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div class="dropdown-menu">
                      <div
                        class="dropdown-item"
                        role="button"
                        @click="editArticle(item.id)"
                      >
                        Edit
                      </div>
                      <div
                        class="dropdown-item"
                        role="button"
                        @click="deleteArticle(item.slug)"
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-100 d-flex align-items-center justify-content-center">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
import articlesDataProvider from "../service/services/articles";
import { useArticlesStore } from "../stores/articles";
import Pagination from "./Pagination.vue";
const props = defineProps(["columns", "items"]);
const articlesStore = useArticlesStore();
const dateFormatter = (dateString) => {
  let date = new Date(dateString);
  let options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-EN", options);
};
const editArticle = (articleId) => {
  console.log(articleId);
};
const deleteArticle = async (slug) => {
  const res = await articlesDataProvider.deleteArticle(slug);
  Promise.resolve(res)
    .then(() => {
      articlesStore.deleteArticle();
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>

<style lang="scss" scoped>
.btn-info {
  background-color: var(--arv-info) !important;
  border: none !important;
}
</style>
