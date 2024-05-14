<script setup lang="ts">
  const { isAuth, profileSlug } = useAuthStore();
  if (isAuth) {
    await navigateTo(`/${profileSlug}`);
  }
</script>

<template>
  <div></div>
</template>

<style></style>
