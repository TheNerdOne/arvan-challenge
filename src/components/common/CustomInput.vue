<template>
  <label :for="inputName" class="col-12 col-form-label">{{ label }}</label>
  <div class="col-12">
    <input
      :type="type"
      class="form-control"
      :id="inputName"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps(["type", "inputName", "label", "inputValue"]);
</script>

<style lang="scss" scoped></style>
