<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>

<template>
  <nav class="flex w-full items-center justify-between px-20 py-8">
    <RouterLink to="/">
      <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10" />
    </RouterLink>
  </nav>

  <div class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center">
    <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">Logowanie</h2>
    <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">Witaj ponownie!</p>

    <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5 space-x-2">
      <Input type="username" placeholder="Wpisz nazwę użytkownika" class="h-10" />
      <Input type="password" placeholder="Stwórz hasło" class="h-10" />
      <Button type="submit" size="lg" class="bg-rose-950 text-rose-500 hover:text-white"
        >Zaloguj się</Button
      >
    </div>
  </div>

  <footer class="w-full px-20 py-8">
    <!-- <h2>Stopka</h2> -->
  </footer>
</template>
