<script setup lang="ts">
  import { mdiSend } from "@mdi/js";

  const emit = defineEmits<{
    "send-message": [text: string];
  }>();

  const text = ref();
  const areaRef = ref();

  const handleSendMessage = () => {
    if (text.value) {
      emit("send-message", text.value);
      areaRef.value.textContent = "";
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLDivElement;
    text.value = target.textContent ?? "";
  };

  const handleEnterClick = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
</script>

<template>
  <div class="create-message-area-wrapper">
    <div
      ref="areaRef"
      contenteditable
      class="create-message-area"
      @input="handleInput"
      @keydown="handleEnterClick"
    ></div>
    <v-btn
      class="btn btn--primary"
      color="var(--color-accent-blue)"
      :icon="mdiSend"
      rounded="lg"
      variant="flat"
      @click="handleSendMessage"
    />
  </div>
</template>

<style scoped>
  .create-message-area {
    @apply flex-grow outline-none;
    &:empty::before {
      @apply block pl-[6px] text-[--color-grey] cursor-text;
      content: "Write something...";
    }
  }
  .create-message-area-wrapper {
    @apply flex p-[10px] gap-[10px];
  }
</style>
