<script setup lang="ts">
  import type { IAttachedFile, IImage } from "~/types/file-upload";

  const props = defineProps<{
    images: Array<IAttachedFile & { file: IImage }>;
    clickedImage?: IAttachedFile;
  }>();

  const carouselActiveIndex = ref(
    props.images.findIndex(item => item.file.src === props.clickedImage?.file.src),
  );
</script>

<template>
  <div class="content-modal-wrapper">
    <v-carousel v-model="carouselActiveIndex" hide-delimiters>
      <v-carousel-item
        v-for="(image, index) in images"
        :key="image.file.src"
        :src="image.file.src"
        :value="index"
        :alt="image.file.alt"
      />
    </v-carousel>
  </div>
</template>

<style scoped>
  .content-modal-wrapper {
    @apply bg-[--color-grey-light];
  }
</style>
