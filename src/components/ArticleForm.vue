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
          placeholder="title"
        />
        <CustomInput
          type="text"
          label="Description"
          input-name="description"
          v-model:inputValue="article.description"
          placeholder="description"
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
        <form @submit.prevent="handleCustomTag()">
          <CustomInput placeholder="New tag" input-name="tags" label="Tags" v-model:inputValue="customTag"/>
        </form>
        <div class="col-12">
          <div
          v-for="(tag, idx) in articlesStore.tags"
          class="d-flex align-items-center justify-content-start gap-2"
          >
            <input
              type="checkbox"
              :id="`tag${idx}`"
              @input="tagListHandler(tag, $event)"
              ref="tagCheckBox"
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
const customTag = ref("");
const tagCheckBox = ref(null)
const editMode = computed(() => {
  return route.name === "editArticle";
});
onMounted(async () => {
  !articlesStore.tags.length && await articlesStore.fetchTags();
  editMode.value &&
    (article.value = (
      await articlesDataProvider.getArticle(route.params.slug)
    ).data.article);
});
const handleCustomTag = () => {
  if(customTag.value.length){
    article.value.tagList.push(customTag.value)
    articlesStore.updateTagList(customTag.value)
    setTimeout(() => {
      tagCheckBox.value[tagCheckBox.value.length-1].checked = true
    }, 0);
  }
  customTag.value = ""
}
const formResponseHanlder = async (error) => {
  await alertStore.showAlert({
    type: `${error === undefined ? "success" : "danger"}`,
    text: `${
      error === undefined
        ? "created succesfully"
        : Object.entries(error.response.data.errors)
    }`,
    strongText: `${error === undefined ? "New Article" : ""}`,
  });
  error === undefined && router.push({ name: "articles" });
};
const handleSubmit = async (payload) => {
  const res = editMode.value !== true ? await articlesStore.createArticle({article:article.value}) : await articlesStore.editArticle(payload);;
  formResponseHanlder(res);
};
function tagListHandler(tag, e) {
  if (e.target.checked) {
    article.value.tagList.push(tag);
  } else {
    article.value.tagList = article.value.tagList.filter((t) => t !== tag);
  }
}
</script>