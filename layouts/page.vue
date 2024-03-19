<script setup lang="ts">
  import MainContainer from "~/components/common/MainContainer.vue";
</script>

<template>
  <MainContainer>
    <aside v-if="$slots['sidebar-left']">
      <slot name="sidebar-left"></slot>
    </aside>
    <main class="main">
      <slot></slot>
    </main>
    <aside v-if="$slots['sidebar-right']">
      <slot name="sidebar-right"></slot>
    </aside>
  </MainContainer>
</template>

<style></style>
