<script setup lang="ts">
  import { mdiAccountCircleOutline, mdiClockTimeEightOutline } from "@mdi/js";
  import LocalizedFormat from "dayjs/plugin/localizedFormat";
  import dayjs from "dayjs";
  import type { IUser } from "~/api/specs/user";
  import UserPageCreatePostWidgetToolsPanel from "~/components/user-page/UserPageCreatePostWidgetToolsPanel.vue";
  import FileAttachInput from "~/components/common/FileAttachInput.vue";
  import PostMediaContent from "~/components/common/PostMediaContent.vue";
  import { createMediaFilePreview } from "~/utils/createMediaFilePreview";
  import { type IAttachedFile } from "~/types/file-upload";

  // TODO - вынести в спеки
  interface IPost {
    text: string;
    img: Array<File> | null;
    video: Array<File> | null;
    event: Date | null;
  }

  defineProps<{
    user: IUser;
  }>();

  const { postsService } = useApiStore();

  // eslint-disable-next-line import/no-named-as-default-member
  dayjs.extend(LocalizedFormat);

  const { postContent, eventDate, handleInput, handleRemoveEvent } = usePostContent();
  const {
    attachedFiles,
    attachedPreviews,
    isModalOpen,
    modalType,
    handleFileAttach,
    handleFileAttachModalOpen,
  } = useAttachFiles();

  // собрать всю инфу в FormData и отправить на сервер
  const handleCreatePost = async () => {
    const postVideos = attachedFiles.value.filter(item => item.type.includes("video"));
    const postImgs = attachedFiles.value.filter(item => item.type.includes("image"));

    postContent.value.video = postVideos;
    postContent.value.img = postImgs;

    if (eventDate.value) postContent.value.event = eventDate.value;

    const res = await postsService.CreatePost(postContent.value);
    resetPostContent();
  };

  const resetPostContent = () => {
    postContent.value = null;
    attachedFiles.value = null;
    attachedPreviews.value = null;
  };

  function usePostContent() {
    const postContent = ref<IPost>({
      text: "",
      img: null,
      video: null,
      event: null,
    });

    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLDivElement;
      postContent.value!.text = target.textContent || "";
    };

    const eventDate = ref();

    const handleRemoveEvent = () => {
      eventDate.value = null;
    };

    return {
      eventDate,
      postContent,
      handleInput,
      handleRemoveEvent,
    };
  }

  function useAttachFiles() {
    const isModalOpen = ref(false);
    const modalType = ref<"image" | "video">("image");
    const attachedPreviews = ref<IAttachedFile[]>([]);
    const attachedFiles = ref<File[]>([]);

    const handleFileAttachModalOpen = (fileType: "image" | "video") => {
      isModalOpen.value = true;
      modalType.value = fileType;
    };

    const handleFileAttach = (files: File[]) => {
      attachedPreviews.value = [
        ...attachedPreviews.value,
        ...createMediaFilePreview(files, modalType.value),
      ];
      attachedFiles.value = [...attachedFiles.value, ...files];
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      modalType,
      attachedPreviews,
      handleFileAttachModalOpen,
      handleFileAttach,
      attachedFiles,
    };
  }
</script>

<template>
  <div class="create-post-widget bg-[--color-white] rounded-[--round-radius]">
    <div class="create-post-widget-inner pt-[16px] px-[25px]">
      <div class="create-post-widget-inner-top flex gap-[16px]">
        <v-avatar v-if="user && user.avatar" alt="user-avatar" rounded="lg" :image="user.avatar" />
        <v-avatar v-else size="35" rounded="lg" color="grey-lighten-2">
          <v-icon :icon="mdiAccountCircleOutline" color="grey-darken-2" />
        </v-avatar>
        <div class="post-field min-h-[70px] w-full" contenteditable @input="handleInput">
          {{ postContent.text }}
        </div>
      </div>
      <PostMediaContent v-model:attached-files="attachedFiles" />
      <div v-if="eventDate">
        <v-divider class="border-opacity-100 my-[8px]" :thickness="1" />
        <v-chip
          :prepend-icon="mdiClockTimeEightOutline"
          color="#00acff"
          closable
          label
          @click:close="handleRemoveEvent"
          >{{ $dayjs(eventDate).format("ll") }}</v-chip
        >
      </div>
    </div>
    <UserPageCreatePostWidgetToolsPanel
      v-model:event-date="eventDate"
      @open-modal="handleFileAttachModalOpen"
      @create-post="handleCreatePost"
    />
    <v-dialog v-model="isModalOpen" class="attach-file-modal">
      <v-card class="rounded-[20px]">
        <FileAttachInput :files-type="modalType" @attach-file="handleFileAttach" />
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .post-field {
    @apply outline-none mt-[6px] whitespace-pre-wrap;
    word-break: break-word;
    &:empty::before {
      @apply block text-[--color-grey] cursor-text;
      content: "Write something...";
    }
  }
  .create-post-widget-inner {
    @apply mb-[8px];
  }
  .attach-file-modal {
    @apply max-w-[800px];
  }
  .v-dialog > .v-overlay__content .v-card {
    @apply rounded-[20px];
  }
</style>
