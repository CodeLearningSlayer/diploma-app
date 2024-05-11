<script setup lang="ts">
  import AuthStartForm from "~/components/auth/AuthStartForm.vue";

  definePageMeta({
    layout: false,
  });

  const handleAuthStartFormSubmit = () => {};
</script>

<template>
  <NuxtLayout name="auth">
    <AuthStartForm :submit="handleAuthStartFormSubmit" />
  </NuxtLayout>
</template>

<style></style>
