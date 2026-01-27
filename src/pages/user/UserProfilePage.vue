<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFullUser } from '@/composables/useFullUser'
import UserProfileBasicInfo from '@/pages/user/UserProfileBasicInfo.vue'
import UserProfileDescription from './UserProfileDescription.vue'
import { Badge } from '@/components/ui/badge'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

/* -----------------------------------------------------
   COMMUNITY COMPOSABLE
----------------------------------------------------- */

const route = useRoute()
const username = route.params.username as string

const { user, age, loading, error, load } = useFullUser()
load(username)
console.log(user)
</script>

<template>
  <div class="flex h-full w-full justify-center overflow-y-auto py-12">
    <div class="flex w-3/4 gap-5">
      <!-- Left Side -->
      <div class="flex h-full w-1/4 flex-col justify-start">
        <!-- PROFILE AVATAR -->
        <Avatar
          v-if="user"
          class="mb-6 h-100 w-full rounded-4xl border-2 border-rose-500/20 shadow-xl"
        >
          <AvatarImage
            :src="user.avatar_url || '/avatars/default_neutral_avatar.jpg'"
            alt="User avatar"
            class="object-cover"
          />

          <AvatarFallback> {{ user?.username?.charAt(0)?.toUpperCase() || '?' }} </AvatarFallback>
        </Avatar>

        <UserProfileBasicInfo v-if="user" />
      </div>

      <!-- Right Side -->
      <div class="flex h-full w-3/4 flex-col justify-start">
        <div class="mb-6 flex items-center justify-between py-4">
          <h2 class="text-4xl font-semibold">
            <span class="text-rose-600">{{ user?.username }},</span> {{ age }}
          </h2>
          <Badge class="bg-lime-800 text-white"> Aktywny </Badge>
        </div>
        <UserProfileDescription v-if="user" :description="user.description" />
      </div>

      <div v-if="loading">Ładowanie profilu...</div>
      <div v-if="!loading && !user">Taki użytkownik nie istnieje.</div>
      <div v-if="!loading && error">{{ error }}</div>
    </div>
  </div>
</template>
