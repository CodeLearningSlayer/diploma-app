<script setup lang="ts">
  import AuthLoginForm from "~/components/auth/AuthLoginForm.vue";
  import { AuthType } from "~/types/auth";

  const authFormType = ref<AuthType>(AuthType.Registration);

  const handleRegistration = (email: string, password: string) => {
    console.log(email, password);
  };

  const handleLogin = (email: string, password: string) => {
    console.log(email, password);
  };

  const handleFormCallback = computed(() => {
    if (authFormType.value === AuthType.Login) {
      return handleLogin;
    } else {
      return handleRegistration;
    }
  });
</script>

<template>
  <div class="auth-wrapper">
    <AuthLoginForm :variant="authFormType" :callback="handleFormCallback" />
  </div>
</template>

<style scoped>
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
