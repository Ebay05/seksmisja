<script lang="ts" setup>
import { ref } from 'vue'

interface Update {
  title: string
  version: string
  changes: string[]
  approver: string
}

const portalUpdates = ref<Update[]>([
  {
    title: '4 grudnia 2025',
    version: '3.5.0',
    changes: [
      'Dodano efemeryczne historie wideo z filtrami AR.',
      'Ulepszono algorytm feedu, aby priorytetyzować treści z bliskich kręgów.',
      'Poprawiono ładowanie zdjęć profilowych na słabszych połączeniach.',
    ],
    approver: 'Admin 1',
  },
  {
    title: '6 grudnia 2025',
    version: '3.5.1',
    changes: [
      'Wprowadzono "Tryb Skupienia" (Focus Mode), który tymczasowo wycisza powiadomienia.',
      'Możliwość edycji wysłanych wiadomości w czatach przez 5 minut.',
      'Zoptymalizowano zużycie baterii w tle.',
    ],
    approver: 'Admin 1',
  },
  {
    title: '15 grudnia 2025',
    version: '4.0.0',
    changes: [
      'Całkowity redesign interfejsu na wersję desktopową dla lepszej użyteczności.',
      'Zintegrowano "Grupy Tematyczne" z głównym paskiem nawigacyjnym.',
      'Naprawiono błąd wyświetlania długich postów na ekranach 4K.',
    ],
    approver: 'Admin 2',
  },
  {
    title: '2 stycznia 2026',
    version: '4.0.1',
    changes: [
      'Wprowadzono prywatny kalendarz do planowania i udostępniania wydarzeń tylko wybranym znajomym.',
      'Dodano funkcję głosowania w ankietach bezpośrednio w feedzie.',
      'Zwiększono limit znaków w opisach wydarzeń.',
    ],
    approver: 'Admin 2',
  },
  {
    title: '20 stycznia 2026',
    version: '4.1.0',
    changes: [
      'Ulepszone narzędzia do filtrowania mowy nienawiści w komentarzach (AI-powered moderation).',
      'Wprowadzono weryfikację dwuetapową (2FA) przez aplikację uwierzytelniającą.',
      'Nowa sekcja pomocy dotycząca prywatności i blokowania użytkowników.',
    ],
    approver: 'Admin 1',
  },
])
</script>

<template>
  <div class="flex flex-column w-full">
    <h1 class="w-full my-2">Aktualizacje</h1>

    <div class="updates-grid-container">
      <div
        v-for="(update, index) in portalUpdates"
        :key="index"
        class="update-card p-4 line-height-3 surface-card border-round-3xl"
      >
        <h2 class="font-bold">{{ update.title }} ({{ update.version }})</h2>
        <ul class="pl-3">
          <li v-for="(change, i) in update.changes" :key="i">
            {{ change }}
          </li>
        </ul>
        <p class="pt-3 font-semibold text-color-secondary">Zatwierdzający: {{ update.approver }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.updates-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media screen and (max-width: 768px) {
  .updates-grid-container {
    grid-template-columns: 1fr;
  }
}

.update-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
}

@media screen and (max-width: 768px) {
  .update-card {
    width: 100%;
  }
}
</style>
