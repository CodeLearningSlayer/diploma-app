<script setup lang="ts">
  import MessagesLeftSidebar from "~/components/messages/MessagesLeftSidebar.vue";
  import MessagesLeftSidebarCreateChatBtn from "~/components/messages/MessagesLeftSidebarCreateChatBtn.vue";

  const isModalOpen = ref(false);
  const { chatsService } = useApiStore();
  const { profile } = useAuthStore();

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
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <MessagesLeftSidebar />
      <MessagesLeftSidebarCreateChatBtn @open-contact-modal="handleOpenModal" />
    </template>
    <NuxtPage />
    <MessagesCreateChatModal
      :is-modal-open="isModalOpen"
      @close-modal="handleCloseModal"
      @start-chat="handleStartChat"
    />
  </NuxtLayout>
</template>

<style></style>
