<template>
  <div>
    <Alert :config="AlertStore.alertConfig" :visibility="AlertStore.visibility"/>
    <TopBar>
      <SideBar>
        <slot />
      </SideBar>
    </TopBar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Alert from '../components/common/Alert.vue'
import SideBar from "../components/SideBar.vue";
import TopBar from "../components/TopBar.vue";
import { useAlertStore } from '../stores/alert';
const AlertStore = useAlertStore()
</script>

<style lang="scss" scoped>
:deep .content-slot > div {
  display: flex;
  gap: 30px;
}
</style>
