<script setup lang="ts">
  import "video.js/dist/video-js.css";
  import videojs from "video.js";

  const props = defineProps<{
    options: Object;
  }>();

  const videoPlayer = ref();
  const player = ref();

  onMounted(() => {
    player.value = videojs(videoPlayer.value, props.options, () => {});
    player.value.ready(function () {
      console.log("ready");
    });
  });

  onUnmounted(() => {
    player.value.dispose();
  });
</script>

<template>
  <div>
    <video ref="videoPlayer" class="video-js min-w-[400px] min-h-[400px]"></video>
  </div>
</template>

<style></style>
