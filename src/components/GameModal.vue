<script setup lang="ts">
import { css } from '../../styled-system/css'
</script>

<template>
  <Teleport to="body">
    <div :class="css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    })">
      <div
        :class="
          css({
            backgroundColor: 'darkNavy.100',
            padding: '2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            height: '16.625rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
      })">
        <!-- Header slot -->
        <header>
          <slot name="header">
          </slot>
        </header>

        <!-- Default slot for body content -->
        <div :class="css({ marginY: '1rem' })">
          <slot></slot>
        </div>

        <!-- Footer slot -->
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>


