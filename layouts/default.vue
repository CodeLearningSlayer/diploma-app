<script setup lang="ts">
  import MainHeader from "~/components/common/MainHeader.vue";
  import { useAuthStore } from "~/stores/auth";

  const { isAuth } = storeToRefs(useAuthStore());
</script>

<template>
  <div class="app-wrapper">
    <MainHeader :is-auth="isAuth" />
    <div class="main-wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .app-wrapper {
    @apply flex flex-col h-full;
  }
  .main-wrapper {
    @apply flex-[4];
  }
</style>
