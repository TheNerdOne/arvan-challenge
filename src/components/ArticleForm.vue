<template>
  <form class="form-container p-5" @submit.prevent="handleSubmit()">
    <div class="row mb-3">
      <div class="col-12">
        <h1 class="text-left authHeader">
          {{ editMode ? "Edit" : "New" }} Article
        </h1>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-9 col-md-6 col-sm-6 col-xs-12">
        <label for="user" class="col-12 col-form-label">Title</label>
        <div class="col-12 mb-3">
          <input
            type="text"
            required
            class="form-control"
            id="title"
            placeholder="Title"
            v-model="title"
          />
        </div>
        <label for="description" class="col-12 col-form-label"
          >Description</label
        >
        <div class="col-12 mb-3">
          <input
            type="description"
            class="form-control"
            id="description"
            placeholder="Description"
            v-model="description"
          />
        </div>
        <label for="body" class="col-12 col-form-label">Body</label>
        <div class="col-12">
          <textarea
            v-model="body"
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
          <div v-for="(tag,idx) in tags" class="d-flex align-items-center justify-content-start gap-2">
              <input type="checkbox" :id="`tag${idx}`" @input="tagListHandler(tag,$event)"/>
              <div>{{tag}}</div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticlesStore } from "../stores/articles";
const route = useRoute();
const router = useRouter()
const articlesStore = useArticlesStore()
const editMode = computed(() => {
  return route.params.slug;
});
const title = ref("");
const description = ref("");
const body = ref("");
const tagList = ref([])
const tags = ref(["1","2","3"])
const handleSubmit = async () => {
  const payload = {title:title.value,description:description.value,body:body.value,tagList:tagList.value}
  editMode ? await articlesStore.createArticle({article:payload}) : await editArticle({article:payload})
  router.push({name:'articles'})
};
function tagListHandler(tag,e){
  if(e.target.checked) {
    tagList.value.push(tag)
  } else {
    tagList.value = tagList.value.filter((t)=>t!==tag)
  }
}
</script>

<style lang="scss" scoped></style>
