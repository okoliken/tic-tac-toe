
<script setup lang="ts">
import { css } from '../../styled-system/css'
import GameLogo from '../components/GameLogo.vue'
import GameLoader from '../components/ui/Loader.vue'
</script>

<template>
    <div
        :class="
            css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                w: '100%',
            })
        "
    >
       <div :class="
       
       css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                w: '100%',
                gap: '2.5rem',
            })">
        <GameLogo />
        <p
            :class="
                css({
                    fontSize: 'heading.sm',
                    color: 'sliver.200',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                })
            "
        >
            WAITING FOR PLAYER 2 ...
        </p>
        <GameLoader />
       </div>
    </div>
</template>