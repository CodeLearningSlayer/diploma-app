<script setup lang="ts">
  import { mdiImageOutline, mdiVideoOutline, mdiCalendarOutline, mdiSendOutline } from "@mdi/js";
  defineEmits<{
    "open-modal": [type: "video" | "photo"];
    "open-calendar": [];
    "send-post": [];
  }>();
</script>

<template>
  <div class="create-post-widget-panel w-full">
    <div
      class="create-post-widget-panel-tools grid grid-cols-[1fr,1fr,1fr,0.5fr] bg-[#D2F0FF66] overflow-hidden"
    >
      <v-btn
        class="widget-button"
        elevation="0"
        size="large"
        color="transparent"
        :prepend-icon="mdiImageOutline"
        @click="$emit('open-modal', 'photo')"
        >Photo</v-btn
      >
      <v-btn
        class="widget-button"
        elevation="0"
        size="large"
        color="transparent"
        :prepend-icon="mdiVideoOutline"
        @click="$emit('open-modal', 'video')"
        >Video</v-btn
      >
      <v-btn
        class="widget-button"
        elevation="0"
        size="large"
        color="transparent"
        :prepend-icon="mdiCalendarOutline"
        @click="$emit('open-calendar')"
        >Event</v-btn
      >
      <v-btn
        class="widget-button"
        color="#A1E1FF80"
        elevation="0"
        size="large"
        @click="$emit('send-post')"
      >
        <v-icon :icon="mdiSendOutline" />
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
  .create-post-widget-panel-tools {
    border-radius: 0 0 var(--round-radius) var(--round-radius);
  }
  .widget-button {
    @apply font-[500] normal-case text-[--color-grey] !important;
  }
</style>
