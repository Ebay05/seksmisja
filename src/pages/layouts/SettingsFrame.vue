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
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-vue-next'

import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { sidebarSettings } from '@/config/sidebarSettings'

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

// Active route helper
const isActive = (path: string) => route.path.startsWith(path)

// Logout handler
const handleLogout = async () => {
  try {
    const ok = await logout()
    if (ok) {
      await router.push({ name: 'login' })
    } else {
      console.error('Wylogowanie nie powiodło się')
    }
  } catch (err) {
    console.error('Error during logout', err)
  }
}
</script>

<template>
  <SidebarProvider>
    <!-- SIDEBAR -->
    <Sidebar class="relative sticky z-30 h-screen overflow-y-auto p-4">
      <SidebarContent>
        <SidebarGroup class="gap-5">
          <SidebarGroupLabel class="flex h-10 w-full justify-center">
            <RouterLink to="/app/community">
              <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10" />
            </RouterLink>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu class="gap-3">
              <SidebarMenuItem v-for="item in sidebarSettings" :key="item.title">
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
                    <component :is="item.icon" :size="22" />
                    <span class="text-base font-medium">{{ item.title }}</span>
                  </Button>
                </RouterLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

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

    <!-- CONTENT -->
    <SidebarInset class="relative z-0 p-8">
      <main class="h-full w-full overflow-y-auto">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div class="">
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
