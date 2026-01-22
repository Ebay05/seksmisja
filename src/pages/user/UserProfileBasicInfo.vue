<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { VenusAndMars, Ruler, Heart, Languages, User, Circle } from 'lucide-vue-next'

const SearchCities = [
  {
    city: 'Warszawa',
    distance: '50km',
  },
  {
    city: 'Kraków',
    distance: '100km',
  },
  {
    city: 'Gdańsk',
    distance: '75km',
  },
]

const BasicInfo = [
  {
    icon: VenusAndMars,
    text: 'Kobieta',
  },
  {
    icon: Ruler,
    text: '158 cm',
  },
  {
    icon: Circle,
    text: 'Średniej budowy',
  },
  {
    icon: Heart,
    text: 'Hetero',
  },
  {
    icon: Languages,
    text: 'Polski, Angielski',
  },
  {
    icon: User,
    text: 'Singielka',
  },
]
</script>

<template>
  <div class="flex flex-col gap-4 pb-12">
    <!-- -----------------------------------------------------
   SEARCHING SEX
----------------------------------------------------- -->
    <Card class="border-white/10 bg-zinc-800/20">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-semibold text-gray-400">Szukam</h6>
        <div class="flex w-full justify-between">
          <p>Mężczyzn</p>
          <p class="text-gray-400">od 20 do 40 lat</p>
        </div>
      </CardContent>
    </Card>

    <!-- -----------------------------------------------------
   CITIES
----------------------------------------------------- -->
    <Card class="border-white/10 bg-zinc-800/20">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-gray-400">Preferowane miasta</h6>
        <div v-for="city in SearchCities" class="flex w-full justify-between">
          <p>{{ city.city }}</p>
          <p class="text-gray-400">do {{ city.distance }}</p>
        </div>
      </CardContent>
    </Card>

    <!-- -----------------------------------------------------
   BASIC INFO
----------------------------------------------------- -->
    <Card class="border-white/10 bg-zinc-800/20">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-gray-400">Podstawowe informacje</h6>

        <div v-for="(feature, i) in BasicInfo" :key="i" class="flex w-full items-center gap-2">
          <component :is="feature.icon" class="h-5 w-5 flex-shrink-0 text-gray-400" />

          <span>{{ feature.text }}</span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
