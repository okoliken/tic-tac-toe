<script setup lang="tsx">
import { css } from '../../styled-system/css'
import { vstack } from '../../styled-system/patterns'
import Button from '../components/ui/button/Button.vue'
import Logo from '../components/Logo.vue'
</script>

<template>
  <div
    :class="
      css({
        display: 'flex',
        h: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        w: '100%',
      })
    "
  >
    <Logo :class="css({ marginBottom: '2.5rem' })" />
    <div :class="vstack({ gap: '2.5rem', alignItems: 'center', w: '100%' })">
      <div
        :class="
          css({
            w: 'min(28.75rem, 100%)',
            h: '12.813rem',
            bg: 'darkNavy.100',
            boxShadow: '0px -8px 0px 0px #10212A inset',
            borderRadius: '0.938rem',
            p: '6',
          })
        "
      >
        <div
          :class="
            vstack({
              gap: '2',
              alignItems: 'center',
              justify: 'space-between',
              h: '100%',
            })
          "
        >
          <h3
            :class="
              css({
                fontSize: 'heading.xs',
                textTransform: 'uppercase',
                color: 'sliver.100',
                textAlign: 'center',
                fontWeight: 'bold',
              })
            "
          >
            PICK PLAYER 1’S MARK
          </h3>

          <div :class="css({
            width: 'min(17.438rem, 100%)',
            height: 'min(17.438rem, 100%)',
            bg: 'darkNavy.200',
            borderRadius: '0.625rem',
            marginTop: '1.25rem'
          })">

          </div>

          <p
            :class="
              css({
                fontSize: 'heading.xxs',
                textAlign: 'center',
                color: 'sliver.200',
                textTransform: 'uppercase',
                letterSpacing: '0.055rem',
                opacity: '0.5',
              })
            "
          >
            REMEMBER : X GOES FIRST
          </p>
        </div>
      </div>
      <div
        :class="
          vstack({
            gap: '1.25rem',
            alignItems: 'center',
            flexDirection: 'column',
            w: '100%',
          })
        "
      >
        <Button visual="secondary" size="lg">NEW GAME (VS CPU)</Button>
        <Button visual="primary" size="lg">NEW GAME (VS PLAYER)</Button>
      </div>
    </div>
  </div>
</template>
