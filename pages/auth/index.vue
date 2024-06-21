<script setup lang="ts">
  import AuthLoginForm from "~/components/auth/AuthLoginForm.vue";
  import { AuthType } from "~/types/auth";

  definePageMeta({
    layout: false,
  });

  const { authService, profileService } = useApiStore();
  const { accessToken, refreshToken } = storeToRefs(useCookieStore());

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await authService.Login({ email, password });
      accessToken.value = res.accessToken;
      refreshToken.value = res.refreshToken;
      const myProfile = await profileService.GetMyProfile();
      console.log(myProfile);
      await navigateTo(`/${myProfile.profile.slug}`);
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
