<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'

const searchRelation = [
  'Seksu bez zobowiązań',
  'Spontaniczne spotkanie',
  'Seks przyjaźń',
  'Konkretne spotkanie',
  'Seks przyjaźń',
  'Trójkąta MFM',
  'Trójkąta MMF',
  'Trójkąta FFM',
  'Gangbang',
]

const sexualPref = [
  'Seks klasyczny',
  'seks analny',
  'seks hiszpański',
  'seks grupowy',
  '69',
  'na jeźdźca',
  'Odwrócony jeździec',
  'nietypowe miejsca',
  'W naturze',
  'przeciętny penis',
  'cuckold',
]

const bodyFeatures = [
  'Brązowe włosy',
  'Brązowe oczy',
  'Szerokie biodra',
  'Duże piersi',
  'Manicure',
  'Duże brodawki',
  'Pedicure',
  'Okulary',
  'Biżuteria',
  'Włosy do połowy pleców',
  'Brak makijażu',
  'Piegi',
]

const lifeType = [
  'Kawa',
  'Herbata',
  'Restauracje',
  'Alkohol',
  'Papierosy',
  'Inne używki',
  'Inne używki',
  'Sport',
  'Granie',
  'Kinematografia',
  'Biznes',
  'Inwestycje',
  'Ciekawe dyskusje',
]
</script>

<template>
  <div class="flex flex-col gap-4 pb-12">
    <!-- -----------------------------------------------------
   DESCRIPTION
----------------------------------------------------- -->
    <Card class="border-white/10 bg-transparent">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-semibold text-gray-400">Opis</h6>
        <div class="flex w-full justify-between">
          <P
            >Miłośniczka długich spacerów, dobrej kawy i książek, które zostają w głowie na długo.
            Cenię sobie szczerość, poczucie humoru i rozmowy, które mają sens. Na co dzień pracuję w
            branży kreatywnej, a po godzinach oddaję się fotografii i spontanicznym wypadom za
            miasto. Szukam ludzi, którzy lubią życie w pełnym kolorze — bez udawania, z otwartym
            sercem.</P
          >
        </div>
      </CardContent>
    </Card>

    <!-- -----------------------------------------------------
   SEARCH RELATION
----------------------------------------------------- -->
    <Card class="border-white/10 bg-transparent">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-gray-400">Szukam w celu...</h6>
        <div class="">
          <span v-for="item in searchRelation" class="my-1 inline-flex gap-2">
            <p class="text-gray-400">#</p>
            <p class="pr-2">{{ item }}</p>
          </span>
        </div>
      </CardContent>
    </Card>

    <!-- -----------------------------------------------------
   BODY FEATURES
----------------------------------------------------- -->
    <Card class="border-white/10 bg-transparent">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-gray-400">Ciało</h6>
        <div class="">
          <span v-for="item in bodyFeatures" class="my-1 inline-flex gap-2">
            <p class="text-gray-400">#</p>
            <p class="pr-2">{{ item }}</p>
          </span>
        </div>
      </CardContent>
    </Card>

    <!-- -----------------------------------------------------
 SEXUAL PREFERENCES
----------------------------------------------------- -->
    <Card class="border-white/10 bg-transparent">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-gray-400">Preferencje</h6>
        <div class="">
          <span v-for="item in sexualPref" class="my-1 inline-flex gap-2">
            <p class="text-gray-400">#</p>
            <p class="pr-2">{{ item }}</p>
          </span>
        </div>
      </CardContent>
    </Card>

    <!-- -----------------------------------------------------
 SEXUAL PREFERENCES
----------------------------------------------------- -->
    <Card class="border-white/10 bg-transparent">
      <CardContent class="flex flex-col gap-4">
        <h6 class="text-gray-400">Styl życia</h6>
        <div class="">
          <span v-for="item in lifeType" class="my-1 inline-flex gap-2">
            <p class="text-gray-400">#</p>
            <p class="pr-2">{{ item }}</p>
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
