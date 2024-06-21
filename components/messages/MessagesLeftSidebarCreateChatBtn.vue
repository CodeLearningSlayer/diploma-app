<script setup lang="ts">
  defineEmits(["open-contact-modal"]);
</script>

<template>
  <v-card class="start-chat-wrapper">
    <v-btn
      color="var(--color-accent-blue)"
      block
      class="btn btn--primary"
      @click="$emit('open-contact-modal')"
      >Start new chat</v-btn
    >
  </v-card>
</template>

<style scoped>
  .start-chat-wrapper {
    @apply p-[20px];
  }
</style>
