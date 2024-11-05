<script setup lang="tsx">
import { css } from "../../styled-system/css";
</script>

<template>
  <main :class="[css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4',
    padding: '6',
    minHeight: '100vh',
    overflow: 'hidden'
  })]">
    <router-view></router-view>
  </main>
</template> 