<script setup lang="ts">
import { css } from '../../styled-system/css'
</script>

<template>
  <main
    :class="[
      css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { base: 'flex-start', sm: 'center' },
        gap: '4',
        padding: '6',
        minHeight: '100vh',
        overflow: 'hidden',
      }),
    ]"
  >
    <router-view></router-view>
  </main>
</template>
