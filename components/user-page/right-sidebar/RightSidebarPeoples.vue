<script setup lang="ts">
  import type { IProfile } from "~/api/specs/profile";
  import type { IUser } from "~/api/specs/user";
  import PeopleContact from "~/components/common/PeopleContact.vue";
  import { ConnectStatuses } from "~/consts/common";

  const { profileService, friendshipServce } = useApiStore();
  const { profile } = storeToRefs(useAuthStore());

  const { data, pending } = await useAsyncData(() => profileService.GetRecommendedFriends(), {
    server: false,
  });

  const usersWithContactStatuses = computed<IUser & { status: boolean }[]>({
    get() {
      return data.value?.peoples.map(item => ({
        status: ConnectStatuses.Idle,
        ...item,
      }));
    },
    set(newValue: Array<IProfile & { status: any }>) {
      if (data && data.value) {
        data.value.peoples = newValue;
      }
    },
  });

  const handleAddFriend = async (friendProfileId: number) => {
    try {
      const res = await friendshipServce.AddFriend({
        // вот тут забрать контакт и прокинуть в общий массив
        friendProfileId,
        profileId: profile.value.id,
      });

      const changedContact = usersWithContactStatuses.value?.find(
        item => item.id === res.friendProfileId,
      );
      console.log(changedContact);
      if (changedContact) {
        changedContact.status = ConnectStatuses.Requested;
        usersWithContactStatuses.value = [
          ...usersWithContactStatuses.value!.filter(item => item.id !== res.friendProfileId),
          changedContact,
        ];
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelFriend = async (friendProfileId: number) => {};
</script>

<template>
  <v-card v-if="data?.peoples.length > 0" class="peoples-card" rounded="xl">
    <h2 class="peoples-card-title">People you may know</h2>
    <PeopleContact
      v-for="item in usersWithContactStatuses"
      :key="item.id"
      :contact="item"
      :status="item.status"
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
