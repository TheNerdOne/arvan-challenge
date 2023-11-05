<template>
  <div>
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style="width: 280px"
    >
      <div
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <h2 class="fs-4">Posts</h2>
      </div>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="#" class="nav-link active" aria-current="page">
            All Articles
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            New Article
          </a>
        </li>
      </ul>
    </div>
    <div class="w-100">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
