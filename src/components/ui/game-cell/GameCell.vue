<script setup lang="ts">
import { css } from '../../../../styled-system/css'
import { Icon } from '@iconify/vue'
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
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
    "
  >
    <div>
      <!-- <Icon
        :class="css({ w: '4rem', h: '4rem', color: 'primary.200' })"
        icon="fa:close"
      /> -->
      <Icon
        :class="css({ w: '4rem', h: '4rem', color: 'secondary.200' })"
        icon="fa6-solid:circle-dot"
      />
    </div>
  </div>
</template>
