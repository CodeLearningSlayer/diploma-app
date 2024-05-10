<script setup lang="ts">
  import { mdiCamera } from "@mdi/js";
  import { Cropper } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";
  import { createSingleMediaPreview } from "~/utils/createMediaFilePreview";

  const currentPicturePreview = ref<string>();
  const currentPictureFile = ref<File>();
  const croppCoords = ref();

  const handlePictureChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      currentPicturePreview.value = URL.createObjectURL(target.files[0]);
      currentPictureFile.value = target.files[0];
    }
  };

  const isInputVisible = computed(() => {
    return !currentPictureFile.value;
  });

  const isModalOpen = ref(false);
</script>

<template>
  <div class="picture-input-wrapper">
    <div v-if="isInputVisible" class="image-input-field">
      <label class="picture-input-label" for="picture-input">
        <v-icon :icon="mdiCamera" /> Drag or upload picture</label
      >
      <input id="picture-input" class="picture-input" type="file" @change="handlePictureChange" />
    </div>
    <v-btn @click="() => (isModalOpen = !isModalOpen)">toggle visible</v-btn>
    <v-dialog v-model="isModalOpen">
      <v-card>
        <cropper :src="currentPicturePreview" />
        <div class="flex justify-center gap-[10px] w-full">
          <v-btn>Sogl</v-btn>
          <v-btn>Hunya</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .picture-input-wrapper {
    @apply flex justify-center border-dashed border-2 relative min-h-[100px];
  }
  .picture-input {
    @apply absolute left-0 top-0 right-0 bottom-0 opacity-0 z-10;
  }
  .picture-input-label {
    @apply flex justify-center items-center gap-[8px];
  }
  .image-input-field {
    @apply flex justify-center items-center;
  }
</style>
