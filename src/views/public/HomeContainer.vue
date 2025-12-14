<script setup lang="ts">
import Button from 'primevue/button' // Upewnij się, że masz import, jeśli nie używasz auto-importu
import { useRouter } from 'vue-router'

const router = useRouter()

// Definicje struktury linków
interface FooterLink {
  label: string
  url: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
  {
    title: 'O Seksmisji',
    links: [
      { label: 'O nas', url: '/o-nas' }, // Poprawiłem URL na przykładowy polski
      { label: 'Jak działa portal?', url: '/jak-to-dziala' },
      { label: 'Blog', url: '/blog' },
      { label: 'Współpraca', url: '/wspolpraca' },
    ],
  },
  {
    title: 'Dokumenty',
    links: [
      { label: 'Regulamin', url: '/regulamin' },
      { label: 'Polityka prywatności', url: '/polityka-prywatnosci' },
      { label: 'RODO', url: '/rodo' },
    ],
  },
  {
    title: 'Pomoc i wsparcie',
    links: [
      { label: 'FAQ', url: '/faq' },
      { label: 'Zgłoś problem', url: '/zglos' },
      { label: 'Jak usunąć konto?', url: '/usun-konto' },
    ],
  },
]
</script>

<template>
  <div class="overflow-x-hidden flex flex-column min-h-screen">
    <nav
      class="fixed w-full h-4rem flex justify-content-between align-items-center px-8 py-2 z-5 top-0 surface-0 shadow-1"
    >
      <div class="flex align-items-center">
        <img
          src="/src/assets/svg/seksmisja-logo-main.svg"
          alt="Logo SeksMisja"
          style="height: 32px; cursor: pointer"
          @click="router.push('/')"
        />
      </div>

      <div class="flex gap-3">
        <router-link to="/rejestracja" class="no-underline">
          <Button label="Zarejestruj się" severity="primary" size="small" />
        </router-link>

        <router-link to="/logowanie" class="no-underline">
          <Button label="Zaloguj się" severity="secondary" outlined size="small" />
        </router-link>
      </div>
    </nav>

    <div style="height: 4rem"></div>

    <main class="flex-grow-1">
      <router-view />
    </main>

    <footer class="pt-6 pb-2 px-4 md:px-8 surface-0 border-top-1 surface-border mt-auto">
      <div class="grid pb-4">
        <div
          class="col-12 md:col-3 mb-4 md:mb-0 flex justify-content-center md:justify-content-start"
        >
          <img
            src="/src/assets/svg/seksmisja-logo-main.svg"
            alt="Logo Seksmisja"
            height="48"
            class="cursor-pointer"
            @click="router.push('/')"
          />
        </div>

        <div class="col-12 md:col-9">
          <nav aria-label="Linki w stopce">
            <div class="grid">
              <div
                v-for="column in footerColumns"
                :key="column.title"
                class="col-12 sm:col-6 lg:col-4 flex flex-column gap-3"
              >
                <h5 class="text-xl font-semibold mb-2 text-color">{{ column.title }}</h5>

                <router-link
                  v-for="link in column.links"
                  :key="link.label"
                  :to="link.url"
                  class="no-underline text-sm text-600 hover:text-primary transition-colors transition-duration-200"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div class="flex justify-content-center py-3 border-top-1 surface-border">
        <p class="text-sm text-500 m-0">
          &copy; Copyrights 2025 Seksmisja. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  </div>
</template>
