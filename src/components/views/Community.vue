<script setup lang="ts">
import { onMounted } from 'vue'
import { useCommunity } from '@/composables/useCommunity'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { ImagePlus, Video, SmilePlus, Send } from 'lucide-vue-next'

/* -----------------------------------------------------
   COMMUNITY COMPOSABLE
----------------------------------------------------- */
const {
  userProfile,
  loadingProfile,
  newbies,
  loadingNewbies,
  loadingMore,
  hasMore,
  calculateAge,
  fetchProfile,
  fetchNewbiesPage,
} = useCommunity()

/* -----------------------------------------------------
   ACTION ICONS
----------------------------------------------------- */
const actions = [
  { title: 'Dodaj zdjęcie', icon: ImagePlus },
  { title: 'Dodaj wideo', icon: Video },
  { title: 'Dodaj emoji', icon: SmilePlus },
]

/* -----------------------------------------------------
   INFINITE SCROLL
----------------------------------------------------- */
import { ref, onBeforeUnmount } from 'vue'

const infiniteTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

/* -----------------------------------------------------
   ON MOUNT
----------------------------------------------------- */
onMounted(() => {
  fetchProfile()
  fetchProfile()
  fetchNewbiesPage()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loadingMore.value) {
        fetchNewbiesPage()
      }
    },
    { threshold: 1 },
  )

  if (infiniteTrigger.value) {
    observer.observe(infiniteTrigger.value)
  }
})

/* -----------------------------------------------------
   ON MOUNT
----------------------------------------------------- */

// Infinite Scroll
onBeforeUnmount(() => {
  if (observer && infiniteTrigger.value) {
    observer.unobserve(infiniteTrigger.value)
  }
})
</script>

<template>
  <div class="flex h-full w-full overflow-hidden">
    <!-- MAIN CONTENT -->
    <div class="flex w-full flex-1 flex-col items-center overflow-y-auto p-8">
      <Tabs default-value="news" class="flex w-3/4 flex-col items-center">
        <TabsList class="mb-6">
          <TabsTrigger value="news">Aktualności</TabsTrigger>
          <TabsTrigger value="live">Kamerki</TabsTrigger>
          <TabsTrigger value="searcher">Wyszukiwarka</TabsTrigger>
          <TabsTrigger value="listings">Ogłoszenia</TabsTrigger>
          <TabsTrigger value="viewers">Obserwujący</TabsTrigger>
          <TabsTrigger value="newbies">Nowi</TabsTrigger>
        </TabsList>

        <!-- -----------------------------------------------------
             NEWS
        ----------------------------------------------------- -->
        <TabsContent value="news" class="mt-0 w-3/4">
          <h2 class="mb-6 text-2xl font-bold text-white">Aktualności</h2>

          <Card class="border-white/10 bg-zinc-800/20">
            <CardContent class="flex items-center gap-4">
              <!-- PROFILE AVATAR -->
              <Avatar
                v-if="!loadingProfile"
                class="h-12 w-12 border-2 border-rose-500/50 shadow-lg"
              >
                <AvatarImage :src="userProfile?.avatar_url || ''" />
                <AvatarFallback>
                  {{ userProfile?.username?.charAt(0) || '?' }}
                </AvatarFallback>
              </Avatar>

              <!-- SKELETON AVATAR -->
              <div v-else class="h-12 w-12 animate-pulse rounded-full bg-zinc-700/40"></div>

              <!-- TEXTAREA -->
              <textarea
                placeholder="O czym teraz myślisz?"
                class="h-12 min-h-[48px] flex-1 resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-rose-500/50 focus:outline-none"
              ></textarea>

              <!-- SEND BUTTON -->
              <button
                class="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-800 bg-rose-950 text-rose-600 shadow-lg transition-all hover:scale-105 hover:bg-rose-800 hover:text-white active:scale-95"
              >
                <Send :size="18" />
              </button>

              <!-- ACTION ICONS -->
              <div class="flex items-center gap-3 px-2">
                <button
                  v-for="action in actions"
                  :key="action.title"
                  class="text-gray-400 transition-colors hover:text-rose-500"
                >
                  <component :is="action.icon" :size="20" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <!-- -----------------------------------------------------
     NEWBIES — PREMIUM UX + INFINITE SCROLL
----------------------------------------------------- -->
        <TabsContent value="newbies" class="mt-0 w-full lg:w-3/4">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">Nowi użytkownicy</h2>
            <span class="text-xs text-gray-500">Ładowanie dynamiczne</span>
          </div>

          <!-- SKELETON GRID -->
          <div
            v-if="loadingNewbies"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="n in 12"
              :key="n"
              class="flex animate-pulse flex-col items-center rounded-xl bg-zinc-800/40 p-4"
            >
              <div class="mb-4 h-20 w-20 rounded-full bg-zinc-700/40"></div>
              <div class="mb-2 h-4 w-24 rounded bg-zinc-700/40"></div>
              <div class="h-3 w-16 rounded bg-zinc-700/40"></div>
            </div>
          </div>

          <!-- USERS GRID -->
          <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card
              v-for="user in newbies"
              :key="user.id"
              class="group animate-fade-in border-white/5 bg-zinc-900/50 transition-all hover:border-rose-500/30 hover:bg-zinc-800/50 hover:shadow-xl hover:shadow-rose-900/10"
            >
              <CardContent class="flex flex-col items-center p-4 text-center">
                <Avatar
                  class="h-20 w-20 border-2 border-rose-500/20 shadow-xl transition-transform group-hover:scale-105"
                >
                  <AvatarImage
                    :src="user.avatar_url || ''"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                  />
                  <AvatarFallback>
                    {{ user.username.charAt(0) }}
                  </AvatarFallback>
                </Avatar>

                <div class="mt-4">
                  <h3 class="font-bold text-white">{{ user.username }}</h3>
                  <p class="text-xs text-gray-400">
                    {{ calculateAge(user.birth_date) || '?' }} lat,
                    {{ user.city || '?' }}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- INFINITE SCROLL OBSERVER -->
          <div
            v-if="hasMore"
            ref="infiniteTrigger"
            class="mt-6 flex h-10 w-full items-center justify-center"
          >
            <div
              v-if="loadingMore"
              class="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent"
            ></div>
          </div>

          <!-- NO MORE USERS -->
          <p v-if="!hasMore && newbies.length > 0" class="mt-6 text-center text-sm text-gray-500">
            To już wszyscy nowi użytkownicy
          </p>
        </TabsContent>
      </Tabs>
    </div>

    <!-- SIDEBAR -->
    <div class="hidden h-full w-80 p-8 lg:block">
      <div class="h-full rounded-3xl border border-white/20 p-6">
        <h2 class="mb-4 text-lg font-semibold text-white">Kontakty</h2>
        <p class="text-sm text-gray-500 italic">Brak aktywnych kontaktów</p>
      </div>
    </div>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
