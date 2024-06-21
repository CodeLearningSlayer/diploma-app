<script setup lang="ts">
  import ConnectionsPageLeftSidebar from "~/components/connections-page/ConnectionsPageLeftSidebar.vue";
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <ConnectionsPageLeftSidebar />
    </template>
    <NuxtPage />
  </NuxtLayout>
</template>

<style></style>
