<script setup lang="ts">
  import { mdiEmailAlertOutline, mdiPhone, mdiPlusBoxOutline } from "@mdi/js";
  import { type IUser } from "~/api/specs/user";

  defineProps<{
    user: IUser;
  }>();
</script>

<template>
  <article>
    <div class="user-card-top-block flex justify-end">
      <div class="contact-block p-[10px] rounded-[15px] bg-[--color-white]">
        <v-list>
          <v-list-item v-if="user.contacts?.email" :prepend-icon="mdiEmailAlertOutline"
            >Email: {{ user.contacts.email }}</v-list-item
          >
          <v-list-item v-if="user.contacts?.email" :prepend-icon="mdiPhone"
            >Phone: {{ user.contacts.phone }}</v-list-item
          >
        </v-list>
      </div>
    </div>
    <div class="user-card-main-block">
      <v-avatar />
      <div class="user-card-main-block__info">
        <div>{{ user.name }}</div>
        <div>{{ user.profession }}</div>
      </div>
      <div class="user-card-main-block__completeness">
        <div>
          <span></span>
        </div>
        {{ user.profile_completness }}
      </div>
    </div>
    <div class="user-card-add-block">
      <v-icon :icon="mdiPlusBoxOutline" />
      Add another account
    </div>
  </article>
</template>

<style></style>
