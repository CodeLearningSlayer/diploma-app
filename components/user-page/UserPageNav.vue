<script setup lang="ts">
  import {
    mdiPlayCircleOutline,
    mdiChartBar,
    mdiAccountPlusOutline,
    mdiBookmarkOutline,
    mdiGamepadOutline,
    mdiAccountSettingsOutline,
  } from "@mdi/js";

  const sideBarUserLinks: Array<{
    name: string;
    link: string;
    icon: string;
  }> = [
    {
      name: "Learning",
      link: "/learning",
      icon: mdiPlayCircleOutline,
    },
    {
      name: "Insights",
      link: "/insights",
      icon: mdiChartBar,
    },
    {
      name: "Find colleagues",
      link: "/colleagues",
      icon: mdiAccountPlusOutline,
    },
    {
      name: "Bookmarks",
      link: "/bookmarks",
      icon: mdiBookmarkOutline,
    },
    {
      name: "Gaming",
      link: "/gaming",
      icon: mdiGamepadOutline,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: mdiAccountSettingsOutline,
    },
  ];
</script>

<template>
  <nav class="bg-[--color-white] rounded-[18px]">
    <v-list class="nav-links-list">
      <v-list-item
        v-for="link in sideBarUserLinks"
        :key="link.name"
        :to="link.link"
        :prepend-icon="link.icon"
        class="p-0"
        >{{ link.name }}</v-list-item
      >
    </v-list>
  </nav>
</template>

<style scoped>
  .nav-links-list {
    @apply px-[4px] py-[24px] rounded-[18px];
  }
</style>
