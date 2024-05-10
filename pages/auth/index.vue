<script setup lang="ts">
  import AuthLoginForm from "~/components/auth/AuthLoginForm.vue";
  import { AuthType } from "~/types/auth";

  const { authService } = useApiStore();
  const { accessToken } = storeToRefs(useCookieStore());
  const { refreshToken } = storeToRefs(useLocalStore());

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await authService.Login({ email, password });
      accessToken.value = res.accessToken;
      refreshToken.value = res.refreshToken;
      await navigateTo("/home");
    } catch (e) {
      console.log(e);
    }
  };
</script>

<template>
  <NuxtLayout name="auth">
    <AuthLoginForm :variant="AuthType.Login" :callback="handleLogin" />
  </NuxtLayout>
</template>

<style></style>
