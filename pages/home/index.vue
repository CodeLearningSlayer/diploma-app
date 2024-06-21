<script setup lang="ts">
  import UserPageCard from "~/components/user-page/UserPageCard.vue";
  import UserPageNav from "~/components/user-page/UserPageNav.vue";
  import UserPageFollowedCard from "~/components/user-page/UserPageFollowedCard.vue";
  import UserPageCreatePostWidget from "~/components/user-page/UserPageCreatePostWidget.vue";
  import { useApiStore } from "~/stores/api";

  const { userService } = useApiStore();

  const { myAccount } = storeToRefs(useUserStore());

  const { data } = await useAsyncData(() => userService.GetUserBySlug("asd"), {
    server: false,
  });

  if (data.value?.user) {
    myAccount.value = data.value.user;
  }
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <UserPageCard v-if="data" :user="data.user" />
      <UserPageNav />
      <UserPageFollowedCard />
    </template>
    <UserPageCreatePostWidget :user="data.user" />
    <template #sidebar-right>hi2</template>
  </NuxtLayout>
</template>

<style scoped>
  .try-link {
    font-weight: bold;
  }
</style>
