import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

import App from './App.vue'
import router from './router'
import './assets/base.css'

import { TroisJSVuePlugin } from 'troisjs'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FCE4EC',
      100: '#F8BBD0',
      200: '#F48FB1',
      300: '#F06292',
      400: '#EC407A',
      500: '#E91E63', // primary color
      600: '#D81B60',
      700: '#C2185B',
      800: '#AD1457',
      900: '#880E4F',
      950: '#640A3C',
    },
  },
  colorScheme: {
    dark: {
      surface: {
        ground: '#000',
        50: '{gray.50}',
        100: '{gray.100}',
        200: '{gray.200}',
        300: '{gray.300}',
        400: '{gray.400}',
        500: '{gray.500}',
        600: '{gray.600}',
        700: '{gray.700}',
        800: '{gray.800}',
        900: '{gray.900}',
        950: '{gray.950}',
      },
    },
  },
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: '.darkmode',
      cssLayer: false,
    },
  },
})

app.use(createPinia())
app.use(router)

app.use(TroisJSVuePlugin)
app.mount('#app')
