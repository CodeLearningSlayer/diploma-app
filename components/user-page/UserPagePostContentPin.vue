<script setup lang="ts">
  import type { IAttachedFile, IImage, IVideo } from "~/types/file-upload";

  const props = defineProps<{
    pin: IAttachedFile;
  }>();

  console.log(props.pin);

  const emit = defineEmits<{
    (e: "delete-pin", item: IAttachedFile): void;
    (e: "open-pin"): void;
  }>();

  const handleCloseClick = (item: IAttachedFile) => {
    emit("delete-pin", item);
  };

  const isInstanceOfVideo = (object: IVideo | IImage): object is IVideo => {
    return "thumbnail" in object;
  };

  const pinPreview = computed(() => {
    if (isInstanceOfVideo(props.pin.file)) {
      return props.pin.file.thumbnail;
    } else {
      return props.pin.file.src;
    }
  });
</script>

<template>
  <div class="content-pin" @click="$emit('open-pin')">
    <img class="content-pin-preview" :src="pinPreview" alt="image-thumb" />
    <div class="close-btn" @click.stop="() => handleCloseClick(pin)">
      ×
      <v-tooltip location="top" activator="parent">Remove</v-tooltip>
    </div>
  </div>
</template>

<style scoped>
  .content-pin {
    @apply relative shadow;
  }
  .content-pin-preview {
    @apply aspect-video object-cover h-full;
  }
  .close-btn {
    @apply w-[20px] h-[20px] absolute top-0 right-0 text-[25px] font-[600] text-[var(--color-white)] leading-[20px] text-center cursor-pointer bg-gray-400 bg-opacity-70;
  }
</style>
