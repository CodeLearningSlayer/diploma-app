<script setup lang="ts">
  import type { IMessage } from "~/api/specs/chats";
  import type { IProfile } from "~/api/specs/profile";

  const props = defineProps<{ contact: IProfile; lastMessage: IMessage }>();
</script>

<template>
  <div class="message-contact">
    <v-avatar
      size="50"
      image="https://sun9-55.userapi.com/impg/Qhtfsff5NTtistmYOHG7VjVd7bJYeu6-fdw8hA/1RBo-PacixE.jpg?size=807x807&quality=96&sign=a670e04c143df305265716037b1e957c&c_uniq_tag=mhQvThkDJw9i7qFtDolwUCsIsslYB-7_-N7NyL99Xfs&type=album"
    />
    <div class="message-contact-body">
      <div class="name">{{ contact.fullName }}</div>
      <div class="last-message">
        <v-avatar v-if="lastMessage" size="15" :image="lastMessage?.profile?.avatar" />
        <div class="last-message-text">{{ lastMessage.text ?? "No messages" }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .message-contact {
    @apply flex gap-[10px] py-[10px];
  }
  .last-message {
    @apply flex gap-[6px];
  }
  .last-message-text {
    @apply text-[12px] text-[--color-grey];
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
    word-break: break-word;
  }
  .message-contact-body {
    @apply flex flex-col gap-[4px];
  }
</style>
