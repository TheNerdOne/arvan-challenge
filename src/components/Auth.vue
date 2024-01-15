<template>
  <div class="container d-flex align-items-center justify-content-center">
    <Alert :config="alertStore.alertConfig" :visibility="alertStore.visibility"/>
    <form class="form-container p-5" @submit.prevent="handleSubmit()">
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
          label="user"
          input-name="user"
          v-model:inputValue="username"
          :valid="!v$.username.$errors.length"
          :err-text="v$.username.$errors"
          @blur="v$.username.$touch"
        />
      </div>
      <div class="mb-3 row">
        <CustomInput
          type="text"
          label="Email"
          input-name="email"
          v-model:inputValue="email"
          :valid="!v$.email.$errors.length"
          :err-text="v$.email.$errors"
          @blur="v$.email.$touch"
        />
      </div>
      <div class="mb-3 row">
        <CustomInput
          type="password"
          label="Password"
          input-name="password"
          v-model:inputValue="password"
          :valid="!v$.password.$errors.length"
          :err-text="v$.password.$errors"
          @blur="v$.password.$touch"
        />
      </div>
      <div class="row mb-3">
        <div class="col-12">
          <Button :loading="loading" class-size="block" class-type="primary">
            {{ registerMode ? "Register" : "Login" }}
          </Button>
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
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import CustomInput from "./common/CustomInput.vue";
import Button from './common/Button.vue'
import { cookieFuns } from "../service/cookies";
import { useUsersStore } from "../stores/users";
import { useRouter } from "vue-router";
import { useAlertStore } from "../stores/alert";
import Alert from '../components/common/Alert.vue';

const userStore = useUsersStore();
const router = useRouter();
const registerMode = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
let loading = ref(false);
//use for button loading and disable mode
const cookiesFunctions = new cookieFuns();
const alertStore = useAlertStore()

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Required field!", required),
  },
  password: {
    required: helpers.withMessage("Required field!", required),
  },
  ...(registerMode.value && {username: {
    required: helpers.withMessage("Required field!", required),
  }})
  
}));
const v$ = useVuelidate(
  rules,
  registerMode.value ? { email, password, username } : { email, password }
);
const handleRegisterMode = () => {
  registerMode.value = !registerMode.value;
};
const handleSubmit = async () => {
  loading.value = true
  const result = await v$.value.$validate();
  if (!result) {
    loading.value = false
    return;
  }
  const userLoginData = {
    ...(registerMode.value && { username: username.value }),
    email: email.value,
    password: password.value,
  };
  const res = await userStore.setUser(userLoginData, registerMode.value);
  await alertStore.showAlert({
    type: `${res === undefined ? "success" : "danger"}`,
    text: `${
      res === undefined
        ? "Logged in successfully!"
        : Object.entries(res.response.data.errors)[0].join(":")
    }`,
    strongText: `${res === undefined ? "New Article" : ""}`,
  });
  cookiesFunctions.setCookie({
    cname: "token",
    cvalue: userStore.user.token,
    exdays: 1,
  });
  loading.value = false
  router.push({ name: "articles" });
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
