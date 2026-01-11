<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
      <nav class="flex items-center justify-between py-8 px-20 w-full">
      
      <RouterLink to="/">  
        <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10">
        </RouterLink>
      <Button variant="outline" as-child>
        <RouterLink to="/logowanie">Zaloguj</RouterLink>
      </Button>
    </nav>

    <div class="flex flex-col justify-center items-center flex-1 py-10 px-12 text-center w-full">
      <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
        Wyrusz na swoją <br/>
        <span class="text-primary">seksmisję!</span>
      </h2>
      <p class="mx-auto mb-10 max-w-[600px] text-xl text-muted-foreground">
        Odkryj swoje najskrytsze fantazje i znajdź idealny seks układ.
      </p>
        
      <div class="mx-auto flex w-full max-w-md items-center space-x-2">
        <Input type="email" placeholder="Wpisz swój e-mail..." class="h-10" />
      <Button as-child type="submit" size="lg" class="bg-rose-950 text-rose-500 hover:text-white">
          <RouterLink to="/rejestracja">Zarejestruj</RouterLink>
        </Button>
      </div>

      <!-- FEATURES -->
            <div class="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-6 mt-20">
        
        <div class="flex flex-col w-full md:w-[400px] rounded-xl border bg-card p-6 shadow-sm transition-hover hover:shadow-md items-center items-center">
          <img src="/src/assets/subtitles.svg" alt="" width="32px" height="32px">
          <!-- <h3 class="mb-2 font-bold text-lg">Bez limitów</h3> -->
          <p class="text-md text-muted-foreground pt-4">
            Korzystanie z portalu jest całkowicie bezpłatne i nie nakładamy żadnych limitów na liczbę wiadomości.
          </p>
        </div>

        <div class="flex flex-col w-full md:w-[400px] rounded-xl border bg-card p-6 shadow-sm transition-hover hover:shadow-md items-center">
                    <img src="/src/assets/shield.svg" alt="" width="32px" height="32px">
          <!-- <h3 class="mb-2 font-bold text-lg">Pełna prywatność</h3> -->
          <p class="text-md text-muted-foreground pt-4">
            Chronimy Twoje dane, zdjęcia i filmy – Twój content jest zawsze pod pełną kontrolą. Twoja prywatność to nasz priorytet.
          </p>
        </div>

        <div class="flex flex-col w-full md:w-[400px] rounded-xl border bg-card p-6 shadow-sm transition-hover hover:shadow-md items-center">
          <img src="/src/assets/layout-dashboard.svg" alt="" width="32px" height="32px">
          <!-- <h3 class="mb-2 font-bold text-lg">Intuicyjny UI</h3> -->
          <p class="text-md text-muted-foreground pt-4">
            Doskonalimy interfejs użytkownika tak, aby był nie tylko przejrzysty, ale i intuicyjny w obsłudze.
          </p>
        </div>

      </div>
    </div>

    <footer class="py-8 px-20 w-full">
      <!-- <h2>Stopka</h2> -->
    </footer>
</template>