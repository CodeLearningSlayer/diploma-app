<script setup lang="ts">
  import MainContainer from "~/components/common/MainContainer.vue";
</script>

<template>
  <MainContainer>
    <div
      class="page-layout-grid"
      :class="{ 'page-layout-grid--no-right-sidebar': !$slots['sidebar-right'] }"
    >
      <aside v-if="$slots['sidebar-left']" class="sidebar-left">
        <slot name="sidebar-left"></slot>
      </aside>
      <main class="main">
        <slot></slot>
      </main>
      <aside v-if="$slots['sidebar-right']" class="sidebar-right">
        <slot name="sidebar-right"></slot>
      </aside>
    </div>
  </MainContainer>
</template>

<style>
  .sidebar-left {
    @apply max-w-[333px] flex flex-col gap-[24px];
  }

  .page-layout-grid {
    @apply grid grid-cols-[333px,minmax(200px,1fr),333px] gap-[18px] mt-[38px];
    &--no-right-sidebar {
      @apply grid-cols-[333px,minmax(200px,1fr)];
    }
  }

  .sidebar-right {
    @apply flex flex-col gap-[24px];
  }
</style>
