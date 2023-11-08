<template>
  <form class="form-container p-5" @submit.prevent="handleSubmit(article)">
    <div class="row mb-3">
      <div class="col-12">
        <h1 class="text-left authHeader">
          {{ editMode ? "Edit" : "New" }} Article
        </h1>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-9 col-md-6 col-sm-6 col-xs-12">
        <CustomInput
          type="text"
          label="Title"
          input-name="title"
          v-model:inputValue="article.title"
        />
        <CustomInput
          type="text"
          label="Description"
          input-name="description"
          v-model:inputValue="article.description"
        />

        <label for="body" class="col-12 col-form-label">Body</label>
        <div class="col-12">
          <textarea
            v-model="article.body"
            type="body"
            required
            class="form-control"
            id="body"
          />
        </div>
        <div class="col">
          <button class="btn btn-primary my-3" type="submit">Submit</button>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <label for="user" class="col-12 col-form-label">Tags</label>
        <div class="col-12">
          <div
            v-for="(tag, idx) in articlesStore.tags"
            class="d-flex align-items-center justify-content-start gap-2"
          >
            <input
              type="checkbox"
              :id="`tag${idx}`"
              @input="tagListHandler(tag, $event)"
            />
            <div>{{ tag }}</div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticlesStore } from "../stores/articles";
import articlesDataProvider from "../service/services/articles";
import CustomInput from "./common/CustomInput.vue";
import { useAlertStore } from "../stores/alert";
const route = useRoute();
const router = useRouter();
const articlesStore = useArticlesStore();
const alertStore = useAlertStore();
const article = ref({title:"",description:"",body:"",tagList:[]});
const editMode = computed(() => {
  return route.name === "editArticle";
});
onMounted(async () => {
  await articlesStore.fetchTags();
  editMode.value &&
    (article.value = (
      await articlesDataProvider.getArticle(route.params.slug)
    ).data.article);
});
const handleSubmit = async (payload) => {
  editMode.value !== true
    ? await articlesStore.createArticle({ article: article.value }).then(()=>{
      alertStore.showAlert({ type: "success", text: "created succesfully", strongText: "New Article" })
    })
    : await articlesStore.editArticle(payload).then(()=>{
      alertStore.showAlert({ type: "success", text: "updated succesfully", strongText: "Article" })
    })
  router.push({ name: "articles" });
};
function tagListHandler(tag, e) {
  if (e.target.checked) {
    article.value.tagList.push(tag);
  } else {
    article.value.tagList = article.value.tagList.filter((t) => t !== tag);
  }
}
</script>

<style lang="scss" scoped></style>
