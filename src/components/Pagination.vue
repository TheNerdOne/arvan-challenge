<template>
  <nav>
    <ul
      class="pagination justify-content-center"
      :class="`pagination-${activeColor}`"
    >
      <li class="page-item action-button" @click.prevent="onFirstPageClicked">
        <a class="page-link" href="#">«</a>
      </li>
      <li class="page-item action-button" @click.prevent="onPrevPageClicked">
        <a class="page-link" href="#">‹</a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === activePage }"
        v-for="page of prevPagesArray"
        @click.prevent="onPaginationClicked(page)"
        :key="page"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li class="page-item active">
        <a class="page-link">{{ activePage }}</a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === activePage }"
        v-for="page of nextPagesArray"
        @click.prevent="onPaginationClicked(page)"
        :key="page"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li class="page-item action-button" @click.prevent="onNextPageClicked">
        <a class="page-link" href="#">›</a>
      </li>
      <li class="page-item action-button" @click.prevent="onLastPageClicked">
        <a class="page-link" href="#">»</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
const emit = defineEmits(['onPageClicked'])
const props = defineProps([
  "totalItemsCount",
  "activeColor",
  "itemsPerPage",
  "pageNumber",
]);
const pagesCount = ref(0);
const activePage = ref(1);
const itemsToShow = ref(11);
onMounted(() => {
  calculatePageCount();
  activePage.value = props.pageNumber || 1
});
const prevPagesArray = computed(() => {
  let arr = [];
  let pagesLength = (itemsToShow.value - 1) / 2;
  if (activePage.value <= pagesLength) {
    for (let i = 1; i < activePage.value; i++) {
      arr.push(i);
    }
  } else {
    for (let i = activePage.value - pagesLength; i < activePage.value; i++) {
      arr.push(i);
    }
  }

  return arr;
});
const nextPagesArray = computed(() => {
  let arr = [];
  let pagesLength = (itemsToShow.value - 1) / 2;
  if (activePage.value + pagesLength > pagesCount.value) {
    for (let i = activePage.value + 1; i < pagesCount.value + pagesLength; i++) {
      if (i <= pagesCount.value) {
        arr.push(i);
      }
    }
  } else {
    for (let i = activePage.value + 1; i < pagesLength + activePage.value; i++) {
      arr.push(i);
    }
  }

  return arr;
});
watch(props.totalItemsCount, () => {
  calculatePageCount();
  onPaginationClicked(pageNumber);
});
watch(props.itemsPerPage, () => {
  calculatePageCount();
});
function calculatePageCount() {
  pagesCount.value = Math.ceil(props.totalItemsCount / props.itemsPerPage);
}
function onPaginationClicked(page) {
  emit('onPageClicked', page);
  activePage.value = page;
}
function onNextPageClicked() {
  let nextPage = activePage.value + 1;

  if (nextPage <= pagesCount.value) {
    onPaginationClicked(nextPage);
  }
}
function onPrevPageClicked() {
  let prevPage = activePage.value - 1;

  if (prevPage >= 1) {
    onPaginationClicked(prevPage);
  }
}
function onLastPageClicked() {
  let lastPage = pagesCount.value;
  onPaginationClicked(lastPage);
}
function onFirstPageClicked() {
  let firstPage = 1;
  onPaginationClicked(firstPage);
}
</script>

<style lang="scss" scoped>
.action-button {
  a {
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    min-width: 34px;
    justify-content: center;
    align-items: center;
    font-size: 20px !important;
    padding-bottom: 1px;
  }
}
</style>
