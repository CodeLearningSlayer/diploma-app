<script setup lang="ts">
  import { mdiAccountCircleOutline, mdiClockTimeEightOutline } from "@mdi/js";
  import LocalizedFormat from "dayjs/plugin/localizedFormat";
  import dayjs from "dayjs";
  import type { IUser } from "~/api/specs/user";
  import UserPageCreatePostWidgetToolsPanel from "~/components/user-page/UserPageCreatePostWidgetToolsPanel.vue";
  import FileAttachInput from "~/components/common/FileAttachInput.vue";
  import PostMediaContent from "~/components/common/PostMediaContent.vue";
  import { type IAttachedFile, type IVideo } from "~/types/file-upload";
  import type { Images, Videos } from "~/api/specs/files";

  // TODO - вынести в спеки
  interface IPost {
    text: string;
    img: Array<string> | undefined;
    video:
      | Array<{
          video: string;
          thumbnail: string;
        }>
      | undefined;
    event: Date | undefined;
  }

  defineProps<{
    user: IUser;
  }>();

  const emit = defineEmits<{
    (e: "create-post", value: IPost): void;
  }>();

  const { postsService, filesService } = useApiStore();

  const toast = useToast();

  // eslint-disable-next-line import/no-named-as-default-member
  dayjs.extend(LocalizedFormat);

  const { postContent, eventDate, handleInput, handleRemoveEvent, DEFAULT_POST_CONTENT } =
    usePostContent();
  const { attachedPreviews, isModalOpen, modalType, handleFileAttach, handleFileAttachModalOpen } =
    useAttachFiles();

  const isPostValid = (postContent: IPost) => {
    return (
      postContent.img?.length ||
      postContent.video?.length ||
      postContent.text.length ||
      postContent.event
    );
  };

  // собрать всю инфу в FormData и отправить на сервер
  const handleCreatePost = async () => {
    try {
      const postVideos = attachedPreviews.value?.filter(item => item.type === "video") as Array<
        IAttachedFile & { file: IVideo }
      >;
      const postImgs = attachedPreviews.value?.filter(item => item.type === "image");

      if (eventDate.value) postContent.value.event = eventDate.value;

      const postContentReqBody = {
        text: postContent.value.text.trim(),
        event: postContent.value.event,
        img: postImgs?.map(item => item.file.src),
        video: postVideos?.map(item => ({ thumbnail: item.file.thumbnail, video: item.file.src })),
      };

      if (!isPostValid(postContentReqBody)) {
        throw new Error("Post is not valid, fill empty fields");
      }

      const res = await postsService.CreatePost(postContentReqBody);
      emit("create-post", res);
      resetPostContent();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  const resetPostContent = () => {
    postContent.value = DEFAULT_POST_CONTENT;
    attachedPreviews.value = null;
  };

  function usePostContent() {
    const DEFAULT_POST_CONTENT = {
      text: "",
      img: undefined,
      video: undefined,
      event: undefined,
    };

    const postContent = ref<IPost>(DEFAULT_POST_CONTENT);

    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLDivElement;
      postContent.value!.text = target.textContent || "";
    };

    const eventDate = ref();

    const handleRemoveEvent = () => {
      eventDate.value = null;
    };

    return {
      DEFAULT_POST_CONTENT,
      eventDate,
      postContent,
      handleInput,
      handleRemoveEvent,
    };
  }

  function useAttachFiles() {
    const isModalOpen = ref(false);
    const modalType = ref<"image" | "video">("image");
    const attachedPreviews = ref<IAttachedFile[] | null>([]);

    const handleFileAttachModalOpen = (fileType: "image" | "video") => {
      isModalOpen.value = true;
      modalType.value = fileType;
    };

    const uploadAttachedFiles = async (files: File[], type: "image" | "video") => {
      if (type === "image") {
        const res = await filesService.UploadMultipleImages({ images: files, temp: true });
        return res.images;
      } else {
        const res = await filesService.uploadMultipleVideos({ videos: files, temp: true });
        return res.videos;
      }
    };

    function isVideoPreviews(previews: Videos | Images): previews is Videos {
      return Object.keys(previews[0]).includes("thumbnail");
    }

    const handleFileAttach = async (files: File[]) => {
      const previews = await uploadAttachedFiles(files, modalType.value);
      if (isVideoPreviews(previews)) {
        const thumbnails: IAttachedFile[] = previews.map(item => ({
          type: "video",
          file: {
            src: item.video,
            thumbnail: item.thumbnail,
          },
        }));
        attachedPreviews.value = [
          ...(attachedPreviews.value ? attachedPreviews.value : []),
          ...thumbnails,
        ];
      } else {
        const thumbs: IAttachedFile[] = previews.map(item => ({
          type: "image",
          file: {
            src: item,
          },
        }));
        attachedPreviews.value = [...attachedPreviews.value, ...thumbs];
      }
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      modalType,
      attachedPreviews,
      handleFileAttachModalOpen,
      handleFileAttach,
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
      <PostMediaContent v-if="attachedPreviews" v-model:attached-files="attachedPreviews" />
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
    <v-snackbar />
  </div>
</template>

<style scoped>
  .create-post-widget {
    @apply mb-[20px];
  }
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
