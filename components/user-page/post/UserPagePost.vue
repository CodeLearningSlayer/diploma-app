<script setup lang="ts">
  import dayjs from "dayjs";
  import { mdiDelete } from "@mdi/js";
  import UserPagePostComment from "./UserPagePostComment.vue";
  import type { IPost } from "~/api/specs/posts";
  import type { IProfile } from "~/api/specs/profile";

  defineProps<{
    user: IProfile;
    post: IPost;
    isMyPost: boolean;
  }>();

  defineEmits<{
    (e: "delete-post", id: number): void;
  }>();

  const handleLike = () => {};
</script>

<template>
  <v-card class="post" color="white" rounded="xl">
    <div class="post-inner">
      <div class="post-top">
        <div class="post-author">
          <v-avatar size="45" rounded="lg" :image="user.avatar" />
          <div class="post-author-name">
            <NuxtLink :to="`/${user.slug}`" class="author-name">{{ user.fullName }}</NuxtLink>
            <div class="author-position">{{ user.profession }}</div>
          </div>
          <v-menu v-if="isMyPost" offset="10" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn class="options-btn" variant="text" v-bind="props">
                <span></span>
                <span></span>
                <span></span>
              </v-btn>
            </template>
            <v-list class="options-btn-list">
              <v-list-item class="options-item">
                <v-btn
                  class="delete-btn"
                  :append-icon="mdiDelete"
                  @click="$emit('delete-post', post.id)"
                  >Удалить пост</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="post-text">{{ post.text }}</div>
      <UserPageContentGrid :images="post.images" :videos="post.videos" />
      <div class="post-interactions">
        <UserPagePostLike :is-liked="false" @like="handleLike" />
        <UserPagePostCommentBtn />
      </div>
      <div class="post-comments">
        <v-divider class="border-opacity-100 post-comments-divider" :thickness="2" />
        <UserPagePostComment
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        />
        <v-textarea class="textarea-comment" label="Comment post" variant="outlined" :rows="2" />
        <v-btn color="var(--color-accent-blue)" class="send-comment-btn btn btn--primary"
          >Send</v-btn
        >
      </div>
      <div class="post-date">
        Publication date: {{ dayjs(post.createdAt).format("DD.MM.YYYY") }}
      </div>
    </div>
  </v-card>
</template>

<style scoped>
  .post-author {
    @apply flex gap-[8px];
  }
  .post-author-name {
    @apply flex flex-col flex-[4];
  }
  .author-name {
    @apply text-[16px];
  }
  .author-position {
    @apply text-[14px];
  }
  .post-inner {
    @apply pt-[14px] pb-[32px] px-[16px] flex flex-col gap-[12px];
  }
  .author-position {
    @apply text-[--color-grey];
  }
  .post-text {
    @apply font-[500];
  }
  .post-date {
    @apply text-[14px] text-[--color-grey] font-[500];
  }
  .options-btn {
    @apply px-0 aspect-square w-[32px] h-full min-w-0;
    &:deep(.v-btn__content) {
      @apply flex flex-col gap-[4px];
    }
    span {
      @apply block w-[5px] h-[5px] rounded-[5px] bg-gray-400;
    }
  }
  .options-item {
    @apply text-[14px];
  }
  .delete-btn {
    &:deep(.v-btn__content) {
      @apply text-[12px];
    }
  }
  .options-btn-list {
    @apply p-0;
  }
  .post-comments-divider {
    @apply mb-[12px];
  }
  .send-comment-btn {
    @apply items-center ml-auto block;
  }
  .textarea-comment {
    @apply mt-[12px];
  }
</style>
