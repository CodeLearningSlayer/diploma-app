<script setup lang="ts">
  import { mdiAccountCircleOutline } from "@mdi/js";
  import type { IUser } from "~/api/specs/user";
  import UserPageCreatePostWidgetToolsPanel from "~/components/user-page/UserPageCreatePostWidgetToolsPanel.vue";
  import FileAttachInput from "~/components/common/FileAttachInput.vue";

  defineProps<{
    user: IUser;
  }>();

  interface IPost {
    text: string;
    img: Array<File> | null;
    video: Array<File> | null;
    event: Date | null;
  }

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

  const modalType = ref<"photo" | "video">();

  const handleFileAttachModal = (fileType: "photo" | "video") => {
    isModalOpen.value = true;
    console.log(fileType);
    modalType.value = fileType;
  };

  const isModalOpen = ref(false);
</script>

<template>
  <div class="create-post-widget bg-[--color-white] rounded-[--round-radius]">
    <div class="create-post-widget-inner flex gap-[16px] pt-[16px] px-[25px]">
      <v-avatar v-if="user && user.avata" alt="user-avatar" :image="user.avatar?.src" />
      <v-avatar v-else size="35" class="rounded-lg" color="grey-lighten-2">
        <v-icon :icon="mdiAccountCircleOutline" color="grey-darken-2" />
      </v-avatar>
      <div class="post-field min-h-[70px] w-full" contenteditable @input="handleInput">
        {{ postContent.text }}
      </div>
    </div>
    <UserPageCreatePostWidgetToolsPanel @open-modal="handleFileAttachModal" />
    <v-dialog v-model="isModalOpen" class="attach-file-modal">
      <v-card>
        <FileAttachInput :files-type="modalType" />
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .post-field {
    @apply outline-none mt-[6px];
    &:empty::before {
      @apply block text-[--color-grey] cursor-text;
      content: "Write something...";
    }
  }
</style>
