<script setup lang="ts">
  import RequestFriendItem from "~/components/connections-page/RequestFriendItem.vue";

  const { friendshipServce } = useApiStore();
  const { profile } = storeToRefs(useAuthStore());

  const { data: requests } = await useAsyncData(
    () => friendshipServce.GetSentRequests({ profileId: profile.value?.id }),
    { server: false },
  );

  const handleDeleteContact = async (id: number) => {
    try {
      await friendshipServce.DeleteFriend({ profileId: profile.value?.id, friendProfileId: id });
      requests.value = requests.value?.filter(item => item.id !== id);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<template>
  <main v-if="requests && requests.length > 0">
    <h2 class="title sent-requests-title">Sent requests</h2>
    <TransitionGroup name="requests-group" tag="div">
      <RequestFriendItem
        v-for="contact in requests"
        :key="contact.id"
        :contact="contact"
        mode="sent-request"
        @decline-contact="handleDeleteContact"
      />
    </TransitionGroup>
  </main>
  <div v-else class="empty-invitations">You didn't sent any contact requests yet</div>
</template>

<style scoped>
  .requests-group-enter-active,
  .requests-group-leave-active {
    transition: all 0.5s ease;
  }
  .requests-group-enter-from,
  .requests-group-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .sent-requests-title {
    @apply mb-[12px] text-[16px];
  }

  .empty-invitations {
    @apply rounded-[10px] bg-white w-full h-[200px] flex justify-center items-center;
  }
</style>
