<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import OverlayPanel from 'primevue/overlaypanel'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

// Emoji

// Icons
import ImageIcon from '@/components/icons/ic_image.vue'
import MovieIcon from '@/components/icons/ic_movie.vue'
import EmojiIcon from '@/components/icons/ic_emoji.vue'

const imageInput = ref<HTMLInputElement | null>(null)
const movieInput = ref<HTMLInputElement | null>(null)

// Ref dla OverlayPanel (emoji dropdown)
const op = ref<InstanceType<typeof OverlayPanel> | null>(null)

// ================================
// Displaying the users
// ================================

import { ref, onMounted } from 'vue'
import axios from 'axios'

// --- USUNIĘTA ZMIENNA I LOGIKA ID Z LOCAL STORAGE ---

// Inicjalizacja stałych i zmiennych reaktywnych
const uzytkownicy = ref([])
const loading = ref(false)
const error = ref(null)
const API_URL = 'http://localhost:3000/users'

const pobierzUzytkownikow = async () => {
  loading.value = true
  error.value = null // --- USUNIĘTA WALIDACJA currentUserId.value ---

  try {
    // 2. Budowanie URL bez filtra ID, tylko z limitem
    const url = `${API_URL}?_limit=20`

    const response = await axios.get(url) // Zakładam, że w obiekcie użytkownika pole z imieniem/nazwą to 'name',
    // co jest użyte w pętli v-for w szablonie.

    uzytkownicy.value = response.data
  } catch (e) {
    // Wypisujemy błąd, jeśli połączenie nie działa
    console.error('Błąd pobierania danych:', e)
    error.value = 'Nie udało się połączyć z JSON Server lub błąd zapytania.'
  } finally {
    loading.value = false
  }
}

// ================================
// Auto height in textarea post
// ================================

const value2 = ref('')
const textareaRef = ref(null)
// 💡 NOWA ZMIENNA: Ref do kontenera nadrzędnego
const containerRef = ref(null)
// 💡 NOWA ZMIENNA: Reaktywna klasa dla wyrównania
const alignClass = ref('align-items-center') // Początkowa klasa

// --- Funkcja obliczająca wysokość i KLASĘ ---
const adjustTextareaHeight = () => {
  // 1. Dostęp do natywnego elementu DOM Textarea
  const textarea = textareaRef.value?.$el.querySelector('textarea')

  if (textarea) {
    // Obliczenia:
    textarea.style.height = 'auto'
    const scrollHeight = textarea.scrollHeight // Ustawienie wysokości:

    textarea.style.height = `${scrollHeight + 2}px` // 💡 NOWA LOGIKA: Obliczanie i ustawianie klasy

    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
    const rows = Math.round(scrollHeight / lineHeight)

    if (rows > 1) {
      alignClass.value = 'align-items-start'
    } else {
      alignClass.value = 'align-items-center'
    }
  }
}

// ================================
// Uploading files
// ================================

// Funkcja wywoływana po kliknięciu ikonki "Obrazek"
const openImageDialog = () => {
  // Symuluje kliknięcie na ukryty input type="file"
  imageInput.value?.click()
}

// Funkcja wywoływana po kliknięciu ikonki "Film"
const openMovieDialog = () => {
  // Symuluje kliknięcie na ukryty input type="file"
  movieInput.value?.click()
}

// Funkcja wywoływana po wybraniu pliku (tutaj możesz dodać logikę do podglądu)
const handleFileUpload = async (event: Event, type: 'image' | 'movie') => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  console.log(`Wybrano plik ${type}:`, file.name)

  if (type === 'image') {
    // Logika dla obrazów (w tym przypadku logujemy i kończymy)
    console.log('Plik jest obrazem, gotowy do POST /images (jeśli istnieje endpoint)')
    // Tutaj można by dodać logikę uploadu obrazu do JSON Server
  } else if (type === 'movie') {
    try {
      // 1. Pobierz czas trwania wideo
      const durationSeconds = await getVideoDuration(file)
      const durationFormatted = new Date(durationSeconds * 1000).toISOString().substr(11, 8)
      const maxReelTime = 60 // 1 minuta

      // 2. Ustal typ posta i endpoint
      const isReel = durationSeconds < maxReelTime
      const endpoint = isReel ? 'reels' : 'movies'
      const postType = isReel ? 'Reel' : 'Movie'

      // 3. Przygotuj dane (przykład)
      // Zakładamy, że potrzebujesz username, description i createdAt.
      const newPost = {
        // Generowanie ID jest często potrzebne dla JSON Server, jeśli nie używasz automatycznego increment
        id: Date.now().toString(),
        username: 'CurrentUser', // TODO: Użyj prawdziwej nazwy użytkownika
        title: file.name,
        description: value2.value || `Wideo: ${file.name}`,
        file: `ścieżka/do/uploadu/${file.name}`, // TODO: Użyj prawdziwej ścieżki po uploadzie
        time: durationFormatted,
        createdAt: new Date().toISOString(),
      }

      // 4. Wyślij żądanie POST do JSON Server
      const url = `${API_URL}/${endpoint}`
      loading.value = true // Użyj loading dla operacji sieciowej

      const response = await axios.post(url, newPost)

      console.log(`Pomyślnie zapisano jako ${postType}:`, response.data)
      alert(`Pomyślnie zapisano jako ${postType} (czas: ${durationFormatted})`)

      // Opcjonalnie: Zresetuj pole tekstowe po wysłaniu
      value2.value = ''
    } catch (e) {
      console.error('Błąd podczas przetwarzania wideo lub zapisu:', e)
      alert('Błąd podczas przetwarzania wideo lub zapisu.')
      error.value = 'Błąd podczas przetwarzania wideo lub zapisu.'
    } finally {
      loading.value = false
      // Resetuj input, aby umożliwić ponowne wybranie tego samego pliku
      target.value = ''
    }
  }
}

// ================================
// DISPLAYING POSTS
// ================================

// --- ZMIENIONA LOGIKA DLA POSTÓW ---
const posts = ref<any[]>([]) // 💡 Zmienione na tablicę
const postLoading = ref(false)
const postError = ref<string | null>(null)

const currentPage = ref(1) // Aktualna strona
const postsLimit = 20 // Maksymalna liczba postów na stronie
const hasMorePosts = ref(true) // Czy są jeszcze posty do załadowania

// 💡 ZMIENIONA FUNKCJA DO POBIERANIA WIELU POSTÓW
const pobierzPosty = async (page: number) => {
  if (postLoading.value || !hasMorePosts.value) return

  postLoading.value = true
  postError.value = null
  try {
    // Używamy parametrów _page i _limit do stronicowania
    // W JSON Server to jest bardzo proste i działa automatycznie
    const url = `${API_URL}/posts?_page=${page}&_limit=${postsLimit}`

    console.log('Pobieram posty z URL:', url)
    const response = await axios.get(url)

    const newPosts = response.data

    if (newPosts.length === 0 || newPosts.length < postsLimit) {
      hasMorePosts.value = false // Jeśli pobraliśmy mniej niż limit, to jest to ostatnia strona
    }

    // Dodajemy nowe posty do istniejącej listy
    posts.value = [...posts.value, ...newPosts]
  } catch (e) {
    console.error('Błąd pobierania postów:', e)
    postError.value = 'Błąd połączenia z serwerem.'
  } finally {
    postLoading.value = false
  }
}

// 💡 NOWA FUNKCJA DO OBSŁUGI PRZYCISKU
const loadMorePosts = () => {
  currentPage.value += 1 // Zwiększamy numer strony
  pobierzPosty(currentPage.value)
}

// ================================
// Current User
// ================================

// ================================
// Changes in text
// ================================

watch(
  value2,
  () => {
    adjustTextareaHeight()
  },
  { flush: 'post' },
)

onMounted(() => {
  pobierzUzytkownikow()
  adjustTextareaHeight()
  pobierzPosty(currentPage.value)

  // Current User (avatar & username)
  const localStorageKey = 'loggedUser'
  const userJson = localStorage.getItem(localStorageKey)

  if (userJson) {
    try {
      const userObject: LoggedUser = JSON.parse(userJson)

      loggedUser.value = userObject
    } catch (error) {
      console.error('Błąd parsowania danych użytkownika z localStorage:', error)
    }
  } else {
    console.log('Brak danych "loggedUser" w localStorage.')
  }
})
</script>

<template>
  <!-- ------------ -->
  <!-- MAIN CONTENT -->
  <!-- ------------ -->
  <Tabs value="0" class="w-full px-8">
    <TabList class="moj-tablist bg-transparent flex align-items-center">
      <Tab value="0">Aktualności</Tab> <Tab value="1">Kamerki</Tab>
      <Tab value="2" class="app-tabs">Wyszukiwarka</Tab>
      <Tab value="3" class="app-tabs">Ogłoszenia</Tab>
      <Tab value="4" class="app-tabs">Odwiedzający</Tab>
    </TabList>

    <TabPanels class="w-full bg-transparent">
      <!-- ------------ -->
      <!-- News Content -->
      <!-- ------------ -->
      <TabPanel value="0">
        <!-- Adding a post -->
        <div :class="['flex', 'gap-3', alignClass]" ref="containerRef">
          <img
            src="../../assets/img/avatars/man-avatar.png"
            alt="Zdjęcie Profilowe"
            width="32"
            height="32"
          />

          <FloatLabel ref="textareaRef" variant="in">
            <Textarea id="in_label" v-model="value2" rows="1" cols="30" style="resize: none" />
            <label for="in_label">Czego teraz pragniesz?</label>
          </FloatLabel>

          <div class="flex gap-2">
            <div class="flex gap-2">
              <Button
                @click="openImageDialog"
                class="p-button-icon-only p-button-text p-button-rounded"
              >
                <ImageIcon />
              </Button>

              <Button
                @click="openMovieDialog"
                class="p-button-icon-only p-button-text p-button-rounded"
              >
                <MovieIcon />
              </Button>

              <Button @click="" class="p-button-icon-only p-button-text p-button-rounded">
                <EmojiIcon />
              </Button>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref="imageInput"
          @change="handleFileUpload($event, 'image')"
          accept="image/*"
          style="display: none"
        />

        <input
          type="file"
          ref="movieInput"
          @change="handleFileUpload($event, 'movie')"
          accept="video/*"
          style="display: none"
        />
        <!-- ----- -->
        <!-- Reels -->
        <!-- ----- -->
        <div class="reels-container mt-4 border-b border-surface-200 pb-4">
          <h3 class="font-bold uppercase text-sm letter-spacing-2 mb-2">Reelsy</h3>
          <div class="flex gap-3">
            <video
              src="/src/content/reels/reels-1.mp4"
              class="reels item-1"
              autoplay
              muted
              loop
            ></video>
            <video
              src="/src/content/reels/reels-2.mp4"
              class="reels item-2"
              autoplay
              muted
              loop
            ></video>
            <video
              src="/src/content/reels/reels-3.mp4"
              class="reels item-3"
              autoplay
              muted
              loop
            ></video>
            <video
              src="/src/content/reels/reels-4.mp4"
              class="reels item-4"
              autoplay
              muted
              loop
            ></video>
            <video
              src="/src/content/reels/reels-5.mp4"
              class="reels item-4"
              autoplay
              muted
              loop
            ></video>
          </div>
        </div>
        <!-- ----- -->
        <!-- Posts -->
        <!-- ----- -->
        <div class="posts-list-container mt-6">
          <h3 class="font-bold uppercase text-sm letter-spacing-2 mb-2">Posty</h3>

          <p v-if="postError" class="text-red-500">Błąd: {{ postError }}</p>

          <div
            v-for="singlePost in posts"
            :key="singlePost.id"
            class="post-card border-b border-surface-200 py-4"
          >
            <div class="flex items-start gap-3 mb-3">
              <img
                src="/src/assets/img/avatars/man-avatar.png"
                alt="Avatar"
                width="40"
                height="40"
                class="rounded-full flex-shrink-0"
              />
              <div>
                <span class="font-semibold text-surface-900">{{
                  singlePost.username || 'Anonim'
                }}</span>
                <div class="text-xs text-surface-500">
                  ID: {{ singlePost.id }} |
                  {{ new Date(singlePost.createdAt).toLocaleDateString() }}
                </div>
              </div>
            </div>

            <h4 class="font-bold text-xl mb-2">{{ singlePost.title }}</h4>
            <p class="text-surface-700 mb-3 whitespace-pre-wrap">{{ singlePost.description }}</p>

            <div v-if="singlePost.tags" class="flex flex-wrap gap-2 text-xs">
              <span
                v-for="tag in singlePost.tags.split(',').map((t) => t.trim())"
                :key="tag"
                class="bg-surface-200 text-surface-700 px-2 py-1 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <div class="mt-4 text-center">
            <p v-if="postLoading" class="text-surface-600">Ładowanie...</p>

            <Button
              v-else-if="hasMorePosts"
              @click="loadMorePosts"
              label="Załaduj więcej"
              severity="secondary"
              text
              :disabled="postLoading"
            />

            <p v-else class="text-surface-500 text-sm py-2">
              Wszystkie posty zostały załadowane. 🎉
            </p>
          </div>
        </div>
      </TabPanel>

      <!-- ------ -->
      <!-- Movies -->
      <!-- ------ -->
      <TabPanel value="1">
        <video
          src="/src/content/reels/reels-3.mp4"
          width="600px"
          height="400px"
          fill-object="cover"
        ></video>
      </TabPanel>

      <TabPanel value="2">
        <p class="m-0">rekjklgrmlgr</p>
      </TabPanel>

      <TabPanel value="3">
        <p class="m-0">ewfwefefwwef</p>
      </TabPanel>

      <TabPanel value="4">
        <p class="m-0">gbfbsdbdbfda</p>
      </TabPanel>
    </TabPanels>
  </Tabs>

  <!-- -------- -->
  <!-- CONTACTS -->
  <!-- -------- -->
  <div class="users-container w-4 ml-4">
    <router-link to="/ustawienia" custom v-slot="{ href, navigate }">
      <Button
        variant="outlined"
        :href="href"
        @click="navigate"
        class="font-bold uppercase text-sm letter-spacing-2 mb-4"
      >
        Ustawienia
      </Button>
    </router-link>
    <h2 class="font-bold uppercase text-sm letter-spacing-2 mb-2">Użytkownicy</h2>

    <div>
      <p v-if="loading">Ładowanie użytkowników...</p>

      <p v-else-if="uzytkownicy.length === 0">Brak użytkowników do wyświetlenia.</p>

      <ul v-else class="user-list list-none space-y-3 p-0">
        <li
          v-for="user in uzytkownicy"
          :key="user.id"
          class="p-3 border border-surface-200 rounded-lg transition-shadow duration-200 hover:shadow-md cursor-pointer"
        >
          <div class="flex align-items-center gap-3">
            <img
              :src="user.profilePhoto || '/default-avatar.png'"
              :alt="`Zdjęcie profilowe ${user.username}`"
              class="w-2rem h-2rem rounded-full object-cover flex-shrink-0"
            />

            <div class="flex flex-column">
              <div class="font-semibold text-surface-900 truncate">
                {{ user.username || 'Anonimowy' }}
              </div>

              <div class="text-sm text-surface-500">
                {{ user.mainRole || 'Brak Roli' }}
              </div>
            </div>
          </div>
        </li>
      </ul>

      <p v-if="error" class="error-message">Wystąpił błąd: {{ error }}</p>
    </div>
  </div>
</template>

<style>
/* ... Twoje style ... */
.moj-tablist :deep(.p-tablist-action.p-highlight) {
  background-color: #008cba !important;
  color: #ffffff !important;
  border-color: #008cba !important;
}

.moj-tablist :deep(.p-tablist-action:not(.p-highlight):hover) {
  color: #008cba;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

.reels {
  width: 20%;
  height: 12rem;
  border-radius: 1rem;
  border: #191c31 1px solid;
}

.user-menu-primevue-container {
  display: inline-block;
  /* Zapewnia, że jest miejsce na Menu, które jest renderowane jako nakładka */
}

/* Dostosowanie przycisku PrimeVue */
.primevue-menu-toggle {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}

/* Wyrównanie wewnątrz przycisku */
.user-info-display {
  display: flex;
  align-items: center;
  margin-right: 0.5rem; /* Odstęp między nazwą a ikoną strzałki */
}

.username-display {
  font-weight: 500;
  font-size: 15px;
  margin-left: 0.5rem;
}
</style>
