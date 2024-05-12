<script setup lang="ts">
  import PostMediaContent from "~/components/common/PostMediaContent.vue";
</script>

<template>
  <article class="post">
    <div class="post-inner">
      <div class="post-top">
        <div>
          <v-avatar />
          <div>
            <div>name</div>
            <div>position</div>
          </div>
        </div>
      </div>
      <PostMediaContent />
    </div>
  </article>
</template>

<style></style>
