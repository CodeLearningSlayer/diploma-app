<script setup lang="ts">
  import { ConnectStatuses } from "~/consts/common";
  defineProps<{
    status: ConnectStatuses;
  }>();

  defineEmits(["request", "accept", "cancel"]);
</script>

<template>
  <div>
    <v-btn
      v-if="status === ConnectStatuses.Idle"
      class="connect-btn connect-btn--default"
      color="var(--color-accent-blue)"
      @click="$emit('request')"
      >Connect</v-btn
    >
    <v-btn
      v-else-if="status === ConnectStatuses.Requested"
      variant="outlined"
      class="connect-btn connect-btn--requested"
      @click="$emit('cancel')"
      >Requested</v-btn
    >
    <v-btn
      v-else
      class="connect-btn connect-btn--connected"
      variant="outlined"
      color="var(--color-accent-blue)"
      @click="$emit('cancel')"
      >Connected</v-btn
    >
  </div>
</template>

<style scoped>
  .connect-btn {
    @apply px-[12px] text-[12px] font-[600];
    &--default:deep(.v-btn__content) {
      @apply text-[white];
    }
  }
</style>
