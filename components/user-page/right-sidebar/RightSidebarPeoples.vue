<script setup lang="ts">
  import PeopleContact from "~/components/common/PeopleContact.vue";
  import { ConnectStatuses } from "~/consts/common";

  const { profileService, friendshipServce } = useApiStore();
  const { profile } = storeToRefs(useAuthStore());

  const { data, error, pending } = await useAsyncData(
    () => profileService.GetRecommendedFriends(),
    { server: false },
  );

  const handleAddFriend = async (friendProfileId: number) => {
    try {
      const res = await friendshipServce.AddFriend({
        friendProfileId,
        profileId: profile.value.id,
      });
    } catch (e) {
      console.log(e);
    }
  };
</script>

<template>
  <v-card class="peoples-card" rounded="xl">
    <h2 class="peoples-card-title">People you may know</h2>
    <PeopleContact
      v-for="item in data?.peoples"
      :key="item.id"
      :contact="item"
      :status="ConnectStatuses.Connected"
      @add-friend="handleAddFriend"
    />
  </v-card>
</template>

<style scoped>
  .peoples-card {
    @apply p-[20px];
  }
  .peoples-card-title {
    @apply mb-[12px] font-[500];
  }
</style>
