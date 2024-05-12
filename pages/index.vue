<script setup lang="ts">
  const { isAuth } = useAuthStore();
  if (isAuth) {
    await navigateTo("/home");
  }
</script>

<template>
  <div></div>
</template>

<style></style>
