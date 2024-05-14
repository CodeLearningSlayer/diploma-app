<script setup lang="ts">
  defineProps<{
    pin: string;
  }>();

  defineEmits<{
    (e: "open-pin"): void;
  }>();
</script>

<template>
  <div class="content-pin" @click="$emit('open-pin')">
    <img class="content-pin-preview" :src="pin" alt="image-thumb" />
  </div>
</template>

<style scoped>
  .content-pin {
    @apply relative shadow;
  }
  .content-pin-preview {
    @apply aspect-video object-cover h-full;
  }
</style>
