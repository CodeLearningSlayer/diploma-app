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
  <div class="auth-wrapper">
    <AuthLoginForm :variant="AuthType.Registration" :callback="handleRegistration" />
  </div>
</template>

<style></style>
