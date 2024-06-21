<script setup lang="ts">
  import {
    mdiAccountFileTextOutline,
    mdiGamepadOutline,
    mdiAccountSettingsOutline,
    mdiTextAccount,
    mdiCake,
    mdiSchoolOutline,
    mdiDomain,
    mdiHammerWrench,
    mdiControllerClassicOutline,
  } from "@mdi/js";
  import type { IProfile } from "~/api/specs/profile";

  const props = defineProps<{
    info: IProfile;
  }>();

  const infoKeysArray = Object.keys(props.info);

  console.log(infoKeysArray);

  const sideBarUserLinks: Array<{
    name: string;
    value: string;
    icon: string;
    link?: boolean;
  }> = [
    {
      name: "Bio",
      value: props.info.bio || "Not filled",
      icon: mdiTextAccount,
    },
    {
      name: "Birthday",
      value: props.info.birthday || "Not filled",
      icon: mdiCake,
    },
    {
      name: "Education",
      value: props.info.education || "Not filled",
      icon: mdiSchoolOutline,
    },
    {
      name: "Profession",
      value: props.info.profession || "Not filled",
      icon: mdiAccountFileTextOutline,
    },
    {
      name: "Contact",
      value: props.info.contact || "Not filled",
      icon: mdiGamepadOutline,
    },
    {
      name: "Company",
      value: props.info.company || "Not filled",
      icon: mdiDomain,
    },
    {
      name: "Skills",
      value: props.info.skills || "Not filled",
      icon: mdiHammerWrench,
    },
    {
      name: "Interests",
      value: props.info.interests || "Not filled",
      icon: mdiControllerClassicOutline,
    },
  ];
</script>

<template>
  <nav class="bg-[--color-white] rounded-[18px]">
    <v-list class="nav-links-list">
      <v-list-item
        v-for="link in sideBarUserLinks"
        :key="link.name"
        :prepend-icon="link.icon"
        class="p-0"
        >{{ link.name }}: <span class="bio-value">{{ link.value }}</span></v-list-item
      >
    </v-list>
  </nav>
</template>

<style scoped>
  .nav-links-list {
    @apply px-[4px] py-[24px] rounded-[18px];
  }
  .bio-value {
    @apply font-[500];
  }
</style>
