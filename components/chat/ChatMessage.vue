<script setup lang="ts">
  import type { IMessage } from "~/api/specs/chats";
  import type { IProfile } from "~/api/specs/profile";

  defineProps<{
    message: IMessage;
    author: IProfile;
    isMine: boolean;
  }>();
</script>

<template>
  <div class="message-wrapper" :class="{ mine: isMine }">
    <div class="message-inner">
      <div class="message-block" :class="{ mine: isMine }">{{ message.text }}</div>
      <v-avatar v-if="!isMine" :image="author?.avatar" />
    </div>
    <div class="message-time" :class="{ mine: isMine }">
      {{
        new Date(message?.createdAt).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
        })
      }}
      at
      {{
        new Date(message?.createdAt).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      }}
    </div>
  </div>
</template>

<style scoped>
  .message-inner {
    @apply flex gap-[12px] items-center;
  }
  .message-wrapper {
    @apply self-end;
    &.mine {
      @apply self-start;
    }
  }
  .message-block {
    @apply max-w-[476px] w-full py-[15px] px-[20px] rounded-lg rounded-bl-[0] bg-[#E9F0F8] self-start;
    &.mine {
      @apply bg-[--color-accent-blue] text-white relative self-end;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: -20px;
        border: 30px solid transparent;
        border-bottom: 30px solid var(--color-accent-blue);
      }
    }
  }
  .message-time {
    @apply text-[--color-grey] text-[12px] mt-[5px] font-[500] text-right;
    &.mine {
      @apply text-left;
    }
  }
</style>
