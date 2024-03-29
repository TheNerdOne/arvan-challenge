<template>
  <form class="form-container p-5">
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
          v-model:inputValue="title"
          placeholder="title"
          :valid="!v$.title.$errors.length"
          :err-text="v$.title.$errors"
          @blur="v$.title.$touch"
          :disabled="editMode"
          />
          <CustomInput
          type="text"
          label="Description"
          input-name="description"
          v-model:inputValue="description"
          placeholder="description"
          :valid="!v$.description.$errors.length"
          :err-text="v$.description.$errors"
          @blur="v$.description.$touch"
          :disabled="editMode"
        />

        <label for="body" class="col-12 col-form-label">Body</label>
        <div class="col-12">
          <textarea
            v-model="body"
            type="body"
            required
            :class="`form-control ${v$.body.$errors.length ? 'is-invalid' : ''}`"
            id="body"
            @blur="v$.body.$touch"
          />
          <template v-if="v$.body.$errors.length">
            <div v-for="err in v$.body.$errors" id="bodyFeedback" class="invalid-feedback d-block">
              {{ err.$message }}
            </div>
          </template>
        </div>
        <div class="col">
          <button class="btn btn-primary my-3" type="button" @click="handleSubmit({title,description,body,tagList})">Submit</button>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <form @submit.prevent="handleCustomTag()">
          <CustomInput
            placeholder="New tag"
            input-name="tags"
            label="Tags"
            v-model:inputValue="customTag"
            :valid="true"
          />
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
              :checked="tagList.includes(tag)"
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
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const route = useRoute();
const router = useRouter();
const articlesStore = useArticlesStore();
const alertStore = useAlertStore();
const articleValue = ref(null)
const title = ref("")
const description = ref("")
const body = ref("")
const tagList = ref([])
const customTag = ref("");
const tagCheckBox = ref(null)
const editMode = computed(() => {
  return route.name === "editArticle";
});
const rules = computed(() => ({
  title: {
    required:helpers.withMessage('Required field!', required),
  },
  description: {
    required:helpers.withMessage('Required field!', required),
  },
  body: {
    required:helpers.withMessage('Required field!', required),
  },
}));
const v$ = useVuelidate(rules,{title,description,body} );
onMounted(async () => {
  !articlesStore.tags.length && await articlesStore.fetchTags();
  editMode.value &&
    (articleValue.value = (
      await articlesDataProvider.getArticle(route.params.slug)
    ).data.article);
    title.value = articleValue.value.title
    description.value = articleValue.value.description
    body.value = articleValue.value.body
    tagList.value = articleValue.value.tagList
});
const handleCustomTag = () => {
  if(customTag.value.length){
    tagList.value.push(customTag.value)
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
        : Object.entries(error.response.data.errors)[0].join(":")
    }`,
    strongText: `${error === undefined ? "New Article" : ""}`,
  });
  error === undefined && router.push({ name: "articles" });
};
const handleSubmit = async (payload) => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  const res = editMode.value !== true ? await articlesStore.createArticle({article:{title:title.value,description:description.value,body:body.value,tagList:tagList.value}}) : await articlesStore.editArticle({...articleValue.value,...payload});;
  formResponseHanlder(res);
};
function tagListHandler(tag, e) {
  if (e.target.checked) {
    tagList.value.push(tag);
  } else {
    tagList.value = tagList.value.filter((t) => t !== tag);
  }
}
</script>