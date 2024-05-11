<script setup lang="ts">
  import { mdiPlusBoxOutline } from "@mdi/js";
  const followedTags = ["work", "bark", "fuck"];
</script>

<template>
  <div class="tags-card px-[24px] py-[20px] bg-[--color-white] rounded-[18px]">
    <div class="tags-card-top font-[600] flex uppercase justify-between items-center">
      Followed Hashtags
      <v-icon :icon="mdiPlusBoxOutline" class="text-[--color-grey] cursor-pointer" />
    </div>
    <v-divider class="border-opacity-100 mb-[5px]" />
    <div class="tags">
      <v-chip-group>
        <v-chip v-for="tag in followedTags" :key="tag" label>#{{ tag }}</v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<style></style>
