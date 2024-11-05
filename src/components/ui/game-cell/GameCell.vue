<script setup lang="ts">
import { css } from '../../../../styled-system/css'
</script>

<template>
  <div
    role="button"
    :class="
      css({
        w: '8.75rem',
        h: '8.75rem',
        bg: 'darkNavy.100',
        borderRadius: '0.938rem',
        boxShadow: '0px -8px 0px 0px #10212A inset',
        _hover: {
          cursor: 'pointer',
        }
      })
    "
  ></div>
</template>
