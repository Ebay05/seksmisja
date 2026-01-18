<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePublicUser } from '@/composables/usePublicUser'
import UserProfileHeader from './UserProfileHeader.vue'
import UserProfileStats from './UserProfileStats.vue'

const route = useRoute()
const username = route.params.username as string

const { user, loading, load } = usePublicUser()
load(username)
</script>

<template>
  <div class="space-y-8">
    <UserProfileHeader :user="user" v-if="!loading" />
    <UserProfileStats :user="user" v-if="!loading" />

    <div v-if="loading" class="text-center text-gray-400">Ładowanie profilu...</div>
  </div>
</template>
