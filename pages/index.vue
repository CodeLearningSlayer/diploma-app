<script setup lang="ts">
  const { isAuth, profileSlug } = useAuthStore();
  if (isAuth) {
    await navigateTo(`/${profileSlug}`);
  } else {
    await navigateTo("/auth");
  }
</script>

<template>
  <div></div>
</template>

<style></style>
