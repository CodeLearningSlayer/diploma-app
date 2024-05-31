<script setup lang="ts">
  import type { IComment } from "~/api/specs/posts";

  defineProps<{
    comment: IComment;
  }>();
</script>

<template>
  <div class="comment">
    <NuxtLink :to="`/${comment.profile.slug}`">
      <v-avatar :image="comment.profile.avatar" />
    </NuxtLink>
    <div class="comment-body">
      <NuxtLink :to="`/${comment.profile.slug}`">
        <div class="name">{{ comment.profile.fullName }}</div>
      </NuxtLink>
      <div class="text">{{ comment.text }}</div>
    </div>
  </div>
</template>

<style scoped>
  .comment {
    @apply flex gap-[12px] items-start py-[8px];
  }
  .name {
    @apply font-[500];
  }
  .text {
    @apply text-[14px];
  }
</style>
