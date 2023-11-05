<template>
  <List
    :columns="['Title', 'Author', 'Tags', 'Excrept', 'Created']"
    :items="[
      {
        id: 0,
        title: 'title',
        author: 'poria',
        tags: 'tag1',
        excrept: 'idk',
        created: '20/02/2023',
      },
    ]"
  />
</template>

<script setup>
import List from "./List.vue";
</script>

<style lang="scss" scoped></style>
