<script setup lang="ts">
  import ConnectBtn from "~/components/common/ConnectBtn.vue";
  import type { ConnectStatuses } from "~/consts/common";
  defineProps<{
    contact: {
      name: string;
      slug: string;
      profession: string;
      avatar: string;
    };
    status: ConnectStatuses;
  }>();

  const emit = defineEmits<{
    (e: "add-friend", profileId: number): void;
    (e: "cancel-friend", profileId: number): void;
  }>();

  const handleAddFriend = (id: number) => {
    emit("add-friend", id);
  };

  const handleCancelRequest = (id: number) => {
    emit("cancel-friend", id);
  };
</script>

<template>
  <div class="contact">
    <NuxtLink :to="`/${contact.slug}`">
      <v-avatar class="contact-avatar" :image="contact.avatar" />
    </NuxtLink>
    <div class="contact-info">
      <NuxtLink :to="`/${contact.slug}`" class="name">{{ contact.fullName }}</NuxtLink>
      <div class="profession">{{ contact.profession }}</div>
    </div>
    <ConnectBtn
      :status="status"
      @request="() => handleAddFriend(contact.id)"
      @cancel="() => handleCancelRequest(contact.id)"
    />
  </div>
</template>

<style scoped>
  .contact {
    @apply flex gap-[8px] items-center;
    & + .contact {
      @apply mt-[16px];
    }
  }

  .name {
    @apply text-[16px] font-[500];
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

  .profession {
    @apply text-[14px] text-[--color-grey];
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
