// src/primevue/preset.js

import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

// Define the custom preset
export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
    },
  },
})
