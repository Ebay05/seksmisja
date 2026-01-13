<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button' // DODANO IMPORT
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MessageCircleMore, HeartPlus, Library, Gem, Users, LogOut } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Sidebar Sections
const items = [
  { title: 'Społeczność', path: '/app/community', icon: Users },
  { title: 'Czat', path: '/app/chat', icon: MessageCircleMore },
  { title: 'Polubienia', path: '/app/likes', icon: HeartPlus },
  { title: 'Forum', path: '/app/forum', icon: Library },
  { title: 'Premium', path: '/app/premium', icon: Gem },
]

const userProfile = ref<{
  username: string
  email: string
  sex: string
  avatar_url: string
  role: string
} | null>(null)

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/logowanie')
}

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session?.user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, email, sex, avatar_url, role')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error('Błąd pobierania profilu:', error.message)
      return
    }

    userProfile.value = data
    console.log('Pobrano profil:', data)
  } else {
  }
})
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <!-- ----------------------------------------------------- -->
      <!-- ---------------------SIDEBAR MAIN-------------------- -->
      <!-- ----------------------------------------------------- -->
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel class="my-5 flex w-full justify-center p-4">
            <RouterLink to="/app">
              <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10" />
            </RouterLink>
          </SidebarGroupLabel>
          <!-- ----------------------------------------------------- -->
          <!-- ---------------------ICONS--------------------------- -->
          <!-- ----------------------------------------------------- -->
          <SidebarGroupContent>
            <SidebarMenu class="gap-2">
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <router-link :to="item.path">
                  <Button
                    variant="ghost"
                    :class="[
                      'h-11 w-full justify-start gap-4 rounded-lg px-4 transition-all',
                      route.path === item.path
                        ? 'bg-rose-900/50 text-rose-500'
                        : 'text-gray-400 hover:bg-rose-600 hover:text-white',
                    ]"
                  >
                    <component :is="item.icon" :size="24" />
                    <span class="text-base font-medium">{{ item.title }}</span>
                  </Button>
                </router-link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <!-- ----------------------------------------------------- -->
      <!-- ---------------------FOOTER------------------------- -->
      <!-- ----------------------------------------------------- -->
      <SidebarFooter class="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div class="flex items-center gap-3 px-2 py-1.5">
              <Avatar class="h-9 w-9 border border-white/10">
                <AvatarImage
                  v-if="userProfile?.avatar_url"
                  :src="userProfile.avatar_url"
                  :alt="userProfile.username"
                />

                <AvatarFallback class="bg-rose-950 font-bold text-rose-500">
                  {{ userProfile?.username ? userProfile.username.charAt(0).toUpperCase() : '?' }}
                </AvatarFallback>
              </Avatar>

              <div class="flex flex-col items-start overflow-hidden">
                <span class="truncate text-sm font-semibold text-white">
                  {{ userProfile?.username || 'Ładowanie...' }}
                </span>
                <span class="truncate text-xs text-gray-400 capitalize">
                  {{ userProfile?.role }}
                </span>
              </div>
            </div>

            <SidebarMenuButton
              @click="handleLogout"
              class="mt-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut class="h-4 w-4" />
              <span>Wyloguj się</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    <!-- ----------------------------------------------------- -->
    <!-- ---------------------CONTENT------------------------- -->
    <!-- ----------------------------------------------------- -->
    <SidebarInset>
      <main class="h-full flex-1 overflow-y-auto">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
