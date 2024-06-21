<script setup lang="ts">
  import { mdiMagnify } from "@mdi/js";
  import MessageCreateChatModalContact from "./MessageCreateChatModalContact.vue";
  import type { IProfile } from "~/api/specs/profile";

  const props = defineProps<{
    isModalOpen: boolean;
  }>();

  const emit = defineEmits<{
    "close-modal": [];
    "start-chat": [profileId: number];
  }>();
  const { friendshipServce } = useApiStore();
  const { profile } = useAuthStore();
  const isModalOpen = computed({
    get() {
      return props.isModalOpen;
    },
    set() {
      emit("close-modal");
    },
  });

  const contacts = ref<IProfile[]>();
  const isLoading = ref(true);
  const chosenContact = ref();

  const handleChooseContact = (id: number) => {
    chosenContact.value = contacts.value?.find(item => item.id === id);
    contacts.value = [chosenContact.value, ...contacts.value!.filter(item => item.id !== id)];
  };

  onMounted(async () => {
    contacts.value = await friendshipServce.GetFriends({ profileId: profile?.id });
    isLoading.value = false;
  });
</script>

<template>
  <v-dialog v-model="isModalOpen" max-width="520" class="contacts-modal">
    <v-card class="contacts-wrapper">
      {{ console.log(contacts) }}
      <div v-if="contacts?.length > 0">
        <v-text-field variant="underlined" label="Find contact">
          <template #append-inner>
            <div class="bg-[--color-accent-blue] p-[4px] rounded-lg">
              <v-icon rounded="lg" color="white" :icon="mdiMagnify"></v-icon>
            </div>
          </template>
        </v-text-field>
        <h3 class="contacts-title">Contacts</h3>
        <v-list class="contacts-list">
          <MessageCreateChatModalContact
            v-for="item in contacts"
            :key="item.id"
            :contact="item"
            :chosen="chosenContact && chosenContact.id === item.id"
            @choose="handleChooseContact"
          />
        </v-list>
      </div>
      <div v-else-if="!isLoading" class="contacts-empty">
        You haven't added any friend yet. Please add friend and start chating!
      </div>
      <v-btn
        v-if="contacts?.length > 0"
        class="btn"
        :class="{ 'btn--primary': chosenContact }"
        :readonly="!chosenContact"
        :color="chosenContact ? 'var(--color-accent-blue)' : 'var(--color-grey)'"
        :variant="chosenContact ? 'elevated' : 'outlined'"
        @click="$emit('start-chat', chosenContact.id)"
        >Start chat</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .contacts-wrapper {
    @apply p-[30px];
  }
  .contacts-empty {
    @apply flex justify-center items-center text-center font-[500];
  }
  .contacts-title {
    @apply font-[500];
  }
  .contacts-list {
    @apply mb-[12px];
  }
</style>
