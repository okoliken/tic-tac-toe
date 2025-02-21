<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster position="top-center" />
  <router-view v-slot="{ Component, route }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>