<script setup lang="ts">
  import { mdiThumbUpOutline, mdiThumbUp } from "@mdi/js";

  defineProps<{
    isLiked: boolean;
  }>();

  const emit = defineEmits<{
    like: [value: boolean];
  }>();

  const handleLikeClick = (isLiked: boolean) => {
    emit("like", isLiked);
  };
</script>

<template>
  <v-btn variant="text" size="40" @click="() => handleLikeClick(!isLiked)">
    <v-badge class="badge" offset-x="-5" offset-y="-5" content="2">
      <v-icon size="25" location="top start" :icon="isLiked ? mdiThumbUp : mdiThumbUpOutline" />
    </v-badge>
  </v-btn>
</template>

<style scoped>
  .badge {
    &:deep(.v-badge__badge) {
      width: 15px;
      height: 15px;
      font-size: 12px;
      min-width: 0;
      text-align: center;
      text-indent: 2px;
    }
  }
</style>
