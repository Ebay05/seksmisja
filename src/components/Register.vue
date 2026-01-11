<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>

<template>
      <nav class="flex items-center justify-between py-8 px-20 w-full">
      <RouterLink to="/">  
        <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10">
        </RouterLink>    </nav>

    <div class="flex flex-col justify-center items-center flex-1 py-10 px-12 text-center w-full">
      <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
        Rejestracja
      </h2>
      <p class="mx-auto mb-10 max-w-[600px] text-xl text-muted-foreground">
        Jeden krok dzieli cię od niezwykłej przygody
      </p>
        
      <div class="mx-auto flex flex-col gap-5 w-full max-w-md items-center space-x-2">
        <Input type="email" placeholder="Wpisz email" class="h-10" />
        <Input type="username" placeholder="Wpisz nazwę użytkownika" class="h-10" />
        <Input type="password" placeholder="Stwórz hasło" class="h-10" />
        <Input type="confirmPass" placeholder="Powtórz hasło" class="h-10" />
        <Button type="submit" size="lg" class="bg-rose-950 text-rose-500 hover:text-white">Zarejestruj</Button>
      </div>

    </div>

    <footer class="py-8 px-20 w-full">
      <!-- <h2>Stopka</h2> -->
    </footer>
</template>