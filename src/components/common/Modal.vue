<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ body }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="`btn btn-${closeType}`"
            data-dismiss="modal"
          >
            {{ textClose }}
          </button>
          <button
            @click="$emit('onSubmit')"
            type="button"
            :class="`btn btn-${submitType}`"
            data-dismiss="modal"
          >
            {{ textSubmit }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "title",
  "body",
  "textSubmit",
  "textClose",
  "submitType",
  "closeType",
]);
</script>

<style lang="scss" scoped></style>
