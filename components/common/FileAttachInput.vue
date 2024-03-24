<script setup lang="ts">
  import { mdiFile } from "@mdi/js";
  defineProps<{
    filesType: "video" | "photo";
  }>();

  defineEmits<{
    "attach-file": [file: string, type: "video" | "photo"];
  }>();

  const isFileDraggedIn = ref(false);
  const fileUrl = ref("");

  const isFileUploaded = ref(false);

  const toggleDraggedIn = () => {
    isFileDraggedIn.value = !isFileDraggedIn.value;
  };

  onMounted(() => {
    document.body.addEventListener("dragenter", toggleDraggedIn);
    document.body.addEventListener("dragleave", toggleDraggedIn);
  });

  onUnmounted(() => {
    document.body.removeEventListener("dragenter", toggleDraggedIn);
    document.body.removeEventListener("dragleave", toggleDraggedIn);
  });
</script>

<template>
  <div class="file-attach-input" :class="{ 'file-attach-input--active': isFileDraggedIn }">
    <div>Choose a {{ filesType }} file(s)</div>
    <div class="file-attach-input-inner">
      <label class="file-attach-input-label" for="file-attach-input">
        Choose or drag and drop files
        <v-icon :icon="mdiFile" />
      </label>
      <input id="file-attach-input" type="file" />
    </div>
  </div>
</template>

<style></style>
