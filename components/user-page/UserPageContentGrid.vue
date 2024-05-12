<script setup lang="ts">
  defineProps<{
    images: string[];
    videos: string[];
    contentItems: string[];
  }>();

  const isImageModalOpen = ref(false);
  const isVideoModalOpen = ref(false);
  const currentImage = ref();

  const handleClickPin = (item: IAttachedFile) => {
    if (item.type === "image") {
      isImageModalOpen.value = true;
      currentImage.value = item;
    } else if (item.type === "video") {
      isVideoModalOpen.value = true;
      currentVideo.value = item;
    }
  };
</script>

<template>
  <div class="pins-grid" :class="`pins-grid-${contentItems.length}`">
    <!-- сделать обработку клика по пину здесь -->
    <UserPagePostContentPin
      v-for="(item, index) in contentItems"
      :key="item"
      :class="`pins-grid-child-${index}`"
      :pin="item"
      @open-pin="() => handleClickPin(item)"
    />
  </div>
  <v-dialog v-model="isImageModalOpen">
    <ContentModalImage :images="images" :clicked-image="currentImage" />
  </v-dialog>
  <v-dialog v-model="isVideoModalOpen">
    <ContentModalVideo :video="currentVideo?.file as IVideo" />
  </v-dialog>
</template>

<style></style>
