<script setup lang="ts">
  import UserPageCard from "~/components/user-page/UserPageCard.vue";
  import UserPageNav from "~/components/user-page/UserPageNav.vue";
  import UserPageFollowedCard from "~/components/user-page/UserPageFollowedCard.vue";
  import UserPageCreatePostWidget from "~/components/user-page/UserPageCreatePostWidget.vue";
  import UserPagePost from "~/components/user-page/UserPagePost.vue";
  import { useApiStore } from "~/stores/api";

  const {
    params: { slug },
  } = useRoute();

  console.log(slug);

  const { profileService } = useApiStore();
  const { isAuth, isMyProfile } = useAuthStore();
  const { myAccount } = storeToRefs(useUserStore());
  const completness = ref();

  const { data } = await useAsyncData(() => profileService.GetUserBySlug({ slug }), {
    server: false,
  });

  const isMyCurrentProfile = computed(() => {
    console.log(data.value?.user.userId);
    return isMyProfile(data?.value?.user.userId);
  });

  watch(
    [data, isMyCurrentProfile],
    () => {
      if (data.value?.user && isMyCurrentProfile.value && !completness.value) {
        completness.value = data.value.profile_completeness;
      }
    },
    { immediate: true },
  );
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <UserPageCard v-if="data" :user="{ ...data?.user, profile_completness: completness }" />
      <UserPageNav />
      <UserPageFollowedCard />
    </template>
    <UserPageCreatePostWidget v-if="isMyCurrentProfile" :user="data?.user" />
    <div class="posts-wrapper">
      <!-- <UserPagePost v-for="post in data?.user.posts" :key="post.id" /> -->
    </div>
    <template #sidebar-right>hi2</template>
  </NuxtLayout>
</template>

<style scoped>
  .try-link {
    font-weight: bold;
  }
</style>
