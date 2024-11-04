import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalStyles = defineGlobalStyles({
  'html, body': {
    backgroundColor: 'darkNavy.200',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: '500',
  },
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,vue}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { 100: { value: '#65E9E4' }, 200: { value: '#31C3BD' } },
          secondary: { 100: { value: '#FFC860' }, 200: { value: '#F2B137' } },
          sliver: { 100: { value: '#DBE8ED' }, 200: { value: '#A8BFC9' } },
          darkNavy: { 100: { value: '#1F3641' }, 200: { value: '#1A2A33' } },
        },
        fontSizes: {
          heading: {
            lg: { value: '2.5rem' },
            md: { value: '1.5rem' },
            sm: { value: '1.25rem' },
            xs: { value: '1rem' },
            xxs: { value: '0.875rem' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
  globalCss: globalStyles,
})
