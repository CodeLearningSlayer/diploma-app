<script setup lang="ts">
  import ConnectionsPageTab from "~/components/connections-page/ConnectionsPageTab.vue";
</script>

<template>
  <section>
    <h1 class="title invitations-title">Your invitations</h1>
    <div class="top-tabs">
      <ConnectionsPageTab to="/network/invitations" name="Received" />
      <ConnectionsPageTab to="/network/invitations/requested" name="Sent" />
    </div>
    <v-divider :thickness="1" class="border-opacity-100 divider" />
    <NuxtPage />
  </section>
</template>

<style scoped>
  .top-tabs {
    @apply flex;
  }
  .divider {
    @apply max-h-[2px] h-[2px] bg-[#b4b4b4] mb-[12px];
  }
  .invitations-title {
    margin-bottom: 5px;
  }
</style>
