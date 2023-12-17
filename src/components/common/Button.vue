<template>
  <button :class="`btn btn-${classType} btn-${classSize} ${loading ? 'disabled' : ''}`">
    <template v-if="loading">
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden" role="status"> Loading... </span>
    </template>
    <slot v-else />
  </button>
</template>

<script setup>
const props = defineProps(["loading","classType","classSize"]);
</script>

<style lang="scss" scoped></style>
