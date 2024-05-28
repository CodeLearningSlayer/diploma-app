<script setup lang="ts">
  import {
    mdiHomeVariant,
    mdiHomeVariantOutline,
    mdiAccountGroup,
    mdiAccountGroupOutline,
    mdiBriefcase,
    mdiBriefcaseOutline,
    mdiBell,
    mdiBellOutline,
    mdiMessageProcessing,
    mdiMessageProcessingOutline,
    mdiAccountOutline,
    mdiAccount,
  } from "@mdi/js";
  import MainContainer from "~/components/common/MainContainer.vue";
  import HeaderLogo from "~/components/icons/HeaderLogo.vue";
  import HeaderSearch from "~/components/common/HeaderSearch.vue";
  import HeaderNavLink from "~/components/header/HeaderNavLink.vue";
  import { isRouteActive } from "~/utils/isRouteActive";

  defineProps<{
    isAuth: boolean;
  }>();

  const { profileSlug } = storeToRefs(useAuthStore());

  const navLinks: ComputedRef<
    Array<{
      icon: {
        active: string;
        default: string;
      };
      link: string;
    }>
  > = computed(() => [
    {
      icon: {
        active: mdiHomeVariant,
        default: mdiHomeVariantOutline,
      },
      link: `/${profileSlug.value}`,
    },
    {
      icon: {
        active: mdiAccountGroup,
        default: mdiAccountGroupOutline,
      },
      link: "/network",
    },
    {
      icon: {
        active: mdiBriefcase,
        default: mdiBriefcaseOutline,
      },
      link: "/deals",
    },
    {
      icon: {
        active: mdiBell,
        default: mdiBellOutline,
      },
      link: "/notifications",
    },
    {
      icon: {
        active: mdiMessageProcessing,
        default: mdiMessageProcessingOutline,
      },
      link: "/messages",
    },
    {
      icon: {
        active: mdiAccount,
        default: mdiAccountOutline,
      },
      link: "/messages",
    },
  ]);
</script>

<template>
  <header class="header py-[10px] bg-[--color-white]">
    <MainContainer class="h-full">
      <div
        class="header-inner w-full justify-between align-center grid grid-cols-[1fr,2fr,1fr] h-full"
      >
        <div class="flex align-center w-full">
          <NuxtLink to="/">
            <HeaderLogo class="mr-[10px] flex-shrink-0" />
          </NuxtLink>
        </div>
        <template v-if="isAuth">
          <div class="align-center flex justify-center h-full">
            <nav class="flex gap-[30px] align-center text-center h-full">
              <HeaderNavLink
                v-for="item in navLinks"
                :key="item.link"
                class="px-[10px]"
                :is-active="isRouteActive(item.link)"
                :icon="item.icon"
                :link="item.link"
              >
                <template #right-top></template>
              </HeaderNavLink>
            </nav>
          </div>
          <div class="flex justify-end">
            <v-divider
              vertical
              class="border-opacity-100 mr-[10px]"
              color="#2196F3"
              :thickness="2"
            />
            <HeaderSearch class="w-full" />
          </div>
        </template>
      </div>
    </MainContainer>
  </header>
</template>

<style scoped>
  .header {
    @apply h-[80px];
  }
</style>
