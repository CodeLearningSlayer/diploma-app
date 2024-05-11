<script setup lang="ts">
  const model = shallowRef("Egg plant");
</script>

<template>
  <div>
    <v-confirm-edit v-model="model">
      <template v-slot:default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" max-width="320" title="Update Field">
          <template v-slot:text>
            <v-text-field v-model="proxyModel.value" messages="Modify my value"></v-text-field>
          </template>

          <template v-slot:actions>
            <v-spacer></v-spacer>

            <component :is="actions"></component>
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </div>
</template>

<style></style>
