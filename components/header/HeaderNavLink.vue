<script setup lang="ts">
  const props = defineProps<{
    icon: {
      default: string;
      active: string;
    };
    link: string;
    isActive: boolean;
  }>();

  const currentIcon = computed(() => {
    return props.isActive ? props.icon.active : props.icon.default;
  });
</script>

<template>
  <NuxtLink class="header-nav-link h-full flex align-center" :to="link">
    <v-icon :icon="currentIcon" size="large" />
    <slot name="right-top" />
  </NuxtLink>
</template>

<style scoped>
  .header-nav-link {
    @apply relative text-[--color-grey] transition;
    &:hover {
      color: var(--color-black);
    }
    &.router-link-active {
      color: var(--color-accent-blue);
      &::after {
        content: "";
        @apply absolute bottom-[-5px] left-0 w-full h-[2px] bg-[--color-accent-blue] rounded;
      }
    }
  }
</style>
