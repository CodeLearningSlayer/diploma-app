<script setup lang="ts">
  import { useDebounceFn, useEventListener } from "@vueuse/core";
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

  const emit = defineEmits<{
    "receive-message": [msg: IMessage];
  }>();

  const { chatsService } = useApiStore();
  const { profile } = useAuthStore();
  const { data } = useAsyncData(() => chatsService.GetChatById(+id), { server: false });

  const { $socket } = useSocketStore();
  const infiniteScroller = ref<HTMLDivElement | null>(null);

  const createMessageWidget = ref<HTMLDivElement>();
  const createMessageWidgetHeight = computed(() => {
    return `${createMessageWidget.value?.clientHeight ?? 14}px`;
  });

  const chatBody = ref<HTMLDivElement>();
  const offset = ref(0);
  const isLazyLoadActive = ref<boolean>(true);
  const needToScroll = ref(false);

  onMounted(() => {
    $socket.emit("join", { chatId: id });

    $socket.on("message", async (msg: IMessage) => {
      messages.value?.push(msg);
      emit("receive-message", msg);
      await nextTick();
      if (needToScroll.value || msg.profileId === profile!.id) {
        infiniteScroller.value?.scrollTo({
          top: infiniteScroller.value.scrollHeight,
        });
      }
    });
  });

  onMounted(() => {
    infiniteScroller.value = document.querySelector(".chat-body-scroll");
    // посадить на слушатель события

    useEventListener(infiniteScroller.value, "scroll", ev => {
      const scrollTarget = ev.target as HTMLDivElement;
      needToScroll.value =
        scrollTarget.scrollHeight - scrollTarget.scrollTop <= scrollTarget.clientHeight + 150;
    });
  });

  const handleLazyLoad = async ({
    done,
  }: {
    done: (status: "loading" | "error" | "empty" | "ok") => void;
  }) => {
    try {
      if (!isLazyLoadActive.value) {
        done("empty");
        return;
      }
      const loadedMessages = await chatsService.GetChatMessages({
        chatId: +id,
        offset: offset.value,
      });
      if (loadedMessages.messages.length > 0) {
        messages.value = [...loadedMessages.messages, ...messages.value];
        offset.value += loadedMessages.messages.length;
        done("ok");
      } else {
        isLazyLoadActive.value = false;
        done("empty");
      }
    } catch (e) {
      done("error");
      console.log(e);
    }
  };

  const debouncedMessagesLoad = useDebounceFn(handleLazyLoad, 500);

  const handleSendMessage = (text: string) => {
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
  const messages = ref<IMessage[]>([]);

  onUnmounted(() => {
    stop();
  });

  watch(
    data,
    () => {
      if (!data.value) return;
      if (profile!.id === data.value.chat.profileId1) {
        friend.value = data.value.chat.profile2;
      } else if (profile!.id === data.value.chat.profileId2) {
        friend.value = data.value.chat.profile1;
      }
      messages.value = data.value.chat.messages;
      offset.value = data.value.chat.messages.length;
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
      <v-infinite-scroll
        v-if="messages.length > 0"
        class="chat-body-scroll"
        side="start"
        @load="debouncedMessagesLoad"
      >
        <chat-message
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :author="message.profile"
          :is-mine="message.profileId === profile.id"
        />
        <template #empty> This is the start of your conversation </template>
      </v-infinite-scroll>
      <div class="text-center" v-else>Start chating!</div>
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
  .chat-body-scroll {
    @apply relative;
  }
</style>
