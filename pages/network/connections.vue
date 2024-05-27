<script setup lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import { useDebounceFn } from "@vueuse/core";
  import FriendItem from "~/components/connections-page/FriendItem.vue";

  const { friendshipServce } = useApiStore();
  const { profile } = storeToRefs(useAuthStore());

  const searchValue = ref("");

  const { data, error } = useAsyncData(
    () => friendshipServce.GetFriends({ profileId: profile.value.id }),
    {
      server: false,
    },
  );

  const mode = computed<"search" | "default">(() => {
    if (searchValue.value?.length > 0) {
      return "search";
    }
    return "default";
  });

  const handleSearch = async (value: string) => {
    try {
      if (!value) return;

      const results = await friendshipServce.FindFriends({
        profileId: profile.value?.userId,
        searchTerm: value,
      });

      data.value = results;

      console.log(results);
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedSearch = useDebounceFn(handleSearch, 400);

  const handleDeleteContact = async (id: number) => {
    try {
      await friendshipServce.DeleteFriend({ profileId: profile.value?.id, friendProfileId: id });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancelDelete = async (id: number) => {
    try {
      await friendshipServce.CancelDelete({
        profileId: profile.value?.userId,
        friendProfileId: id,
      });
    } catch (e) {
      console.log(e);
    }
  };
</script>

<template>
  <section>
    <div class="connections-top">
      <h1 class="connections-top-title">Your connections</h1>
    </div>
    <v-text-field
      v-model="searchValue"
      label="Find contact"
      :prepend-inner-icon="mdiMagnify"
      density="default"
      :rounded="'40px'"
      variant="solo"
      @update:model-value="debouncedSearch"
    >
    </v-text-field>
    <div class="contacts-grid">
      <FriendItem
        v-for="friend in data"
        :key="friend.id"
        :contact="friend"
        @delete-contact="handleDeleteContact"
        @cancel-delete="handleCancelDelete"
      />
    </div>
  </section>
</template>

<style scoped>
  .v-divider {
    max-height: 5px;
    height: 4px;
    background: #adadad;
  }
  .connections-top {
    @apply mb-[5px];
  }
  .connections-top-title {
    @apply text-[18px] font-[600] flex-shrink-0;
  }
  .contacts-grid {
    @apply grid grid-cols-[1fr,1fr] gap-[12px];
  }
</style>
