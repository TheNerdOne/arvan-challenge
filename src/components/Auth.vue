<template>
  <div class="container d-flex align-items-center justify-content-center">
    <form class="form-container p-5" @submit="handleSubmit($event)">
      <div class="row mb-3">
        <div class="col-12">
          <h1 class="text-center authHeader">
            {{ registerMode ? "Register" : "Login" }}
          </h1>
        </div>
      </div>
      <div class="mb-3 row" v-if="registerMode">
        <CustomInput
          type="text"
          label="User"
          input-name="user"
          v-model:inputValue="username"
        />
      </div>
      <div class="mb-3 row">
        <CustomInput
          type="email"
          label="Email"
          input-name="email"
          @update:model-value="(newValue) => (email.value = newValue)"
        />
      </div>
      <div class="mb-3 row">
        <CustomInput
          type="password"
          label="Password"
          input-name="password"
          @update:model-value="(newValue) => (password.value = newValue)"
        />
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <button class="btn btn-primary btn-block">
            {{ registerMode ? "Register" : "Login" }}
          </button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-start gap-2">
            <span>{{
              registerMode ? "Already Registered?" : "Dont't have account?"
            }}</span>
            <strong role="button" @click="handleRegisterMode">{{
              registerMode ? "Login" : "Register Now"
            }}</strong>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import authDataProvider from "../service/services/auth";
import CustomInput from "./common/CustomInput.vue";

var registerMode = ref(false);
var username = ref("");
var email = ref("");
var password = ref("");
const handleRegisterMode = () => {
  registerMode.value = !registerMode.value;
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const userLoginData = {
    ...(registerMode.value && { username: username.value }),
    email: email.value,
    password: password.value,
  };
  const res = registerMode.value
    ? await authDataProvider.register(userLoginData)
    : await authDataProvider.login(userLoginData);
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .form-container {
    background-color: var(--arv-silver);
    .authHeader {
      color: var(--arv-warm-gray);
    }
  }
}
</style>
