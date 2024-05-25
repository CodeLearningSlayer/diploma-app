<script setup lang="ts">
  import MainContainer from "~/components/common/MainContainer.vue";
</script>

<template>
  <MainContainer>
    <div class="page-layout-grid">
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
  }

  .sidebar-right {
    @apply flex flex-col gap-[24px];
  }
</style>
