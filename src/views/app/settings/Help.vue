<script lang="ts" setup>
import { ref } from 'vue'
import { Accordion } from 'primevue'

// Nowy interfejs dla pojedynczego pytania (FAQ Item)
interface FAQItem {
  title: string
  content: string
}

// Nowy interfejs dla podkategorii (Subtitle)
interface Subcategory {
  subtitle: string
  questions: FAQItem[]
}

// Nowy interfejs dla głównej Kategorii (Category)
interface QuestionFormat {
  category: string
  subcategories: Subcategory[] // Zmieniono z 'subtitles' na 'subcategories'
}

const questions = ref<QuestionFormat[]>([
  {
    category: 'Administracja Kontem i Profil',
    subcategories: [
      {
        subtitle: 'Zakładanie i Logowanie',
        questions: [
          { title: 'Jak założyć nowe konto?', content: 'Wypełnij formularz rejestracyjny...' },
          {
            title: 'Zapomniałem hasła/nazwy użytkownika',
            content: 'Użyj opcji resetowania hasła...',
          },
          { title: 'Problemy z weryfikacją', content: 'Sprawdź folder spam...' },
          { title: 'Jak działa logowanie dwuetapowe (2FA)?', content: 'Używa dodatkowego kodu...' },
        ],
      },
      {
        subtitle: 'Edycja Profilu',
        questions: [
          {
            title: 'Jak zmienić zdjęcie profilowe/w tle?',
            content: 'Przejdź do edycji profilu...',
          },
          {
            title: 'Jak zaktualizować informacje biograficzne (np. imię, lokalizację)?',
            content: 'Edytuj profil w ustawieniach...',
          },
          {
            title: 'Zarządzanie powiadomieniami (push, e-mail, w aplikacji).',
            content: 'Wszystkie ustawienia powiadomień znajdziesz w sekcji "Powiadomienia"...',
          },
        ],
      },
      {
        subtitle: 'Dezaktywacja/Usunięcie Konta',
        questions: [
          {
            title: 'Jak tymczasowo dezaktywować konto?',
            content: 'Dostępne w Ustawienia > Konto...',
          },
          {
            title: 'Jak trwale usunąć konto i co się dzieje z moimi danymi?',
            content: 'Trwałe usunięcie jest nieodwracalne...',
          },
        ],
      },
      {
        subtitle: 'Ustawienia Prywatności',
        questions: [
          {
            title: 'Kto może zobaczyć moje posty/zdjęcia?',
            content: 'Zarządzaj widocznością w ustawieniach...',
          },
          {
            title: 'Jak zablokować/odblokować użytkownika?',
            content: 'Blokuj przez profil użytkownika...',
          },
          {
            title: 'Jak zgłosić nadużycie/nękanie/nieodpowiednie treści?',
            content: 'Użyj funkcji "Zgłoś"...',
          },
          {
            title: 'Jak sprawdzić, jakie dane zbiera platforma?',
            content: 'Sprawdź Politykę Prywatności...',
          },
        ],
      },
    ],
  },
])
</script>
<template>
  <div class="text-white w-full p-4">
    <h1 class="my-2">Centrum Pomocy (FAQ)</h1>

    <Accordion :activeIndex="0">
      <AccordionTab
        v-for="(categoryData, categoryIndex) in questions"
        :key="categoryIndex"
        :header="categoryData.category"
        class="gray-900 border-round-3xl"
      >
        <Accordion :activeIndex="null">
          <AccordionTab
            v-for="(subcat, subcatIndex) in categoryData.subcategories"
            :key="subcatIndex"
            :header="subcat.subtitle"
          >
            <div class="p-0">
              <div
                v-for="(faq, faqIndex) in subcat.questions"
                :key="faqIndex"
                class="p-4 mb-3 surface-card border-round-lgt"
              >
                <h4 class="font-bold text-lg mb-2">{{ faq.title }}</h4>
                <p class="line-height-3 text-color-secondary">
                  {{ faq.content }}
                </p>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </AccordionTab>
    </Accordion>
  </div>
</template>
