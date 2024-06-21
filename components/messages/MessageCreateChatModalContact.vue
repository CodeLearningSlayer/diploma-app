<script setup lang="ts">
  import type { IProfile } from "~/api/specs/profile";

  defineProps<{
    contact: IProfile;
    chosen?: boolean;
  }>();

  defineEmits<{
    choose: [id: number];
  }>();
</script>

<template>
  <div class="create-chat-contact" :class="{ chosen: chosen }" @click="$emit('choose', contact.id)">
    <v-avatar variant="tonal" :image="contact.avatar" />
    <div class="create-chat-contact-body">
      <div class="name">{{ contact.fullName }}</div>
      <div class="profession">{{ contact.profession }}</div>
    </div>
  </div>
</template>

<style scoped>
  .create-chat-contact {
    @apply border p-[10px] cursor-pointer rounded-lg border-gray-300 flex gap-[8px] items-center;
  }
  .name {
    @apply font-[500];
  }
  .chosen {
    @apply border-black;
  }
</style>
