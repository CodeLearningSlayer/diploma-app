<script setup lang="ts">
  import { AuthType } from "~/types/auth";

  definePageMeta({
    layout: false,
  });

  const { authService } = useApiStore();
  const { accessToken, refreshToken } = storeToRefs(useCookieStore());

  const handleRegistration = async (email: string, password: string) => {
    try {
      const res = await authService.Register({ email, password });
      accessToken.value = res.accessToken;
      refreshToken.value = res.refreshToken;
      await navigateTo("/auth/start");
    } catch (e) {
      console.log(e);
    }
  };
</script>

<template>
  <NuxtLayout name="auth">
    <AuthLoginForm :variant="AuthType.Registration" :callback="handleRegistration" />
  </NuxtLayout>
</template>

<style></style>
