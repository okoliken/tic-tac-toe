<script setup lang="tsx">
import { css } from "../../styled-system/css";
import { container } from '../../styled-system/patterns'
</script>

<template>
  <main :class="[container(), css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4',
    padding: '8',
    minHeight: '100vh'
  })]">
    <router-view></router-view>
  </main>
</template> 