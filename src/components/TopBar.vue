<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Arvan challenge</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"
              >User.name <span class="sr-only">(current)</span></a
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
const handleLogOutClick = () => {
  console.log("logged out");
};
</script>

<style lang="scss" scoped></style>
