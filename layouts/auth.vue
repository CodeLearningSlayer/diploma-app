<script setup lang="ts"></script>

<template>
  <div class="auth-wrapper">
    <slot />
  </div>
</template>

<style>
  .auth-wrapper {
    height: 100%;
    background-image: url("../assets/image/auth-bg.svg");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
