<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useCommunity } from '@/composables/useCommunity'
import { computed } from 'vue'

const props = defineProps<{
  user: {
    id: string
    username: string
    sex: string
    avatar_url: string | null
    birth_date: string | null
    city: string | null
  }
}>()

const avatarSrc = computed(() => {
  if (props.user.avatar_url) return props.user.avatar_url
  if (props.user.sex === 'female') return 'avatars/default_female_avatar.jpg'
  if (props.user.sex === 'male') return 'avatars/default_male_avatar.jpg'
  return 'avatars/default_neutral_avatar.jpg'
})

const { calculateAge } = useCommunity()
</script>

<template>
  <RouterLink :to="{ name: 'user-profile', params: { username: user.username } }">
    <Card
      class="group animate-fade-in cursor-pointer border-white/5 bg-zinc-900/50 transition-all hover:border-rose-500/30 hover:bg-zinc-800/50 hover:shadow-xl hover:shadow-rose-900/10"
    >
      <CardContent class="flex flex-col items-center p-4 text-center">
        <Avatar
          class="h-20 w-20 border-2 border-rose-500/20 shadow-xl transition-transform group-hover:scale-105"
        >
          <AvatarImage :src="avatarSrc" />
          <AvatarFallback>{{ user.username.charAt(0) }}</AvatarFallback>
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
  </RouterLink>
</template>
