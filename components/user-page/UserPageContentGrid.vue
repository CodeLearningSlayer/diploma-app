<script setup lang="ts">
  import ContentModalImage from "~/components/user-page/content-modal/ContentModalImage.vue";
  import ContentModalVideo from "~/components/user-page/content-modal/ContentModalVideo.vue";
  import type { IVideo, IImage, IAttachedFile } from "~/types/file-upload";

  const props = defineProps<{
    images: string[];
    videos: Array<{
      thumbnail: string;
      video: string;
    }>;
  }>();

  const isImageModalOpen = ref(false);
  const isVideoModalOpen = ref(false);

  const currentImage = ref();
  const currentVideo = ref();

  const postVideos = computed<IVideo[]>(() => {
    return props.videos?.map(item => {
      return {
        src: item.video,
        thumbnail: item.thumbnail,
      };
    });
  });

  const postImages = computed<Array<IAttachedFile & { file: IImage }>>(() => {
    return props.images?.map(item => ({ type: "image", file: { src: item } }));
  });

  const handleClickImagePin = (item: string) => {
    isImageModalOpen.value = true;
    currentImage.value = item;
  };

  const handleClickVideoPin = (item: IVideo) => {
    isVideoModalOpen.value = true;
    currentVideo.value = item;
  };
</script>

<template>
  <div
    v-if="images?.length || videos?.length"
    class="pins-grid"
    :class="`pins-grid-${(images?.length || 0) + (videos?.length || 0)}`"
  >
    <!-- сделать обработку клика по пину здесь -->
    <template v-if="postImages.length">
      <UserPagePostPin
        v-for="(item, index) in postImages || []"
        :key="item.file.src"
        :class="`pins-grid-child-${index}`"
        :pin="item.file.src"
        @open-pin="() => handleClickImagePin(item)"
      />
    </template>
    <template v-if="postVideos.length">
      <UserPagePostPin
        v-for="(item, index) in postVideos"
        :key="item.src"
        :class="`pins-grid-child-${(images?.length || 0) + index}`"
        :pin="item.thumbnail"
        @open-pin="() => handleClickVideoPin(item)"
      />
    </template>
  </div>
  <v-dialog v-model="isImageModalOpen">
    <ContentModalImage :images="postImages" :clicked-image="currentImage" />
  </v-dialog>
  <v-dialog v-model="isVideoModalOpen">
    <ContentModalVideo :video="currentVideo" />
  </v-dialog>
</template>

<style scoped></style>
