<script setup lang="ts">
  defineProps<{
    group: {
      avatar: string;
      slug: string;
      name: string;
    };
  }>();
</script>

<template>
  <div class="group">
    <NuxtLink :to="`/${group.slug}`">
      <v-avatar :image="group.avatar" />
    </NuxtLink>
    <div class="group-info">
      <NuxtLink :to="`/${group.slug}`" class="name">{{ group.name }}</NuxtLink>
    </div>
    <v-btn class="connect-btn" color="var(--color-accent-blue)">Join</v-btn>
  </div>
</template>

<style scoped>
  .group {
    @apply flex gap-[8px] items-center;
    & + .group {
      @apply mt-[16px];
    }
  }

  .name {
    @apply block text-[16px] leading-[130%] font-[500] break-words;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    box-orient: vertical;
    word-break: break-word;
  }

  .connect-btn {
    @apply px-[12px];
    &:deep(.v-btn__content) {
      @apply text-[12px] text-[white] font-[600];
    }
  }

  .contact-info {
    @apply grow-[2];
  }
</style>
