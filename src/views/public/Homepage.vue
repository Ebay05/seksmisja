<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from 'primevue'
import 'primeicons/primeicons.css'
import { image } from '@primeuix/themes/aura/chip'
// import { gsap } from 'gsap'

// TAGS
// Row 1
const relationshipTags = ref([
  '#fwb',
  '#jednorazowa-przygoda',
  '#romans',
  '#długi-związek',
  '#casual-dating',
  '#otwartość',
])

// Row 2
const communicationTags = ref([
  '#anonimowość',
  '#dyskreta',
  '#sexting',
  '#czat',
  '#weryfikacja',
  '#autentyczność',
])

// FEATURES
const features = [
  {
    icon: 'lock', // Ikona Kłódki
    title: 'Bezpieczeństwo',
    description:
      'Chronimy Twoje dane, zdjęcia i filmy – Twój content jest zawsze pod pełną kontrolą. Twoja prywatność to nasz priorytet numer jeden.',
  },
  {
    icon: 'user-check', // Ikona Użytkownika + Check
    title: 'Autoryzacja Profili',
    description:
      'Każdy użytkownik przechodzi proces weryfikacji tożsamości, byś miał absolutną pewność, że rozmawiasz z prawdziwą osobą. Koniec z botami i fałszywymi kontami.',
  },
  {
    icon: 'palette', // Ikona Palety
    title: 'Przejrzysty Wygląd',
    description:
      'Intuicyjny interfejs i nowoczesny design, dzięki którym korzystanie z Nearby to czysta przyjemność. Skup się na rozmowie, a nie na nawigacji.',
  },
  {
    icon: 'gift', // Ikona Prezentu
    title: 'Wiele Darmowych Funkcji',
    description:
      'Najważniejsze opcje – przeglądanie profili, wyszukiwanie i czat – dostępne są bez opłat. Zaczynasz od razu, bez konieczności płacenia za podstawy.',
  },
  {
    icon: 'wallet', // Ikona Portfela
    title: 'Przystępne Premium',
    description:
      'Rozszerz możliwości aplikacji za uczciwą cenę. Dostęp do ekskluzywnych funkcji bez ukrytych kosztów i subskrypcyjnych pułapek. Płacisz za to, co dostajesz.',
  },
  {
    icon: 'star', // Ikona Gwiazdy/Dopasowania
    title: 'Inteligentne Dopasowania',
    description:
      'Nasz zaawansowany algorytm analizuje Twoje preferencje i aktywność, by łączyć Cię z naprawdę kompatybilnymi osobami w Twojej okolicy. Oszczędzamy Twój czas!',
  },
]

// 1. Zmienna reaktywna przechowująca pozycję scrolla
const scrollY = ref(0)

// 2. Funkcja aktualizująca pozycję
const handleScroll = () => {
  scrollY.value = window.scrollY
}

// 3. Dodanie i usunięcie nasłuchiwania (event listenera)
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- HERO SECTION -->
  <section class="w-full min-h-screen flex align-items-center px-8 py-4 relative overflow-hidden">
    <div class="grid w-full">
      <div class="col-6 flex flex-column gap-4 justify-content-center z-2">
        <div class="flex flex-column gap-2">
          <h1 class="text-7xl font-black m-0">Jedyna aplikacja jakiej potrzebujesz</h1>
          <p class="w-full line-height-3 text-lg">
            Odnajdź prawdziwą chemię. Bez pośpiechu, bez oceniania. Jedyne miejsce, gdzie
            bezpieczeństwo i dyskrecja spotykają się z autentycznym pragnieniem bliskości. Dołącz do
            społeczności, która wie, czego chce, i spotykaj osoby, które naprawdę istnieją.
          </p>
        </div>
        <div>
          <a href="/rejestracja"><Button label="Zarejestruj się" size="large" /></a>
        </div>
      </div>

      <div class="col-6 relative h-full flex align-items-center justify-content-center">
        <img
          src="@/assets/img/hero-img-1.jpg"
          alt="Main Hero"
          width="300"
          class="hero-one shadow-4 relative z-1"
          :style="{ transform: `translateY(${scrollY * -0.4}px)` }"
        />

        <img
          src="@/assets/img/hero-img-2.jpg"
          alt="Secondary Hero"
          width="200"
          class="hero-two absolute top-0 right-0 shadow-6 z-2"
          :style="{ transform: `translateY(${scrollY * -0.6}px)` }"
        />
      </div>
    </div>
  </section>

  <!-- POPULAR TAGS -->
  <div class="marquee-container marquee-1 surface-0 flex justify-content-center w-full">
    <span class="uppercase font-semibold text-primary-500">popularne tagi</span>
  </div>
  <div class="marquee-container marquee-1 surface-0">
    <div class="marquee-content" style="animation-duration: 45s">
      <span v-for="tag in relationshipTags" :key="tag" class="text-xl font-thin mx-5 text-white">
        {{ tag }}
      </span>
      <span
        v-for="tag in relationshipTags"
        :key="tag + '_copy'"
        class="text-xl font-thin mx-5 text-white"
      >
        {{ tag }}
      </span>
    </div>
  </div>

  <div class="marquee-container marquee-2 surface-0">
    <div class="marquee-content" style="animation-duration: 45s">
      <span v-for="tag in communicationTags" :key="tag" class="text-xl font-thin mx-5 text-white">
        {{ tag }}
      </span>
      <span
        v-for="tag in communicationTags"
        :key="tag + '_copy'"
        class="text-xl font-thin mx-5 text-white"
      >
        {{ tag }}
      </span>
    </div>
  </div>

  <!-- FEATURES SECTION -->
  <div class="min-h-screen p-8">
    <section class="min-h-screen p-4 md:p-12 bg-surface-100 dark:bg-surface-900">
      <div class="flex flex-column md:flex-row gap-6">
        <div class="w-full md:w-4/12 p-4 md:p-0 sticky top-5 h-fit">
          <h2 class="text-4xl lg:text-5xl font-bold mb-4">
            Wyrusz na seks misję bez dodatkowych opłat!
          </h2>
          <p class="text-lg text-surface-600 dark:text-surface-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam doloribus ab iusto
            error possimus quod fugiat nihil pariatur, laudantium deserunt, perferendis non!
            Quibusdam voluptas ratione nihil soluta nam, voluptatibus magnam!
          </p>
        </div>

        <!-- Features -->

        <div class="md:w-8/12 flex flex-column gap-8 md:gap-12">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="card-feature relative w-full border-2 border-round-md border-300 p-8 md:p-6 hover:shadow-12 transition-all transition-duration-300 transition-ease-in-out transform hover:scale-105 overflow-hidden"
            :style="`--active-color: ${feature.color || '#93c5fd'}`"
            tabindex="0"
          >
            <pixel-canvas
              data-gap="8"
              data-speed="100"
              :data-colors="`#f0f9ff, #e0f2fe, ${feature.color || '#93c5fd'}`"
              data-no-focus
            ></pixel-canvas>

            <div class="feature-content relative z-1">
              <div class="flex align-items-center mb-4">
                <i
                  :class="`pi pi-${feature.icon}`"
                  class="text-4xl text-primary-300 mr-2 p-3 flex-shrink-0"
                ></i>
                <h3 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
                  {{ feature.title }}
                </h3>
              </div>
              <p class="text-lg text-surface-700 dark:text-surface-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MOBILE APP SECTION -->

    <div
      class="w-full h-full mobile-app-banner border-radius-4xl my-4 p-5 flex align-items-center border-round-3xl"
    >
      <span class="text-3xl font-semibold">Aplikacja mobilna już wkrótce!</span>
    </div>
  </div>
</template>

<style scoped>
.mobile-app-banner {
  background-image: url('/src/assets/img/mobile-coming-soon.jpg');
  background-position-x: right;
  object-fit: cover;
  min-height: 480px;
}

img {
  transition: transform 0.1s linear;
  will-change: transform; /* Optymalizacja wydajności */
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  padding: 15px 0;
  z-index: 10;
}

.marquee-content {
  display: inline-block;
  animation: scroll-left 15s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%); /* Start przewijania od pierwotnej pozycji */
  }
  100% {
    transform: translateX(-50%); /* Przewiń do połowy treści (bo podwoiliśmy tagi) */
  }
}
</style>
