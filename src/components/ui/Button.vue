<script setup lang="tsx">
import { css } from "../../../styled-system/css";
import { type Slots} from 'vue'

const buttonStyle = css({
  padding: "8px 16px",
  borderRadius: "4px",
  backgroundColor: "red",
  color: "white",
  '&:hover': {
    backgroundColor: "darkred",
    transition: "background-color 0.3s ease",
  }
})

const Button = ({ slots }: { slots: Slots }) => {
    return <button class={buttonStyle}>
        {slots.default?.()}
    </button>
}   
</script>

<template>
    <Button :slots="$slots">
        <slot></slot>
    </Button>
</template>