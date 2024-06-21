<script setup lang="ts">
  import type { IUser } from "~/api/specs/user";

  defineProps<{
    contact: IUser;
  }>();

  const emit = defineEmits<{
    "delete-contact": [profileId: number];
    "cancel-delete": [profileId: number];
  }>();

  const isDeleteState = ref(false);

  const handleDelete = (id: number) => {
    emit("delete-contact", id);
    isDeleteState.value = true;
  };

  const handleCancelDeletion = (id: number) => {
    emit("cancel-delete", id);
    isDeleteState.value = false;
  };
</script>

<template>
  <v-card elevation="0" rounded="lg" class="my-contact">
    <div v-if="isDeleteState" class="delete-overlay">
      <v-btn
        variant="text"
        class="delete-overlay-cancel"
        @click="() => handleCancelDeletion(contact.id)"
        >Cancel</v-btn
      >
    </div>
    <NuxtLink :to="`/${contact.slug}`">
      <v-avatar :image="contact.avatar" size="50" />
    </NuxtLink>
    <div class="my-contact-info">
      <NuxtLink :to="`/${contact.slug}`" class="my-contact-name">{{ contact.fullName }}</NuxtLink>
      <div class="my-contact-profession">{{ contact.profession }}</div>
      <v-btn class="message-btn" variant="plain" density="compact">Send message</v-btn>
    </div>
    <v-menu>
      <template #activator="{ props }">
        <v-btn class="settings-btn" variant="plain" v-bind="props">
          <span class="btn-dot"></span>
          <span class="btn-dot"></span>
          <span class="btn-dot"></span>
        </v-btn>
      </template>
      <v-list class="options-btn-list">
        <v-list-item density="compact" class="options-item">
          <v-btn class="delete-btn" variant="text" @click="() => handleDelete(+contact.id)"
            >Delete contact</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<style scoped>
  .my-contact {
    @apply p-[16px] bg-[white] flex gap-[12px] items-center relative;
  }
  .delete-overlay {
    @apply absolute top-0 left-0 right-0 bottom-0  backdrop-blur-[3px] w-full h-full z-30 flex justify-end items-end;
  }
  .delete-overlay-cancel {
    @apply z-40 relative text-[--color-accent-blue];
  }

  .message-btn {
    padding: 0;
    &:deep(.v-btn__content) {
      text-transform: none;
      padding: 0;
      height: 100%;
    }
  }
  .my-contact-name {
    @apply font-[500];
  }
  .my-contact-info {
    @apply flex-grow;
  }
  .my-contact-profession {
    @apply text-[14px] text-[var(--color-grey)];
  }
  .settings-btn {
    @apply self-start px-0 aspect-square w-[32px] h-full min-w-0;
    &:deep(.v-btn__content) {
      @apply flex gap-[4px];
    }
  }
  .btn-dot {
    @apply w-[5px] h-[5px] rounded-[50%] bg-[var(--color-grey)];
  }
  .options-btn-list {
    @apply p-0;
  }
  .delete-btn {
    &:deep(.v-btn__content) {
      @apply text-[12px] font-[500];
    }
  }
</style>
