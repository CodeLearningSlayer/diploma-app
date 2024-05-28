<script setup lang="ts">
  import {
    mdiLinkVariant,
    mdiEmailOutline,
    mdiAccountMultipleOutline,
    mdiSearchWeb,
  } from "@mdi/js";
</script>

<template>
  <v-list rounded="lg">
    <v-list-item
      title="Connections"
      active-class="sidebar-link--active"
      to="/network/connections"
      :prepend-icon="mdiLinkVariant"
    >
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      active-class="sidebar-link--active"
      to="/network/invitations"
      link
      title="Invitations"
      :prepend-icon="mdiEmailOutline"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item
      title="Groups"
      active-class="sidebar-link--active"
      :prepend-icon="mdiAccountMultipleOutline"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item
      title="Search contacts"
      active-class="sidebar-link--active"
      :prepend-icon="mdiSearchWeb"
    ></v-list-item>
  </v-list>
</template>

<style scoped>
  .v-list-item {
    &:deep(.v-list-item-title) {
      @apply font-[600] uppercase text-[14px];
    }
  }
  .sidebar-link--active {
    position: relative;
    &:deep(.v-list-item__overlay) {
      background: rgb(255, 255, 255);
      opacity: 0.3;
      z-index: 30;
    }
    &::before {
      position: absolute;
      content: "";
      width: 5px;
      height: 100%;
      left: 0;
      top: 0;
      background: var(--color-accent-blue);
      z-index: 30;
    }
  }
</style>
