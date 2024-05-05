<script setup lang="ts">
  import { mdiFile } from "@mdi/js";
  import { useEventListener } from "@vueuse/core";
  import LoadingContent from "~/components/common/LoadingContent.vue";
  import { type IAttachedFile } from "~/types/file-upload";

  type FilesType = "video" | "image";

  const props = defineProps<{
    filesType: FilesType;
  }>();

  const emit = defineEmits<{
    "attach-file": [files: File[], type: FilesType];
  }>();

  const acceptType = computed(() => {
    return props.filesType === "image" ? "image/*" : "video/*";
  });

  const isFileDraggedIn = ref(false);

  const toggleDraggedIn = () => {
    isFileDraggedIn.value = !isFileDraggedIn.value;
  };

  const { fileLoadingState, onFileChanged } = useLoadFile();

  function useLoadFile() {
    const files = ref<File[]>();
    const fileLoadingState = ref<"idle" | "loading" | "error">("idle");

    // это делается для превьюшек файлов и быстрого просмотра перед отправкой на сервер
    const createFileBlob = (file: File[]): IAttachedFile[] => {
      return file
        .filter(item => item.type.includes(props.filesType))
        .map(item => {
          if (props.filesType === "image") {
            return { type: props.filesType, file: { src: URL.createObjectURL(item) } };
          } else {
            return {
              type: props.filesType,
              file: {
                mime: item.type,
                src: URL.createObjectURL(item),
                thumbnail: "https://www.drupal.org/files/project-images/aee1538.jpg",
              },
            };
          }
        });
    };

    const onFileChanged = (e: Event) => {
      try {
        const target = e.target as HTMLInputElement;
        if (target.files) {
          fileLoadingState.value = "loading";
          files.value = Array.from(target.files);
          // тут возвращать не только blob, но и оригинальные файлы
          emit("attach-file", files.value, props.filesType);
        }
      } catch (e) {
        console.log(e);
      } finally {
        fileLoadingState.value = "idle";
        isFileDraggedIn.value = false;
      }
    };

    return {
      createFileBlob,
      onFileChanged,
      fileLoadingState,
      files,
    };
  }

  useEventListener(document, "dragenter", toggleDraggedIn);
  useEventListener(document, "dragleave", toggleDraggedIn);
</script>

<template>
  <div class="file-attach-input__wrapper" :class="{ 'file-attach-input--active': isFileDraggedIn }">
    <div class="file-attach-input-top">
      Choose a <span class="font-[600]">{{ filesType }}</span> file(s)
    </div>
    <v-divider class="border-opacity-100" color="#2196F3" :thickness="2" />
    <div
      class="file-attach-input-inner"
      :class="{ 'file-attach-input-inner--dragged': isFileDraggedIn }"
    >
      <LoadingContent :loading="fileLoadingState === 'loading'">
        <div class="file-attach-label-caption">
          <div v-if="isFileDraggedIn">Drop your file <span class="font-[700]">here</span></div>
          <div v-else>Choose or drag and drop files</div>
        </div>
        <v-btn v-if="!isFileDraggedIn" class="file-attach-button">
          <label class="file-attach-input-label" for="file-attach-input">
            <div class="file-attach-input-label-inner font-[500]">
              <v-icon :icon="mdiFile" /> Choose file
            </div>
          </label>
        </v-btn>
        <input
          id="file-attach-input"
          type="file"
          multiple
          :accept="acceptType"
          @change="onFileChanged"
        />
      </LoadingContent>
    </div>
  </div>
</template>

<style>
  .file-attach-label-caption {
    @apply mb-[10px];
  }
  .file-attach-input__wrapper {
    @apply text-center min-h-[500px] rounded-[20px] flex flex-col;
  }
  .file-attach-button {
    @apply p-0;
    &.v-btn {
      height: auto;
    }
  }
  .file-attach-input-inner {
    @apply grow-[4] flex justify-center relative items-center;
    &--dragged {
      @apply m-[15px] border-dashed border-2;
    }
  }
  .file-attach-input-top {
    @apply py-[8px];
  }
  .file-attach-input-label {
    @apply flex flex-col justify-center px-[10px] py-[8px] cursor-pointer z-40 relative;
  }
  #file-attach-input {
    @apply w-[100%] absolute top-0 left-0 right-0 bottom-0 z-30 opacity-0 text-[0];
  }
</style>
