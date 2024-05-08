<script setup lang="ts">
  import { useField, useForm } from "vee-validate";
  import GoogleIcon from "../icons/GoogleIcon.vue";
  import HeaderLogo from "~/components/icons/HeaderLogo.vue";
  import type { AuthType } from "~/types/auth";

  useForm({
    validationSchema: {
      email(value: string) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

        return "Must be a valid e-mail.";
      },
      password(value: string) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) return true;

        return "Password must contain at least one number and letter, minimum 8 characters.";
      },
    },
  });

  const email = useField<string>("email");
  const password = useField<string>("password");

  defineProps<{
    variant: AuthType;
    callback: (email: string, password: string) => void;
  }>();
</script>

<template>
  <v-card class="card-wrapper" elevation="0" rounded="xl">
    <form class="auth-form" @submit.prevent="callback(email.value.value, password.value.value)">
      <div class="auth-form__inner">
        <HeaderLogo class="mb-[16px] mx-auto" />
        <div class="text-center font-[600] mb-[16px]">Linking Professionals. Linking Futures</div>
        <div class="auth-form-fields">
          <v-text-field
            v-model="email.value.value"
            class="text-field"
            :error-messages="email.errorMessage.value"
            variant="outlined"
            density="comfortable"
            label="Email"
          />
          <v-text-field
            v-model="password.value.value"
            class="text-field"
            variant="outlined"
            :error-messages="password.errorMessage.value"
            label="Password"
            density="comfortable"
            hint="Min. 8 symbols with numbers"
            type="password"
          />
          <v-btn v-if="variant === 'login'" elevation="1" class="auth-btn" type="submit">
            Sign in
          </v-btn>
          <v-btn
            v-else
            class="auth-btn"
            color="var(--color-accent-blue)"
            elevation="1"
            type="submit"
          >
            Sign up
          </v-btn>
        </div>
        <div class="flex items-center gap-[8px] my-[16px]">
          <v-divider class="border-opacity-100" :thickness="1" /> or
          <v-divider class="border-opacity-100" :thickness="1" />
        </div>
        <v-btn class="google-auth-btn" :prepend-icon="GoogleIcon" :block="true" elevation="1"
          >Sign in with Google</v-btn
        >
      </div>
    </form>
  </v-card>
</template>

<style scoped>
  .v-btn--size-default {
    --v-btn-height: 45px;
  }
  .card-wrapper {
    @apply max-w-[518px] w-full mx-auto py-[32px] px-[24px];
  }
  .auth-form-fields {
    @apply flex flex-col gap-[4px];
  }
  .auth-btn {
    @apply text-[var(--color-white)] font-[600] text-[14px];
  }
  .text-field {
    &:deep(.v-messages) {
      margin-bottom: 6px;
    }
  }
  .google-auth-btn {
    @apply text-[14px];
  }
</style>
