<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const isRegisterVisible = ref(false)

const email = ref('')
const username = ref('')
const password = ref('')
const confirmPass = ref('')
const isLoading = ref(false)

// FIRST REGISTER INPUT
const handleRegister = () => {
  isLoading.value = false

  if (email.value.trim() !== '' && email.value.includes('@')) {
    isRegisterVisible.value = true
  } else {
    alert('Proszę podać prawidłowy adres e-mail.')
  }
}

// TO DATABASE
const submitToSupabase = async () => {
  // Pass Validation
  isLoading.value = true

  if (password.value !== confirmPass.value) {
    alert("Hasła nie są identyczne!")
    return
  }

  if (password.value.length < 6) {
    alert("Hasło musi mieć minimum 6 znaków")
    return
  }

  // Supabase Auth Registration
const { error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value,
  options: {
    data: {
      display_name: username.value,
    }
  }
})
  if (error) {
    alert("Błąd: " + error.message)
  } else {
    alert("Rejestracja pomyślna! Sprawdź maila lub zaloguj się.")
    isRegisterVisible.value = false // Back to homepage
  }
}

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





    <Transition name="fade" mode="out-in">
  <div v-if="!isRegisterVisible" key="home"> 
      <div v-if="!isRegisterVisible" class="flex flex-col justify-center items-center flex-1 py-10 px-12 text-center w-full">
      <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
        Wyrusz na swoją <br/>
        <span class="text-primary">seksmisję!</span>
      </h2>
      <p class="mx-auto mb-10 max-w-[600px] text-xl text-muted-foreground">
        Odkryj swoje najskrytsze fantazje i znajdź idealny seks układ.
      </p>
        
      <div class="mx-auto flex w-full max-w-md items-center space-x-2">
        <Input type="email" placeholder="Wpisz swój e-mail..." class="h-10" v-model="email"/>

        <!-- REGISTER BUTTON -->
      <Button 
  type="button" 
  size="lg" 
  class="bg-rose-950 text-rose-500 hover:text-white" 
  @click="handleRegister"
>
  Zarejestruj
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
  </div>
  <div v-else key="register"> 
      <!-- REGISTER SECTION -->
    <div v-if="isRegisterVisible" class="flex flex-col justify-center items-center flex-1 py-10 px-12 text-center w-full">
<div class="w-full flex items-center justify-between">
        <button 
  @click="isRegisterVisible = false" 
  class="text-sm text-muted-foreground hover:text-primary mt-4 transition-colors"
>
  ← Wróć do strony głównej
</button>
<div>
        <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
        Rejestracja
      </h2>
      <p class="mx-auto mb-10 max-w-[600px] text-xl text-muted-foreground">
        Jeden krok dzieli cię od niezwykłej przygody
      </p>
</div>
</div>
        
      <div class="mx-auto flex flex-col gap-5 w-full max-w-md items-center space-x-2">
        <Input type="email" placeholder="Wpisz email" class="h-10" v-model="email"/>
        <Input v-model="username" type="text" placeholder="Wpisz nazwę użytkownika" />
        <Input type="password" placeholder="Stwórz hasło" class="h-10" v-model="password"/>
        <Input type="confirmPass" placeholder="Powtórz hasło" class="h-10" v-model="confirmPass"/>
        <Button type="submit" size="lg" class="bg-rose-950 text-rose-500 hover:text-white" :disabled="isLoading" @click="submitToSupabase">{{ isLoading ? 'Przetwarzanie...' : 'Zarejestruj' }}</Button>
      </div>

    </div>  
  </div>
</Transition>

    <footer class="py-8 px-20 w-full">
      <!-- <h2>Stopka</h2> -->
    </footer>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>