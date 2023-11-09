<template>
  <label :for="inputName" class="col-12 col-form-label">{{ label }}</label>
  <div class="col-12">
    <input
      :type="type"
      :class="`form-control ${!valid ? 'is-invalid' : ''}`"
      :id="inputName"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
      @blur="$emit('blur')"
      :placeholder="placeholder"
      :required="required"
    />
    <div
      v-if="!valid"
      :id="`${inputName}Feedback`"
      class="invalid-feedback d-block"
    >
      <template v-for="err in errText">
        {{ err.$message }}
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "type",
  "inputName",
  "label",
  "inputValue",
  "placeholder",
  "required",
  "valid",
  "errText",
]);
</script>

<style lang="scss" scoped></style>
