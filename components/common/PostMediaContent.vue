<script setup lang="ts">
  import UserPagePostContentPin from "~/components/user-page/UserPagePostContentPin.vue";
  import type { IAttachedFile, IVideo } from "~/types/file-upload";
  import ContentModalImage from "~/components/user-page/content-modal/ContentModalImage.vue";
  import ContentModalVideo from "~/components/user-page/content-modal/ContentModalVideo.vue";
  import { createSingleMediaPreview } from "~/utils/createMediaFilePreview";

  const props = defineProps<{
    attachedFiles: File[];
  }>();

  const emit = defineEmits<{
    (e: "update:attachedFiles", files: File[]): void;
  }>();

  const {
    currentImage,
    attachedImages,
    currentVideo,
    handleClickPin,
    handlePinDelete,
    isImageModalOpen,
    isVideoModalOpen,
    attachedPreviews,
  } = useContentPin();

  function useContentPin() {
    const isImageModalOpen = ref(false);
    const isVideoModalOpen = ref(false);

    const attachedFiles = computed({
      get() {
        return props.attachedFiles;
      },
      set(newFiles: File[]) {
        emit("update:attachedFiles", newFiles);
      },
    });

    const attachedPreviews = computed(() => {
      return attachedFiles.value.map(item => createSingleMediaPreview(item));
    });

    const attachedImages = computed(() => {
      return attachedPreviews.value.filter(item => item.type === "image");
    });

    const currentImage = ref<IAttachedFile>();
    const currentVideo = ref<IAttachedFile>();

    const handlePinDelete = (item: File) => {
      attachedFiles.value = attachedFiles.value.filter(file => file !== item);
    };

    const handleClickPin = (item: IAttachedFile) => {
      if (item.type === "image") {
        isImageModalOpen.value = true;
        currentImage.value = item;
      } else if (item.type === "video") {
        isVideoModalOpen.value = true;
        currentVideo.value = item;
      }
    };

    return {
      isImageModalOpen,
      isVideoModalOpen,
      currentImage,
      currentVideo,
      attachedImages,
      attachedFiles,
      attachedPreviews,
      handlePinDelete,
      handleClickPin,
    };
  }
</script>

<template>
  <div class="pins-grid" :class="`pins-grid-${attachedFiles.length}`">
    <!-- сделать обработку клика по пину здесь -->
    <UserPagePostContentPin
      v-for="(item, index) in attachedPreviews"
      :key="item.file.src"
      :class="`pins-grid-child-${index}`"
      :pin="item"
      :pin-file="attachedFiles[index]"
      @delete-pin="handlePinDelete"
      @open-pin="() => handleClickPin(item)"
    />
  </div>
  <v-dialog v-model="isImageModalOpen">
    <ContentModalImage :images="attachedImages" :clicked-image="currentImage" />
  </v-dialog>
  <v-dialog v-model="isVideoModalOpen">
    <ContentModalVideo :video="currentVideo?.file as IVideo" />
  </v-dialog>
</template>

<style scoped>
  .pins-grid {
    display: grid;
    gap: 8px;
    grid-template-areas: "a";
  }
  .pins-grid-2 {
    grid-template-areas: "a b";
  }
  .pins-grid-3 {
    grid-template-areas:
      "a b"
      "a c";
  }
  .pins-grid-4 {
    grid-template-areas:
      "a b"
      "a c"
      "a d";
  }
  .pins-grid-5 {
    grid-template-areas:
      "a a b"
      "a a b"
      "c d e";
  }
  .pins-grid-6 {
    grid-template-areas:
      "a a b b"
      "a a b b"
      "c d e f";
  }
  .pins-grid-7 {
    grid-template-areas:
      "a a b b b"
      "a a b b b"
      "c d e f g";
  }
  .pins-grid-8 {
    grid-template-areas:
      "a a a b b b"
      "a a a b b b"
      "c c d d e e"
      "f f g g h h";
  }
  .pins-grid-9 {
    grid-template-areas:
      "a a a b b b"
      "a a a b b b"
      "c c c d d d"
      "c c c d d d"
      "e e f f g g"
      "h h h k k k";
  }
  .pins-grid-10 {
    grid-template-areas:
      "a a a a b b b b"
      "a a a a b b b b"
      "c c c c d d d d"
      "c c c c d d d d"
      "e e e e f f f f"
      "h h g g k k l l";
  }
  .pins-grid-child-0 {
    grid-area: a;
  }
  .pins-grid-child-1 {
    grid-area: b;
  }
  .pins-grid-child-2 {
    grid-area: c;
  }
  .pins-grid-child-3 {
    grid-area: d;
  }
  .pins-grid-child-4 {
    grid-area: e;
  }
  .pins-grid-child-5 {
    grid-area: f;
  }
  .pins-grid-child-6 {
    grid-area: g;
  }
  .pins-grid-child-7 {
    grid-area: h;
  }
  .pins-grid-child-8 {
    grid-area: k;
  }
  .pins-grid-child-9 {
    grid-area: l;
  }
</style>
