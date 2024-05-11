<script setup lang="ts">
  import { type IVideo } from "~/types/file-upload";
  import VideoPlayer from "~/components/common/VideoPlayer.vue";

  const props = defineProps<{
    video: IVideo;
  }>();

  const playerOptions = computed(() => ({
    controls: true,
    sources: [
      {
        src: props.video.src,
        type: props.video.mime,
      },
    ],
    fill: true,
    fluid: true,
  }));
</script>

<template>
  <v-card min-height="400px" min-width="400px">
    <VideoPlayer :options="playerOptions" />
  </v-card>
</template>

<style></style>
