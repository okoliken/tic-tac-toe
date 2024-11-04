<script setup lang="tsx">
import { css } from '../../styled-system/css'
import { vstack, container } from '../../styled-system/patterns'
import Button from '../components/ui/button/Button.vue'
</script>

<template>
  <div
    :class="
      container({
        display: 'flex',
        minH: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      })
    "
  >
    <div :class="vstack({ gap: '5', align: 'center' })">
      <div
        :class="
          css({
            w: '28.75rem',
            h: '12.813rem',
            bg: 'darkNavy.100',
            boxShadow: '0px -8px 0px 0px #10212A inset',
            borderRadius: '0.938rem',
            p: '6',
          })
        "
      >
        <div :class="vstack({ gap: '2', align: 'center', justify: 'space-between', height: '100%' })">
          <h3
            :class="
              css({
                fontSize: 'heading.xs',
                textTransform: 'uppercase',
                color: 'sliver.100',
                textAlign: 'center',
                color: 'sliver.200',
                fontWeight: 'bold',
              })
            "
          >
            PICK PLAYER 1’S MARK
          </h3>

          <div></div>

          <p>REMEMBER : X GOES FIRST</p>
        </div>
      </div>
      <Button visual="secondary" size="lg">NEW GAME (VS CPU)</Button>
      <Button visual="primary" size="lg">NEW GAME (VS PLAYER)</Button>
    </div>
  </div>
</template>
