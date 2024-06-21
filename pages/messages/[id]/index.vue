<script setup lang="ts">
  import type { IMessage } from "~/api/specs/chats";
  import type { IProfile } from "~/api/specs/profile";
  import ChatMessage from "~/components/chat/ChatMessage.vue";
  import ChatMessageCreateArea from "~/components/chat/ChatMessageCreateArea.vue";

  interface IMessageCreate {
    text: string;
    chatId: number;
    profileId: number;
  }

  const {
    params: { id },
  } = useRoute();

  const { chatsService } = useApiStore();
  const { profile } = useAuthStore();
  const { data } = useAsyncData(() => chatsService.GetChatById(+id), { server: false });

  const { $socket } = useNuxtApp();

  const createMessageWidget = ref<HTMLDivElement>();
  const createMessageWidgetHeight = computed(() => {
    return `${createMessageWidget.value?.clientHeight ?? 14}px`;
  });

  const chatBody = ref<HTMLDivElement>();

  onMounted(() => {
    $socket.on("connect", () => {
      console.log("Socket connected:", $socket.id);
    });

    $socket.on("message", async (msg: IMessage) => {
      messages.value?.push(msg);
      await nextTick();
      chatBody.value?.scrollTo({
        top: chatBody.value.scrollHeight,
      });
      // тут притяпать скролл к низу
    });
  });

  const handleSendMessage = (text: string) => {
    console.log("SENDING", text);
    try {
      $socket.emit("message", {
        chatId: +id,
        profileId: profile!.id,
        text,
      } as IMessageCreate);
    } catch (e) {
      console.log(e);
    }
  };

  const friend = ref<IProfile>();
  const messages = ref<IMessage[]>();

  watch(
    data,
    () => {
      if (!data.value) return;
      if (profile.id === data.value.chat.profileId1) {
        friend.value = data.value.chat.profile2;
      } else if (profile.id === data.value.chat.profileId2) {
        friend.value = data.value.chat.profile1;
      }
      messages.value = data.value.chat.messages;
    },
    { immediate: true },
  );
</script>

<template>
  <v-card class="chat-wrapper">
    <div class="chat-top">
      <div class="chat-top__contact">
        Chat with <span>{{ friend?.fullName }}</span>
      </div>
    </div>
    <v-divider :thickness="2" class="border-opacity-100" />
    <div ref="chatBody" class="chat-body">
      <chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :author="message.profile"
        :is-mine="message.profileId === profile.id"
      />
    </div>
    <v-divider class="border-opacity-100" :thickness="2" />
    <div ref="createMessageWidget" class="chat-create-message-block">
      <chat-message-create-area @send-message="handleSendMessage" />
    </div>
  </v-card>
</template>

<style scoped>
  .chat-wrapper {
    @apply h-full flex flex-col;
    &:deep(.v-input__details) {
      @apply hidden;
    }
  }
  .chat-body {
    @apply flex-grow-[1] p-[30px] pl-[45px] flex flex-col gap-[15px];
    max-height: calc(
      100vh - var(--header-height) - var(--chat-top) - 10px - v-bind(createMessageWidgetHeight)
    );
    padding-bottom: v-bind(createMessageWidgetHeight);
    overflow-y: scroll;
  }
  .chat-top {
    @apply px-[16px] pt-[25px] pb-[20px];
    &__contact {
      @apply uppercase;
      span {
        @apply text-[--color-accent-blue];
      }
    }
  }
  .chat-create-message-block {
    @apply bottom-0 absolute bg-white w-full p-[15px];
    box-shadow: 0 0 2px 0 var(--color-grey);
  }
</style>
