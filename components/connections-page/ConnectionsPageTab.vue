<script setup lang="ts">
  defineProps<{
    to: string;
    name: string;
  }>();
</script>

<template>
  <NuxtLink class="connections-tab" exact-active-class="connections-active" :to="to">{{
    name
  }}</NuxtLink>
</template>

<style scoped>
  .connections-tab {
    @apply px-[10px] py-[12px] font-[600] w-[200px] text-center bg-[white] uppercase text-[14px];
    &:first-child {
      @apply rounded-tl-md;
    }
    &:last-child {
      @apply rounded-tr-md;
    }
  }
  .connections-active {
    @apply bg-[--color-accent-blue] text-[white];
  }
</style>
