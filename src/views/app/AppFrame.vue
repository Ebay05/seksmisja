<script setup lang="ts">
import Menu from 'primevue/menu'
import Button from 'primevue/button'

import Badge from 'primevue/badge'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'Społeczność',
    items: [
      {
        label: 'Aktualności',
        icon: 'pi pi-comments',
        to: '/app/news',
      },
      {
        label: 'Czat',
        icon: 'pi pi-comments',
        to: '/app/czat',
      },
      {
        label: 'Polubienia',
        icon: 'pi pi-heart',
        to: '/app/polubienia',
      },
      {
        label: 'Forum',
        icon: 'pi pi-users',
        to: '/app/forum',
      },
      {
        label: 'Premium',
        icon: 'pi pi-star-fill',
        to: '/app/premium',
      },
    ],
  },
  {
    label: '',
    items: [
      {
        label: 'Tryb Jasny',
        icon: 'pi pi-sun',
      },
      {
        label: 'Wysoki Kontrast',
        icon: 'pi pi-comments',
      },
      {
        separator: true,
      },
    ],
  },
])

const logout = () => {
  localStorage.removeItem('loggedUser')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex h-screen w-screen">
    <!-- Sidebar -->
    <Menu
      :model="items"
      class="w-1 md:w-60 border-none border-noround surface-ground p-4 flex flex-column"
    >
      <!-- Logo -->
      <template #start>
        <div class="mb-4">
          <img src="../../assets/svg/seksmisja-logo-main.svg" alt="Seksmisja" class="mb-3" />
        </div>
      </template>

      <!-- Buttons -->
      <template #submenulabel="{ item }">
        <span class="text-300 font-semibold uppercase" style="letter-spacing: 10%">{{
          item.label
        }}</span>
      </template>
      <template #item="{ item, props }">
        <router-link
          v-ripple
          :to="item.to"
          class="flex align-items-center cursor-pointer p-3 border-round`"
          v-bind="props.action"
        >
          <span :class="[item.icon, 'mr-2']" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        </router-link>
      </template>

      <!-- Bottom / Log out -->
      <template #end>
        <Button
          label="Wyloguj"
          icon="pi pi-sign-out"
          severity="secondary"
          @click="logout"
          class="flex justify-content-evenly font-normal cursor-pointer p-3 border-none bg-transparent w-full hover:surface-200"
        />
      </template>
    </Menu>

    <!-- Content Area -->
    <div class="w-full surface-ground p-2">
      <div class="w-full bg-black-alpha-80 border-round-3xl h-full p-4 flex">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
