<script setup lang="ts">
  import { mdiMagnify } from "@mdi/js";
</script>

<template>
  <v-responsive max-width="280" class="rounded-[20px]">
    <v-text-field label="Search for anything (Jobs)" :rounded="'40px'" variant="solo-filled">
      <template #append-inner>
        <button class="h-full bg-[--color-accent-blue] w-[60px]">
          <v-icon :icon="mdiMagnify" size="large" :style="{ color: '#00000099' }" />
        </button>
      </template>
    </v-text-field>
  </v-responsive>
</template>

<style scoped>
  .v-input {
    &:deep(.v-input__details) {
      display: none;
    }
    &:deep(.v-field--appended) {
      padding-inline-end: 0;
    }
    &::deep(.v-field__input) {
      display: none;
    }
    &:deep(.v-field-label) {
      font-size: 14px;
    }
    &:deep(.v-field__input) {
      font-size: 14px;
    }
  }
</style>
