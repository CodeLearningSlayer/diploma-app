<script setup lang="ts">
  defineProps<{
    image: string;
    isOnline: boolean;
    size: number;
  }>();
</script>

<template>
  <v-badge v-if="isOnline">
    <v-avatar :image="image" :size="size" />
  </v-badge>
  <v-avatar v-else :image="image" :size="size" />
</template>

<style></style>
