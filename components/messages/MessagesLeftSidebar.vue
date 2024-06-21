<script setup lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import MessageContact from "./MessageContact.vue";

  const { chatsService } = useApiStore();

  const { data, error } = await useAsyncData(() => chatsService.GetMyChats(), {
    server: false,
  });
</script>

<template>
  <v-card rounded="lg" class="messages-left-sidebar">
    <div class="messages-contacts-top">
      <h1 class="title messages-contacts-title">Chats</h1>
      <v-icon :icon="mdiMagnify" />
    </div>
    <v-divider class="border-opacity-100" :thickness="2" />
    <v-list class="messages-list">
      <v-list-item v-for="chat in data?.chats" :key="chat.id" :to="`/messages/${chat.id}`">
        <MessageContact :contact="chat.contact" :last-message="chat.messages[0]" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
  .messages-left-sidebar {
    @apply px-[20px] py-[16px];
  }
  .messages-list {
    @apply flex flex-col gap-[12px] mt-[12px];
  }
  .messages-contacts-title {
    @apply py-[10px];
  }
  .messages-contacts-top {
    @apply flex items-center justify-between;
  }
</style>
