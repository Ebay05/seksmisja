<script lang="ts" setup>
import { ref } from 'vue'

// Usunięto niepotrzebny i błędny import 'title'
// import { title } from '@primeuix/themes/aura/card'

interface Sets {
  title: string
  price: string
  features: string[]
}

const sets = ref<Sets[]>([
  // Dodano generyczny typ Sets[] dla lepszego typowania
  {
    title: 'Pakiet VIP',
    price: '30zł/mies.',
    features: [
      'Tag “Vip” przy nicku',
      'Zaawansowane filtry wyszukiwania',
      'Zobacz kto Cię polubił',
      'Wyższa widoczność profilu',
      'Przeglądanie anonimowe',
      'Czat wideo / rozmowy głosowe',
      'Statystyki i analizy profilu',
      'Blokowanie użytkowników',
    ],
  },
  {
    title: 'Pakiet SVIP',
    price: '50zł/mies.',
    // UWAGA: Funkcjonalności są identyczne, prawdopodobnie powinny się różnić.
    features: [
      'Tag “Vip” przy nicku',
      'Zaawansowane filtry wyszukiwania',
      'Zobacz kto Cię polubił',
      'Wyższa widoczność profilu',
      'Przeglądanie anonimowe',
      'Czat wideo / rozmowy głosowe',
      'Statystyki i analizy profilu',
      'Blokowanie użytkowników',
    ],
  },
])
</script>

<template>
  <div class="text-white w-full overflow-y-auto">
    <h1 class="my-2">Premium</h1>

    <div class="grid gap-4 m-0">
      <div
        v-for="(set, index) in sets"
        :key="index"
        class="col p-4 line-height-3 surface-card border-round-3xl m-0"
      >
        <div class="w-full m-0">
          <h2 class="font-bold">{{ set.title }}</h2>
          <span class="text-xl font-medium">{{ set.price }}</span>
          <ul class="pl-3 mt-3">
            <li v-for="(feature, i) in set.features" :key="i">{{ feature }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
