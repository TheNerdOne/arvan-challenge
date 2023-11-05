<template>
  <div class="d-flex flex-column align-items-center justify-content-between">
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
          <td>{{ item.author }}</td>
          <td>{{ item.tags }}</td>
          <td>{{ item.excrept }}</td>
          <td>
            <div class="d-flex align-items-center justify-content-start gap-2">
              <div>{{ item.created }}</div>
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
                      @click="deleteArticle(item.id)"
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
    <div class="w-100 d-flex align-items-center justify-content-center">
      <Pagination />
    </div>
  </div>
</template>

<script setup>
    import Pagination from "./Pagination.vue";
    const props = defineProps(["columns", "items"]);
    const editArticle = (articleId) => {
      console.log(articleId);
    };
    const deleteArticle = (articleId) => {
      console.log(articleId);
    };
  </script>

  <style lang="scss" scoped>
    .btn-info {
      background-color: var(--arv-info) !important;
      border: none !important;
    }
  </style>
