<script setup lang="ts">
  import { mdiCamera, mdiCheck, mdiCancel } from "@mdi/js";
  import { Cropper, type Coordinates, type CropperResult } from "vue-advanced-cropper";
  import "vue-advanced-cropper/dist/style.css";

  const emit = defineEmits<{
    (e: "submit-photo", image: string): void;
  }>();

  const { filesService } = useApiStore();

  const currentPicturePreview = ref<string | null>();
  const currentPictureFile = ref<File | null>();
  const croppCoords = ref<Coordinates>();
  const finalImage = ref<string>();

  const handleCancelImage = () => {
    currentPictureFile.value = null;
    currentPicturePreview.value = null;
    isModalOpen.value = false;
  };

  const handleConfirmImage = async () => {
    // тут сделать запрос на обработку и обрезку файла с нужными координатами
    try {
      const res = await filesService.UploadImage({
        image: currentPictureFile.value!,
        croppParams: croppCoords.value,
      });
      finalImage.value = res.data;
      isModalOpen.value = false;
      emit("submit-photo", finalImage.value);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePictureChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      currentPicturePreview.value = URL.createObjectURL(target.files[0]);
      currentPictureFile.value = target.files[0];
      console.log(currentPictureFile.value);
      isModalOpen.value = true;
    }
  };

  const handleCropZoneChange = ({ coordinates }: CropperResult) => {
    croppCoords.value = coordinates;
  };

  const isInputVisible = computed(() => {
    return !finalImage.value;
  });

  const isModalOpen = ref(false);
</script>

<template>
  <div class="picture-input-wrapper" :class="{ 'picture-input-wrapper--active': isInputVisible }">
    <div v-if="isInputVisible" class="image-input-field">
      <label class="picture-input-label" for="picture-input">
        <v-icon :icon="mdiCamera" /> Drag or upload picture</label
      >
      <input
        id="picture-input"
        class="picture-input"
        type="file"
        accept="image/*"
        @change="handlePictureChange"
      />
    </div>
    <v-avatar v-else :image="finalImage" rounded="lg" size="150" />
    <v-dialog v-model="isModalOpen" :max-width="920">
      <v-card class="crop-modal-inner">
        <div class="crop-modal-inner-title">Crop the image</div>
        <cropper
          :stencil-props="{ aspectRatio: 1 / 1 }"
          class="cropper"
          :src="currentPicturePreview"
          @change="handleCropZoneChange"
        />
        <div class="flex justify-center gap-[10px] w-full">
          <v-btn class="crop-btn btn-cancel" :append-icon="mdiCancel" @click="handleCancelImage"
            >Cancel</v-btn
          >
          <v-btn
            class="crop-btn btn-confirm"
            color="var(--color-accent-blue)"
            :append-icon="mdiCheck"
            @click="handleConfirmImage"
            >Confirm</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .crop-modal-inner-title {
    @apply text-center text-[20px] mb-[16px] font-[600];
  }
  .picture-input-wrapper {
    @apply flex justify-center  relative min-h-[100px];
    &--active {
      @apply border-dashed border-2;
    }
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
  .crop-modal-inner {
    @apply p-[15px];
  }
  .cropper {
    @apply min-h-[400px] mb-[16px];
  }
  .v-btn.btn-confirm {
    @apply text-[--color-white];
  }
  .crop-btn {
    @apply font-[600] min-w-[200px];
  }
  .uploaded-image-box {
    @apply w-[150px] h-[150px] rounded-[20px];
  }
  .avatar-img {
    @apply rounded-[16px];
  }
</style>
