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
  <div class="auth-wrapper">
    <AuthLoginForm :variant="AuthType.Login" :callback="handleLogin" />
  </div>
</template>

<style>
  .auth-wrapper {
    height: 100%;
    background-image: url("../../assets/image/auth-bg.svg");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
