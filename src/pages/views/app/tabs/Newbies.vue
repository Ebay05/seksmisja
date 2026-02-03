<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCommunity } from '@/composables/useCommunity'
import UserCard from '@/components/UserCard.vue'

const { newbies, loadingNewbies, loadingMore, hasMore, fetchNewbiesPage } = useCommunity()

const infiniteTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
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
  <div class="mb-6 flex items-center justify-between">
    <h2 class="text-2xl font-medium text-white">Nowi użytkownicy</h2>
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
    <UserCard v-for="user in newbies" :key="user.id" :user="user" />
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
</template>
