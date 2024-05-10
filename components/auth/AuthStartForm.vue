<script setup lang="ts">
  import { useField, useForm } from "vee-validate";
  import { professionList } from "~/consts/auth";
  import PictureInput from "~/components/common/PictureInput.vue";

  useForm({
    validationSchema: {
      name(value: string) {
        if (value.length >= 3) return true;

        return "Name length must be more than 3 characters";
      },
      surname(value: string) {
        if (value.length >= 3) return true;

        return "Surname length must be more than 3 characters";
      },
    },
  });

  const name = useField<string>("name");
  const surname = useField<string>("surname");
  const profession = ref();
</script>

<template>
  <v-card class="auth-start-wrapper" elevation="0" rounded="xl">
    <div class="font-[600] text-center text-[20px] mb-[16px]">Let's get acquainted</div>
    <form class="auth-start-form" @submit.prevent>
      <div class="auth-form__inner">
        <PictureInput />
        <div class="auth-form-fields">
          <v-text-field
            v-model="name.value.value"
            class="text-field"
            :error-messages="name.errorMessage.value"
            variant="outlined"
            density="comfortable"
            label="Name"
          />
          <v-text-field
            v-model="surname.value.value"
            class="text-field"
            variant="outlined"
            :error-messages="surname.errorMessage.value"
            label="Surname"
            density="comfortable"
            hint="Min. 8 symbols with numbers"
            type="password"
          />
          <v-select v-model="profession" label="Profession" :items="professionList" />
        </div>
        <v-btn
          block
          color="var(--color-accent-blue)"
          elevation="1"
          class="auth-form-btn"
          type="submit"
        >
          Submit
        </v-btn>
      </div>
    </form>
  </v-card>
</template>

<style>
  .v-card.auth-start-wrapper {
    @apply p-[15px] max-w-[518px] w-full;
  }
  .auth-form-fields {
    @apply mt-[16px];
  }
  .v-btn.auth-form-btn {
    @apply mx-auto font-[600] text-[var(--color-white)];
  }
</style>
