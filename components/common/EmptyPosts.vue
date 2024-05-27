<script setup lang="ts">
  import { mdiNoteOffOutline } from "@mdi/js";
  defineProps<{
    isMyProfile?: boolean;
  }>();
</script>

<template>
  <div class="no-posts">
    <v-icon :icon="mdiNoteOffOutline" />
    {{ isMyProfile ? "You" : "This user" }} didn't post anything yet
  </div>
</template>

<style scoped>
  .no-posts {
    @apply font-[500] gap-[8px] w-full h-[250px] rounded-[25px] flex justify-center items-center bg-white;
  }
</style>
