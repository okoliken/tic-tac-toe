<script setup lang="tsx">
import Button from '../components/ui/Button.vue';
import { css } from "../../styled-system/css";
</script>

<template>
  <main :class="css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  })">
    <Button>Click me</Button>
  </main>
</template>
