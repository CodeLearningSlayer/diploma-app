<script setup lang="ts">
  import UserPageCard from "~/components/user-page/UserPageCard.vue";
  import UserPageNav from "~/components/user-page/UserPageNav.vue";
  import UserPageFollowedCard from "~/components/user-page/UserPageFollowedCard.vue";
  import UserPageCreatePostWidget from "~/components/user-page/UserPageCreatePostWidget.vue";
  import UserPagePost from "~/components/user-page/post/UserPagePost.vue";
  import RightSidebarGroups from "~/components/user-page/right-sidebar/RightSidebarGroups.vue";
  import RightSidebarPeoples from "~/components/user-page/right-sidebar/RightSidebarPeoples.vue";
  import { useApiStore } from "~/stores/api";
  import EmptyPosts from "~/components/common/EmptyPosts.vue";

  const route = useRoute();

  console.log(route.path);

  const { profileService, postsService } = useApiStore();
  const { isAuth, isMyProfile } = useAuthStore();
  const { myAccount } = storeToRefs(useUserStore());
  const completness = ref();
  const posts = ref();

  const { data } = await useAsyncData(() =>
    profileService.GetUserBySlug({ slug: route?.params?.slug }),
  );

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

  watch(
    [data],
    () => {
      if (data) {
        posts.value = data.value?.user.posts.slice().reverse();
      }
    },
    { immediate: true },
  );

  const handleCreatePost = (post: IPost) => {
    console.log(post);
    posts.value = [post, ...posts.value];
  };

  const handleDeletePost = async (postId: number) => {
    const res = await postsService.DeletePost({ id: postId });
    posts.value = posts.value.filter(item => item.id !== postId);
  };
</script>

<template>
  <NuxtLayout name="page">
    <template #sidebar-left>
      <UserPageCard v-if="data" :user="{ ...data?.user, profile_completness: completness }" />
      <UserPageNav />
      <UserPageFollowedCard />
    </template>
    <UserPageCreatePostWidget
      v-if="isMyCurrentProfile"
      :user="data?.user"
      @create-post="handleCreatePost"
    />
    <div class="posts-wrapper">
      <template v-if="posts.length > 0">
        <UserPagePost
          v-for="post in posts"
          :key="post.id"
          :user="data.user!"
          :post="post"
          :is-my-post="isMyCurrentProfile"
          @delete-post="handleDeletePost"
        />
      </template>
      <EmptyPosts v-else :is-my-profile="isMyCurrentProfile" />
    </div>
    <template #sidebar-right>
      <RightSidebarPeoples />
      <RightSidebarGroups />
      <!-- <v-card rounded="xl" class="wip">WORK IN PROGRESS</v-card>
      <v-card rounded="xl" class="wip">WORK IN PROGRESS</v-card> -->
    </template>
  </NuxtLayout>
</template>

<style scoped>
  .try-link {
    font-weight: bold;
  }

  .posts-wrapper {
    @apply flex flex-col gap-[16px];
  }

  .wip {
    @apply h-[200px] w-[200px] mb-[12px] flex flex-col justify-center items-center;
  }
</style>
