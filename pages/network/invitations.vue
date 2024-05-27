<script setup lang="ts">
  import ConnectionsPageTab from "~/components/connections-page/ConnectionsPageTab.vue";
</script>

<template>
  <section>
    <div class="top-tabs">
      <ConnectionsPageTab to="/network/invitations" name="Received" />
      <ConnectionsPageTab to="/network/invitations/requested" name="Sent" />
    </div>
  </section>
</template>

<style></style>
