<script setup lang="ts">
  import { mdiEmailOutline, mdiPhone, mdiPlusBoxOutline, mdiAccountCircleOutline } from "@mdi/js";
  import { type IUser } from "~/api/specs/user";

  defineProps<{
    user: IUser;
  }>();
</script>

<template>
  <article v-if="user" class="max-w-[340px] bg-white rounded-[18px]">
    <div
      class="user-card-top-block flex justify-end bg-slate-400 rounded-t-[18px] px-[10px] py-[10px]"
    >
      <div class="contact-block p-[10px] rounded-[15px] bg-[--color-white]">
        <v-list>
          <v-list-item
            v-if="user.contacts?.email"
            class="text-[14px] p-0"
            :prepend-icon="mdiEmailOutline"
            >{{ user.contacts.email }}</v-list-item
          >
          <v-list-item
            v-if="user.contacts?.email"
            :prepend-icon="mdiPhone"
            class="text-[14px] p-0"
            >{{ user.contacts.phone }}</v-list-item
          >
        </v-list>
      </div>
    </div>
    <div class="user-card-main-block flex px-[12px] py-[5px]">
      <v-avatar
        size="44"
        :rounded="0"
        class="mt-[-27px] rounded-lg mr-[7px]"
        color="grey-lighten-2"
      >
        <v-icon
          v-if="!user.avatar"
          size="35"
          :icon="mdiAccountCircleOutline"
          color="grey-darken-2"
        />
        <v-avatar v-else alt="user-avatar" :src="user.avatar?.src" :srcset="user.avatar?.srcset" />
      </v-avatar>
      <div class="user-card-main-block__info">
        <div class="font-[600]">{{ user.name }}</div>
        <div class="text-size-14 text-[--color-grey]">{{ user.profession }}</div>
      </div>
      <div class="user-card-main-block__completeness flex align-center ml-auto gap-[8px]">
        <div class="w-[70px] h-[7px] bg-[#f6f6f6] rounded-[3px]">
          <span
            class="bg-[--color-accent-blue] my-[2px] mx-[3px] h-[3px] block rounded-[10px]"
            :style="`width: calc(${user.profile_completness}% - 6px)`"
          ></span>
        </div>
        <div class="align-top text-[--color-accent-blue]">{{ user.profile_completness }}%</div>
      </div>
    </div>
    <v-divider class="border-opacity-100" :thickness="2" />
    <div class="user-card-add-block py-[8px] px-[20px] cursor-pointer flex gap-[12px] items-center">
      <v-icon :icon="mdiPlusBoxOutline" :size="24" class="text-[--color-grey]" />
      <div class="text-[--color-grey] font-[600]">Add another account</div>
    </div>
  </article>
</template>

<style scoped>
  .v-list {
    @apply p-0 gap-[10px] flex flex-col;
    &:deep(.v-list-item) {
      padding: 0;
    }
    &:deep(.v-list-item) {
      min-height: fit-content;
    }
    &:deep(.v-list-item.v-list-item--one-line) {
      padding-inline: 0;
    }
    &:deep(.v-list-item__prepend) {
      display: block;
    }
  }
</style>
