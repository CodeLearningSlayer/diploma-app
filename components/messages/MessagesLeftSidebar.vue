<script setup lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import MessageContact from "./MessageContact.vue";
  import type { IProfile } from "~/api/specs/profile";

  defineProps<{
    contacts: IProfile[];
  }>();
</script>

<template>
  <v-card rounded="lg" class="messages-left-sidebar">
    <div class="messages-contacts-top">
      <h1 class="title messages-contacts-title">Chats</h1>
      <v-icon :icon="mdiMagnify" />
    </div>
    <v-divider class="border-opacity-100" :thickness="2" />
    <v-list class="messages-list">
      <v-list-item
        v-for="(contact, index) in contacts"
        :key="contact.id"
        :to="`/messages/${contact.id}`"
      >
        <MessageContact :contact="contact" />
        <v-divider v-if="index < contacts.length" class="border-opacity-100" :thickness="2" />
      </v-list-item>
      <v-list-item>
        <MessageContact />
      </v-list-item>
      <v-list-item :to="`/messages/${con}`">
        <MessageContact />
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
