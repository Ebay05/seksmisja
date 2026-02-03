<script setup lang="ts">
import { onMounted } from 'vue'
import { useFriends } from '@/composables/useFriends'
import { useCommunity } from '@/composables/useCommunity'

const { friends, loadingFriends, loadFriends } = useFriends()
const { userProfile, fetchProfile } = useCommunity()

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { RouterLink } from 'vue-router'

onMounted(() => {
  fetchProfile()
  loadFriends()
})
</script>

<template>
  <div class="h-full w-full rounded-3xl border border-white/10 bg-zinc-900 p-4">
    <!-- Current User -->
    <RouterLink to="/app/ustawienia/profil">
      <div class="flex items-center gap-3 px-2 py-1.5">
        <Avatar class="h-9 w-9 border border-white/10">
          <AvatarImage
            v-if="userProfile?.avatar_url"
            :src="userProfile.avatar_url"
            :alt="userProfile.username"
          />

          <!-- POPRAWKA TUTAJ -->
          <AvatarFallback>
            {{ userProfile?.username?.charAt(0)?.toUpperCase() || '?' }}
          </AvatarFallback>
        </Avatar>

        <div class="flex flex-col items-start overflow-hidden">
          <span class="w-full truncate text-sm font-semibold text-white">
            {{ userProfile?.username || 'Ładowanie...' }}
          </span>
          <span class="truncate text-xs text-gray-400 capitalize">
            {{ userProfile?.role }}
          </span>
        </div>
      </div>
    </RouterLink>

    <h2 class="mt-4 mb-2 text-lg font-semibold text-white">Kontakty</h2>

    <div v-if="loadingFriends">Ładowanie...</div>

    <div v-else-if="friends.length === 0">
      <p>Brak znajomych</p>
    </div>

    <div v-else>
      <div v-for="friend in friends" :key="friend.id" class="flex items-center gap-3">
        <Avatar>
          <AvatarImage v-if="friend.avatar_url" :src="friend.avatar_url" />
          <AvatarFallback>
            {{ friend.username?.charAt(0)?.toUpperCase() || '?' }}
          </AvatarFallback>
        </Avatar>

        <span>{{ friend.username || 'Nieznany użytkownik' }}</span>
      </div>
    </div>
  </div>
</template>
