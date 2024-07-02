<script setup lang="ts">
  import type { IMessage } from "~/api/specs/chats";
  import MessagesLeftSidebar from "~/components/messages/MessagesLeftSidebar.vue";
  import MessagesLeftSidebarCreateChatBtn from "~/components/messages/MessagesLeftSidebarCreateChatBtn.vue";

  const isModalOpen = ref(false);
  const { chatsService } = useApiStore();
  const { profile } = useAuthStore();

  const { data, error } = await useAsyncData(() => chatsService.GetMyChats());

  const handleOpenModal = () => {
    isModalOpen.value = true;
  };

  const handleCloseModal = () => {
    isModalOpen.value = false;
  };

  const handleStartChat = async (friendId: number) => {
    const res = await chatsService.CreateChat({
      profileId1: friendId,
      profileId2: profile!.id,
    });

    if (res) {
      await navigateTo(`/messages/${res.chat.id}`);
      handleCloseModal();
    }
  };

  const handleReceiveMessage = (msg: IMessage) => {
    console.log(msg);
    const chat = data.value?.chats.find(item => item.id === msg.chatId);
    console.log(chat);
    if (chat) {
      chat.messages.push(msg);
    }
  };
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <MessagesLeftSidebar :chats="data?.chats" />
      <MessagesLeftSidebarCreateChatBtn @open-contact-modal="handleOpenModal" />
    </template>
    <NuxtPage @receive-message="handleReceiveMessage" />
    <MessagesCreateChatModal
      :is-modal-open="isModalOpen"
      @close-modal="handleCloseModal"
      @start-chat="handleStartChat"
    />
  </NuxtLayout>
</template>

<style></style>
