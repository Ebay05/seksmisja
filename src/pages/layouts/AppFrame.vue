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

import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-vue-next'

import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import { sidebarItems } from '@/config/sidebarItems'
import { useUserProfile } from '@/composables/useUserProfile'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

// Helper: whether we should hide the app sidebar (set via route meta)
const hideAppSidebar = computed(() =>
  route.matched.some((r) => (r.meta as any)?.hideAppSidebar === true),
)

// Helper: active route detection
const isActive = (path: string) => route.path.startsWith(path)

// Logout handler: calls composable and routes to login on success
const handleLogout = async () => {
  try {
    const ok = await logout()
    if (ok) {
      await router.push({ name: 'login' })
    } else {
      // simple feedback — could be replaced with toast
      console.error('Wylogowanie nie powiodło się')
    }
  } catch (err) {
    console.error('Error during logout', err)
  }
}
</script>

<template>
  <SidebarProvider>
    <Sidebar v-if="!hideAppSidebar" class="sticky z-30 h-screen overflow-y-auto p-4">
      <!-- ----------------------------------------------------- -->
      <!-- --------------------- SIDEBAR MAIN ------------------ -->
      <!-- ----------------------------------------------------- -->
      <SidebarContent>
        <SidebarGroup class="gap-5">
          <SidebarGroupLabel class="flex h-10 w-full justify-center">
            <RouterLink to="/app/community">
              <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10" />
            </RouterLink>
          </SidebarGroupLabel>

          <!-- --------------------- MENU ------------------------ -->
          <SidebarGroupContent>
            <SidebarMenu class="gap-3">
              <SidebarMenuItem v-for="item in sidebarItems" :key="item.title">
                <RouterLink :to="item.path">
                  <Button
                    variant="ghost"
                    :class="[
                      'h-11 w-full justify-start gap-4 rounded-lg transition-all',
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              @click="handleLogout"
              class="h-11 w-full justify-start gap-4 rounded-lg px-4 text-gray-400 transition-all hover:bg-rose-600 hover:text-white"
            >
              <LogOut :size="24" />
              <span class="text-base font-medium">Wyloguj się</span>
            </Button>
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
            <div class="h-full w-full">
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
