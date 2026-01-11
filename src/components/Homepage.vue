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
// TO DATABASE
const submitToSupabase = async () => {
  // Pass Validation
  const usernameRegex = /^(?=[^0-9])(?=(.*[a-zA-Z]){3,})[a-zA-Z0-9_ ]+$/
  const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

  if (
    !usernameRegex.test(username.value) ||
    !strongPasswordRegex.test(password.value) ||
    password.value !== confirmPass.value
  ) {
    alert('Proszę spełnić wszystkie wymagania formularza.')
    return
  }

  isLoading.value = true

  if (!usernameRegex.test(username.value)) {
    alert(
      'Nazwa użytkownika jest nieprawidłowa! Nie może zaczynać się od cyfry, musi mieć min. 3 litery i może zawierać tylko spacje oraz podkreślnik (_).',
    )
    isLoading.value = false
    return
  }

  if (password.value !== confirmPass.value) {
    alert('Hasła nie są identyczne!')
    isLoading.value = false
    return
  }

  const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

  if (!strongPasswordRegex.test(password.value)) {
    alert(
      'Hasło jest za słabe! Musi mieć min. 8 znaków, zawierać literę, cyfrę oraz znak specjalny.',
    )
    isLoading.value = false
    return
  }

  // Supabase Auth Registration
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        display_name: username.value,
      },
    },
  })
  if (error) {
    alert('Błąd: ' + error.message)
    isLoading.value = false
  } else {
    alert('Rejestracja pomyślna! Sprawdź maila lub zaloguj się.')
    isRegisterVisible.value = false // Back to homepage
    isLoading.value = false
  }

  isLoading.value = false
}
</script>

<template>
  <nav class="flex w-full items-center justify-between px-20 py-8">
    <RouterLink to="/">
      <img src="/src/assets/seksmisja-logo-main.svg" alt="Logo Seksmisja" class="h-10" />
    </RouterLink>
    <Button variant="outline" as-child>
      <RouterLink to="/logowanie">Zaloguj</RouterLink>
    </Button>
  </nav>

  <Transition name="fade" mode="out-in">
    <div v-if="!isRegisterVisible" key="home">
      <div
        v-if="!isRegisterVisible"
        class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
      >
        <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
          Wyrusz na swoją <br />
          <span class="text-primary">seksmisję!</span>
        </h2>
        <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
          Odkryj swoje najskrytsze fantazje i znajdź idealny seks układ.
        </p>

        <div class="mx-auto flex w-full max-w-md items-center space-x-2">
          <Input type="email" placeholder="Wpisz swój e-mail..." class="h-10" v-model="email" />

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
        <div class="mt-20 flex flex-col flex-wrap items-stretch justify-center gap-6 md:flex-row">
          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img src="/src/assets/subtitles.svg" alt="" width="32px" height="32px" />
            <!-- <h3 class="mb-2 font-bold text-lg">Bez limitów</h3> -->
            <p class="text-md text-muted-foreground pt-4">
              Korzystanie z portalu jest całkowicie bezpłatne i nie nakładamy żadnych limitów na
              liczbę wiadomości.
            </p>
          </div>

          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img src="/src/assets/shield.svg" alt="" width="32px" height="32px" />
            <!-- <h3 class="mb-2 font-bold text-lg">Pełna prywatność</h3> -->
            <p class="text-md text-muted-foreground pt-4">
              Chronimy Twoje dane, zdjęcia i filmy – Twój content jest zawsze pod pełną kontrolą.
              Twoja prywatność to nasz priorytet.
            </p>
          </div>

          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img src="/src/assets/layout-dashboard.svg" alt="" width="32px" height="32px" />
            <!-- <h3 class="mb-2 font-bold text-lg">Intuicyjny UI</h3> -->
            <p class="text-md text-muted-foreground pt-4">
              Doskonalimy interfejs użytkownika tak, aby był nie tylko przejrzysty, ale i intuicyjny
              w obsłudze.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else key="register">
      <!-- REGISTER SECTION -->
      <div
        v-if="isRegisterVisible"
        class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
      >
        <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">Rejestracja</h2>
        <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
          Jeden krok dzieli cię od niezwykłej przygody
        </p>

        <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5">
          <Input v-model="email" type="email" placeholder="Wpisz email" class="h-10" />

          <div class="w-full text-left">
            <Input
              v-model="username"
              type="text"
              placeholder="Wpisz nazwę użytkownika"
              class="h-10"
            />
            <ul class="mt-2 ml-1 space-y-1 text-[11px]">
              <li
                :class="
                  username.length >= 3 && /[a-zA-Z]{3,}/.test(username)
                    ? 'text-green-500'
                    : 'text-muted-foreground'
                "
              >
                • Minimum 3 litery
              </li>
              <li
                :class="
                  username.length > 0 && /^[^\d]/.test(username)
                    ? 'text-green-500'
                    : 'text-muted-foreground'
                "
              >
                • Nie może zaczynać się od cyfry
              </li>
              <li
                :class="
                  username.length > 0 && /^[a-zA-Z0-9_ ]+$/.test(username)
                    ? 'text-green-500'
                    : 'text-muted-foreground'
                "
              >
                • Tylko litery, cyfry, spacja i podkreślnik (_)
              </li>
            </ul>
          </div>

          <div class="w-full text-left">
            <Input v-model="password" type="password" placeholder="Stwórz hasło" class="h-10" />
            <ul class="mt-2 ml-1 space-y-1 text-[11px]">
              <li :class="password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'">
                • Minimum 8 znaków
              </li>
              <li :class="/\d/.test(password) ? 'text-green-500' : 'text-muted-foreground'">
                • Przynajmniej jedna cyfra
              </li>
              <li
                :class="
                  /[!@#$%^&*(),.?&quot;:{}|<>]/.test(password)
                    ? 'text-green-500'
                    : 'text-muted-foreground'
                "
              >
                • Przynajmniej jeden znak specjalny
              </li>
            </ul>
          </div>

          <div class="w-full text-left">
            <Input v-model="confirmPass" type="password" placeholder="Powtórz hasło" class="h-10" />
            <p
              v-if="confirmPass && password !== confirmPass"
              class="mt-1 ml-1 text-[11px] text-red-500"
            >
              Hasła muszą być identyczne
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            class="w-full bg-rose-950 text-rose-500 hover:text-white"
            @click="submitToSupabase"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Tworzenie konta...' : 'Zarejestruj' }}
          </Button>
        </div>
      </div>
    </div>
  </Transition>

  <footer class="w-full px-20 py-8">
    <!-- <h2>Stopka</h2> -->
  </footer>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
