<script setup lang="ts">
  import MessagesLeftSidebar from "~/components/messages/MessagesLeftSidebar.vue";
  import MessagesLeftSidebarCreateChatBtn from "~/components/messages/MessagesLeftSidebarCreateChatBtn.vue";

  const isModalOpen = ref(false);

  const handleOpenModal = () => {
    isModalOpen.value = true;
  };

  const handleCloseModal = () => {
    isModalOpen.value = false;
  };

  const handleStartChat = () => {};
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
      @start-chat=""
    />
  </NuxtLayout>
</template>

<style></style>
