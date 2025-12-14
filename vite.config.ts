import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 1. Importujemy wtyczkę i resolver
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 2. Dodajemy konfigurację Components
    Components({
      // Tutaj mówimy: "Jeśli znajdziesz nieznany komponent, sprawdź czy to PrimeVue"
      resolvers: [PrimeVueResolver()],
      // Opcjonalnie:  a do pliku generującego typy TS (domyślnie jest w root)
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'vue-router'], // Importuje ref, computed, watch, useRouter itp.
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
