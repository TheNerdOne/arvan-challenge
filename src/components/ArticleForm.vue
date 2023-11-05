<template>
  <form class="form-container p-5" @submit="handleSubmit($event)">
    <div class="row mb-3">
      <div class="col-12">
        <h1 class="text-center authHeader">
          {{ editMode ? "Edit" : "New" }} Article
        </h1>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-9 col-md-6 col-sm-6 col-xs-12">
        <label for="user" class="col-12 col-form-label">Title</label>
        <div class="col-12">
          <input
            type="text"
            required
            class="form-control"
            id="title"
            v-model="title"
          />
        </div>
        <label for="description" class="col-12 col-form-label"
          >Description</label
        >
        <div class="col-12">
          <input
            type="description"
            class="form-control"
            id="description"
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
          <div class="d-flex align-items-center justify-content-start gap-2">
              <input type="checkbox" required id="title" v-model="title" />
              <div>tag</div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const editMode = computed(() => {
  return route.params.slug;
});
const title = ref("");
const description = ref("");
const body = ref("");
const handleSubmit = (payload) => {
  console.log(payload);
};
</script>

<style lang="scss" scoped></style>
