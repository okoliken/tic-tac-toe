import { cva } from '../../../../styled-system/css'

export const button = cva({
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'heading.sm',
      fontWeight: 'bold',
      letterSpacing: '0.078rem',
      borderRadius: '0.938rem',
      height: '3.25rem',
      width: '14.125rem',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    variants: {
      visual: {
        primary: {
          bg: 'primary.200',
          color: 'darkNavy.200',
          boxShadow: '0px -8px 0px 0px #118C87 inset',
          _hover: { bg: 'primary.100' },
          _active: { 
            transform: 'translateY(4px)',
            boxShadow: '0px -4px 0px 0px #118C87 inset',
          }
        },
        secondary: {
          bg: 'secondary.200',
          color: 'darkNavy.200',
          boxShadow: '0px -8px 0px 0px #CC8B13 inset',
          _hover: { bg: 'secondary.100' },
          _active: {
            transform: 'translateY(4px)',
            boxShadow: '0px -4px 0px 0px #CC8B13 inset',
          }
        },
        silver: {
          bg: 'sliver.200',
          color: 'darkNavy.200',
          boxShadow: '0px -8px 0px 0px #6B8997 inset',
          _hover: { bg: 'sliver.100' },
          _active: {
            transform: 'translateY(4px)',
            boxShadow: '0px -4px 0px 0px #767676 inset',
          }
        }
      },
      size: {
        sm: { 
          fontSize: 'fontSizes.heading.xs', 
          height: '3.25rem', 
          width: 'min(14.125rem, 100%)',  // Use min() function
        },
        lg: { 
          fontSize: 'fontSizes.heading.sm', 
          height: '4.188rem', 
          width: 'min(28.75rem, 100%)',  // Use min() function
        },
      },
    },
    defaultVariants: {
      visual: 'primary',
      size: 'sm',
    },
  })
