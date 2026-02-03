<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useCommunity } from '@/composables/useCommunity'
import { useFriends } from '@/composables/useFriends'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

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
  fetchProfile,
  fetchNewbiesPage,
} = useCommunity()

/* -----------------------------------------------------
   FRIENDS
----------------------------------------------------- */
const { loadFriends } = useFriends()

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
const infiniteTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  fetchProfile()
  fetchNewbiesPage()
  loadFriends()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && hasMore.value && !loadingMore.value) {
        fetchNewbiesPage()
      }
    },
    { threshold: 1 },
  )

  if (infiniteTrigger.value) {
    observer.observe(infiniteTrigger.value)
  }
})

onBeforeUnmount(() => {
  if (observer && infiniteTrigger.value) {
    observer.unobserve(infiniteTrigger.value)
  }
})
</script>

<template>
  <h2 class="mb-6 text-2xl font-medium text-white">Aktualności</h2>

  <Card class="border-white/10 bg-zinc-800/20">
    <CardContent class="flex items-center gap-4">
      <!-- PROFILE AVATAR -->
      <Avatar v-if="!loadingProfile" class="h-12 w-12 border-2 border-rose-500/50 shadow-lg">
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
</template>
