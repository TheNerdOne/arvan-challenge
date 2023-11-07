<template>
  <div
    :class="`alert alert-${config?.type} alert-dismissible fade ${visibility ? 'visibility' : ''}`"
    role="alert"
  >
    <strong>{{ config?.strongText }}</strong
    >{{ config?.text }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["config","visibility"]);
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  right: 30px;
  top: 80px;
}
</style>
