<script setup lang="ts">
  import { AuthType } from "~/types/auth";

  const { authService } = useApiStore();
  const { accessToken } = storeToRefs(useCookieStore());
  const { refreshToken } = storeToRefs(useLocalStore());

  const handleRegistration = async (email: string, password: string) => {
    try {
      const res = await authService.Register({ email, password });
      accessToken.value = res.accessToken;
      refreshToken.value = res.refreshToken;
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
