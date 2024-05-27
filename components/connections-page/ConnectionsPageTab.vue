<script setup lang="ts">
  defineProps<{
    to: string;
    name: string;
  }>();
</script>

<template>
  <NuxtLink class="connections-tab" active-class="connections-active" :to="to">{{ name }}</NuxtLink>
</template>

<style scoped>
  .connections-tab {
    @apply p-[10px];
  }
  .connections-active {
    @apply bg-[--color-accent-blue];
  }
</style>
