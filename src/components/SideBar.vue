<template>
  <div>
    <div
      class="d-lg-flex flex-column flex-shrink-0 p-3 bg-light sideBar d-none d-lg-block"
    >
      <div
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <h2 class="fs-4">Posts</h2>
      </div>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto row">
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'articles' }"
            :class="`nav-link ${articlesRoute ? 'active' : ''}`"
            aria-current="page"
          >
            All Articles
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            :to="{ name: 'createArticle' }"
            :class="`nav-link link-dark ${!articlesRoute ? 'active' : ''}`"
          >
            New Article
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="w-100">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const articlesRoute = computed(() => {
  return route.name === "articles";
});
</script>

<style lang="scss" scoped>
.sideBar {
  background-color: var(--arv-water-blue) !important;
  width: 280px;
  height: 100vh;
  color: #fff;
  .nav-link {
    color: #fff !important;
    .active {
      background-color: rgba(65, 154, 249, 0.2);
    }
  }
}
</style>
