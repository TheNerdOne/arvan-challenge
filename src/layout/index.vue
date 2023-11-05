<template>
  <div>
    <TopBar>
      <SideBar>
        <slot />
      </SideBar>
    </TopBar>
  </div>
</template>

<script setup>
import SideBar from "../components/SideBar.vue";
import TopBar from "../components/TopBar.vue";
</script>

<style lang="scss" scoped>
::v-deep .content-slot > div {
  display: flex;
}
</style>
