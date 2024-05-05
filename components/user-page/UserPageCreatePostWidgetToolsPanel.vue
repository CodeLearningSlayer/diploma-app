<script setup lang="ts">
  import { mdiImageOutline, mdiVideoOutline, mdiCalendarOutline, mdiSendOutline } from "@mdi/js";

  const myProps = defineProps<{
    eventDate: Date;
  }>();

  const emit = defineEmits<{
    "open-modal": [type: "video" | "image"];
    "update:event-date": [date: Date];
    "create-post": [];
  }>();

  const date = computed({
    get() {
      return myProps.eventDate;
    },
    set(newDate: Date) {
      emit("update:event-date", newDate);
    },
  });

  const isDatePickerShown = ref(false);

  const onDateChangeConfirm = (newDate: Date) => {
    emit("update:event-date", newDate);
    closeDatePicker();
  };

  const closeDatePicker = () => {
    isDatePickerShown.value = false;
  };
</script>

<template>
  <div class="create-post-widget-panel w-full">
    <div
      class="create-post-widget-panel-tools grid grid-cols-[1fr,1fr,1fr,0.5fr] bg-[#D2F0FF66] overflow-hidden"
    >
      <v-btn
        class="widget-button"
        elevation="0"
        size="large"
        color="transparent"
        :prepend-icon="mdiImageOutline"
        @click="$emit('open-modal', 'image')"
        >Photo</v-btn
      >
      <v-btn
        class="widget-button"
        elevation="0"
        size="large"
        color="transparent"
        :prepend-icon="mdiVideoOutline"
        @click="$emit('open-modal', 'video')"
        >Video</v-btn
      >
      <v-menu
        v-model="isDatePickerShown"
        transition="fade-transition"
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-btn
            class="widget-button"
            elevation="0"
            size="large"
            color="transparent"
            v-bind="props"
            :prepend-icon="mdiCalendarOutline"
            >Event</v-btn
          >
        </template>
        <v-confirm-edit v-model="date" @save="onDateChangeConfirm" @cancel="closeDatePicker">
          <template #default="{ model: proxyModel, actions }">
            <v-date-picker v-model="proxyModel.value">
              <template #actions>
                <component :is="actions"></component>
              </template>
            </v-date-picker>
          </template>
        </v-confirm-edit>
      </v-menu>
      <v-btn
        class="widget-button"
        color="#A1E1FF80"
        elevation="0"
        size="large"
        @click="$emit('create-post')"
      >
        <v-icon :icon="mdiSendOutline" />
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
  .create-post-widget-panel-tools {
    border-radius: 0 0 var(--round-radius) var(--round-radius);
  }
  .widget-button {
    @apply font-[500] normal-case text-[--color-grey] !important;
  }
</style>
