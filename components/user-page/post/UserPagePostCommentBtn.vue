<script setup lang="ts">
  import { mdiCommentOutline } from "@mdi/js";

  defineEmits(["comment"]);
</script>

<template>
  <v-btn :icon="mdiCommentOutline" size="40" variant="text" @click="$emit('comment')" />
</template>

<style></style>
