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

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-vue-next'

import { useRoute, RouterLink, RouterView } from 'vue-router'
import { sidebarItems } from '@/config/sidebarItems'
import { useUserProfile } from '@/composables/useUserProfile'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { userProfile } = useUserProfile()
const { logout } = useAuth()

// Helper: active route detection
const isActive = (path: string) => route.path.startsWith(path)
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <!-- ----------------------------------------------------- -->
      <!-- --------------------- SIDEBAR MAIN ------------------ -->
      <!-- ----------------------------------------------------- -->
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel class="my-5 flex w-full justify-center p-4">
            <RouterLink to="/app/community">
              <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10" />
            </RouterLink>
          </SidebarGroupLabel>

          <!-- --------------------- MENU ------------------------ -->
          <SidebarGroupContent>
            <SidebarMenu class="gap-2">
              <SidebarMenuItem v-for="item in sidebarItems" :key="item.title">
                <RouterLink :to="item.path">
                  <Button
                    variant="ghost"
                    :class="[
                      'h-11 w-full justify-start gap-4 rounded-lg px-4 transition-all',
                      isActive(item.path)
                        ? 'bg-rose-900/50 text-rose-500'
                        : 'text-gray-400 hover:bg-rose-600 hover:text-white',
                    ]"
                  >
                    <component :is="item.icon" :size="24" />
                    <span class="text-base font-medium">
                      {{ item.title }}
                    </span>
                  </Button>
                </RouterLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <!-- ----------------------------------------------------- -->
      <!-- --------------------- FOOTER ------------------------ -->
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
              @click="logout"
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
    <!-- --------------------- CONTENT ------------------------ -->
    <!-- ----------------------------------------------------- -->
    <SidebarInset>
      <main class="h-full flex-1 overflow-y-auto">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div class="h-full w-full p-8">
              <component :is="Component" />
            </div>
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
