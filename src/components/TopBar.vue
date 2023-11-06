<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Arvan challenge</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >{{ userStore.user.username }}
              <span class="sr-only">(current)</span></a
            >
          </li>
        </ul>
        <div class="d-inline my-2 my-lg-0">
          <button
            class="btn btn-outline-info my-2 my-sm-0"
            @click="handleLogOutClick"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="content-slot">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
import JWT from "../service/JWT";

const router = useRouter();
const userStore = useUsersStore();
const token = JWT.getToken();
const handleLogOutClick = async () => {
  JWT.deleteToken(token);
  await userStore.logOut();
  router.push({ name: "auth" });
};
</script>

<style lang="scss" scoped></style>
