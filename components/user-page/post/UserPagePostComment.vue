<script setup lang="ts">
  import type { IComment } from "~/api/specs/posts";

  defineProps<{
    comment: IComment;
    isMyComment: boolean;
  }>();

  defineEmits<{
    "delete-comment": [id: number];
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
    <v-menu v-if="isMyComment" offset="10" location="bottom">
      <template #activator="{ props }">
        <v-btn class="options-btn" variant="text" v-bind="props">
          <span></span>
          <span></span>
          <span></span>
        </v-btn>
      </template>
      <v-list class="options-btn-list">
        <v-list-item class="options-item">
          <v-btn class="delete-btn" @click="$emit('delete-comment', comment.id)"
            >Delete comment</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>
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
  .options-btn {
    @apply px-0 aspect-square w-[32px] h-full min-w-0;
    &:deep(.v-btn__content) {
      @apply flex flex-col gap-[4px];
    }
    span {
      @apply block w-[5px] h-[5px] rounded-[5px] bg-gray-400;
    }
  }
  .comment-body {
    @apply flex-grow-[2];
  }
</style>
