<script setup lang="ts">
  import GroupItem from "~/components/common/GroupItem.vue";
  const mockGroup = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxW6BBmC3sZgGSyv-ZMaEtIea7dVFekWO-mYID8daIfg&s",
    slug: "hse",
    name: "High School of Economy. Moscow",
  };
</script>

<template>
  <v-card class="groups-card" rounded="xl">
    <h2 class="groups-card-title">Groups you may like</h2>
    <GroupItem :group="mockGroup" />
  </v-card>
</template>

<style scoped>
  .groups-card {
    @apply p-[20px];
  }
  .groups-card-title {
    @apply font-[500] mb-[12px];
  }
</style>
