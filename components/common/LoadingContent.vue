<script setup lang="ts">
  defineProps<{
    loading: boolean;
  }>();
</script>

<template>
  <div>
    <v-progress-circular v-if="loading" indeterminate />
    <slot v-else></slot>
  </div>
</template>

<style></style>
