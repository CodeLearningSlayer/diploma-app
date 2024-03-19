<script setup lang="ts">
  import UserPageCard from "~/components/user-page/UserPageCard.vue";

  const user = await useAsyncData();
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <UserPageCard />
    </template>
    header-inner
    <template #sidebar-right>hi2</template>
  </NuxtLayout>
</template>

<style></style>
