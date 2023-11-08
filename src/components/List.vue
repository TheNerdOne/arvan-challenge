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
              <span v-for="tag in item.tagList" :key="tag">{{
                `${tag} `
              }}</span>
            </td>
            <td>{{ item.body.split(" ").slice(0, 19).join(" ") }}</td>
            <td>
              <div
                class="d-flex align-items-center justify-content-start gap-2"
              >
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
                        @click="editArticle(item.slug)"
                      >
                        Edit
                      </div>
                      <a href="#staticBackdrop" role="button" 
                        class="dropdown-item"
                        data-toggle="modal"
                        @click="onDelete(item)"
                      >
                        Delete
                    </a>
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
    <Modal
      title="Delete Article"
      body="Are you sure to delete Article?"
      text-submit="Yes"
      text-close="No"
      submit-type="danger"
      close-type="light"
      @onSubmit="articlesStore.deleteArticle(selectedArticle)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from './common/Modal.vue'
import { useArticlesStore } from "../stores/articles";
import Pagination from "./Pagination.vue";
import { useRouter } from "vue-router";
const props = defineProps(["columns", "items"]);
const confirmDeleteModal = ref(false);
const selectedArticle = ref(null);
const articlesStore = useArticlesStore();
const router = useRouter()
const dateFormatter = (dateString) => {
  let date = new Date(dateString);
  let options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-EN", options);
};
const editArticle = (articleSlug) => {
  router.push({name:"editArticle",params:{slug:articleSlug}})
};
const onDelete = (article) => {
  selectedArticle.value = article;
  confirmDeleteModal.value = true;
};
</script>

<style lang="scss" scoped>
.btn-info {
  background-color: var(--arv-info) !important;
  border: none !important;
}
</style>
