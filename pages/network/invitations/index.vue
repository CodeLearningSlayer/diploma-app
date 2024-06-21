<script setup lang="ts">
  import RequestFriendItem from "~/components/connections-page/RequestFriendItem.vue";

  const { friendshipServce } = useApiStore();
  const { profile } = storeToRefs(useAuthStore());

  // входящие запросы
  const { data: requests } = await useAsyncData(
    () => friendshipServce.GetFriendsRequests({ profileId: profile.value.id }),
    { server: false },
  );
  // уже просмотренные запросы, их обрежем до 5 штук с возможностью перехода на новую страничку
  const { data: declinedRequests } = await useAsyncData(
    () => friendshipServce.GetDeclinedRequests({ profileId: profile.value.id }),
    { server: false },
  );

  const handleAddContact = async (friendProfileId: number, isDeclined = false) => {
    try {
      await friendshipServce.AcceptFriend({ profileId: profile.value?.id, friendProfileId });
      if (!isDeclined) {
        requests.value = requests.value?.filter(item => item.id !== friendProfileId);
      } else {
        declinedRequests.value = declinedRequests.value?.filter(
          item => item.id !== friendProfileId,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeclineContact = async (friendProfileId: number) => {
    try {
      await friendshipServce.DeleteFriend({ profileId: profile.value?.id, friendProfileId });
      requests.value = requests.value?.filter(item => item.id !== friendProfileId);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<template>
  <main
    v-if="(requests && requests.length > 0) || (declinedRequests && declinedRequests.length > 0)"
  >
    <h2 v-if="requests && requests.length > 0" class="title requests-title">New requests</h2>
    <div class="new-requests-wrapper">
      <TransitionGroup name="requests-group">
        <RequestFriendItem
          v-for="contact in requests"
          :key="contact.id"
          :contact="contact"
          mode="received-request"
          @add-contact="handleAddContact"
          @decline-contact="handleDeclineContact"
        />
      </TransitionGroup>
    </div>
    <h2 v-if="declinedRequests && declinedRequests.length > 0" class="title requests-title">
      Reviewed requests
    </h2>
    <div class="new-requests-wrapper">
      <RequestFriendItem
        v-for="contact in declinedRequests"
        :key="contact.id"
        :contact="contact"
        mode="reviewed-request"
        @add-contact="id => handleAddContact(id, true)"
      />
    </div>
  </main>
  <div v-else class="empty-invitations">You didn't receive any contact requests yet</div>
</template>

<style scoped>
  .requests-title {
    @apply text-[16px] mb-[12px];
  }
  .new-requests-wrapper {
    @apply mb-[12px];
  }

  .requests-group-enter-active,
  .requests-group-leave-active {
    transition: all 0.5s ease;
  }
  .requests-group-enter-from,
  .requests-group-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .empty-invitations {
    @apply rounded-[10px] bg-white w-full h-[200px] flex justify-center items-center;
  }
</style>
