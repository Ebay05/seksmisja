<script setup lang="ts">
import Menu from 'primevue/menu'
import Button from 'primevue/button'

import Badge from 'primevue/badge'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('loggedUser')
  router.push({ name: 'login' })
}

const topItems = ref([
  {
    label: '',
    items: [
      {
        label: 'Zwiń',
        icon: 'pi pi-arrow-left',
        command: {},
      },
    ],
  },
  {
    label: 'Ustawienia',
    items: [
      {
        label: 'Profil',
        icon: 'pi pi-face-smile',
        to: '/ustawienia',
        isRootLink: true,
      },
      {
        label: 'Ustawienia',
        icon: 'pi pi-cog',
        to: '/ustawienia/ogolne',
      },
      {
        label: 'Wygląd',
        icon: 'pi pi-palette',
        to: '/ustawienia/wyglad',
      },
      {
        label: 'Pomoc',
        icon: 'pi pi-info-circle',
        to: '/ustawienia/pomoc',
      },
      {
        label: 'Feedback',
        icon: 'pi pi-comment',
        to: '/ustawienia/feedback',
      },
      {
        label: 'Aktualizacje',
        icon: 'pi pi-fast-forward',
        to: '/ustawienia/aktualizacje',
      },
      {
        label: 'Premium',
        icon: 'pi pi-crown',
        to: '/ustawienia/premium',
      },
    ],
  },
])

const bottomItems = ref([
  {
    separator: true,
  },
  {
    label: 'Tryb Jasny',
    icon: 'pi pi-sun',
    command: {},
  },
  {
    label: 'Wysoki Kontrast',
    icon: 'pi pi-eye',
    command: {},
  },
  {
    label: 'Wyloguj się',
    icon: 'pi pi-sign-out',
    command: logout, // Użycie funkcji logout
  },
])
</script>
<template>
  <div class="flex justify-content h-screen w-screen">
    <Menu
      :model="topItems"
      class="w-2 md:w-60 border-none border-noround surface-ground p-4 flex flex-column justify-content-between overflow-y-scroll"
    >
      <template #start>
        <div class="flex justify-content-center align-items-center px-4 py-2">
          <a href="/app/news">
            <img src="../../../assets/svg/seksmisja-logo-main.svg" alt="Seksmisja"
          /></a>
        </div>
      </template>

      <template #submenulabel="{ item }">
        <span class="text-400 font-semibold uppercase" style="letter-spacing: 10%">{{
          item.label
        }}</span>
      </template>

      <template #item="{ item, props }">
        <router-link v-if="item.to" :to="item.to" custom v-slot="{ href, navigate, isActive }">
          <a
            v-ripple
            :href="href"
            @click="navigate"
            v-bind="props.action"
            :class="[
              'flex w-full align-items-center cursor-pointer border-round-xl',
              'hover:surface-50',
              {
                'active-link surface-100': item.isRootLink
                  ? isActive && $route.path === item.to
                  : isActive,
              },
            ]"
          >
            <div class="px-2 py-1">
              <span :class="[item.icon, 'mr-2']" />
              <span>{{ item.label }}</span>
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            </div>
          </a>
        </router-link>

        <a
          v-else
          v-ripple
          v-bind="props.action"
          class="flex w-full align-items-center cursor-pointer border-round-xl hover:surface-50"
        >
          <div class="px-2 py-1">
            <span :class="[item.icon, 'mr-2']" />
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </div>
        </a>
      </template>

      <template #end>
        <ul class="p-menu-list">
          <template v-for="(group, index) in bottomItems" :key="index">
            <li v-if="group.separator" class="p-menu-separator" role="separator"></li>
            <li v-else class="p-menuitem" role="none">
              <a
                v-ripple
                @click="group.command ? group.command() : null"
                class="flex w-full align-items-center cursor-pointer border-round-xl hover:surface-50"
              >
                <div class="">
                  <span :class="[group.icon, 'mr-2']" />
                  <span>{{ group.label }}</span>
                  <Badge v-if="group.badge" class="ml-auto" :value="group.badge" />
                </div>
              </a>
            </li>
          </template>
        </ul>
      </template>
    </Menu>

    <div class="w-full surface-ground p-2">
      <div class="w-full bg-black-alpha-80 border-round-3xl h-full p-4 flex overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style></style>
