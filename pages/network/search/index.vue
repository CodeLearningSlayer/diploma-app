<script setup lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import { useDebounceFn } from "@vueuse/core";
  import PeopleContact from "~/components/common/PeopleContact.vue";
  import RequestFriendItem from "~/components/connections-page/RequestFriendItem.vue";
  import { ConnectStatuses } from "~/consts/common";

  const searchValue = ref("");
  const { profile } = storeToRefs(useAuthStore());
  const { friendshipServce, profileService } = useApiStore();

  const { data: recommendedFriends } = await useAsyncData(
    () => profileService.GetRecommendedFriends(),
    { server: false },
  );

  const handleSearch = async (value: string) => {
    try {
      if (!value) return;

      const results = await profileService.SearchRecommendedFriends(value);

      recommendedFriends.value = results;

      console.log(results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddFriend = async (id: number) => {
    try {
      await friendshipServce.AddFriend({
        profileId: profile.value?.id,
        friendProfileId: id,
      });
      console.log(id);
      const changedFriend = recommendedFriends.value?.peoples?.find(item => item.id === id);
      if (changedFriend) {
        changedFriend.mode = "sent-request";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelRequest = async (id: number) => {
    try {
      await friendshipServce.DeleteFriend({ profileId: profile.value?.id, friendProfileId: id });
      const changedFriend = recommendedFriends.value?.peoples?.find(item => item.id === id);
      if (changedFriend) {
        changedFriend.mode = "idle";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedSearch = useDebounceFn(handleSearch, 400);
</script>

<template>
  <main>
    <h1 class="title search-contacts-title">Search for contacts</h1>
    <v-text-field
      v-model="searchValue"
      label="Find contacs"
      :prepend-inner-icon="mdiMagnify"
      density="default"
      :rounded="'40px'"
      variant="solo"
      @update:model-value="debouncedSearch"
    />
    <div class="contacts-grid">
      <RequestFriendItem
        v-for="friend in recommendedFriends?.peoples"
        :key="friend.id"
        :contact="friend"
        :mode="friend.mode || 'idle'"
        @add-contact="handleAddFriend"
        @decline-contact="handleCancelRequest"
      />
    </div>
  </main>
</template>

<style scoped>
  .search-contacts-title {
    @apply mb-[5px];
  }

  .contacts-grid {
    @apply grid grid-cols-2 gap-[12px] mt-[20px];
  }
</style>
