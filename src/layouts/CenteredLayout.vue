<script setup lang="tsx">
import { css } from "../../styled-system/css";
import { container } from '../../styled-system/patterns'
</script>

<template>
  <main :class="[css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4',
    padding: '8',
    height: '100vh',
    overflow: 'hidden'
  })]">
    <router-view></router-view>
  </main>
</template> 