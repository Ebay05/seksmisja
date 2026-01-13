<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import { supabase } from "@/lib/supabaseClient";

import maleAvatar from "@/assets/default_male_avatar.jpg";
import femaleAvatar from "@/assets/default_female_avatar.jpg";

const isRegisterVisible = ref(false);
const currentStep = ref("home");

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPass = ref("");
const sex = ref("M");
const isLoading = ref(false);
const otpCode = ref("");

// FIRST REGISTER INPUT
const handleRegister = () => {
  if (email.value.trim() !== "" && email.value.includes("@")) {
    currentStep.value = "register";
  } else {
    alert("Proszę podać prawidłowy adres e-mail.");
  }
};

// FETCHING AVATAR URL
const getAvatarUrl = () => {
  if (sex.value === "K") {
    return femaleAvatar;
  }
  return maleAvatar;
};

// TO DATABASE
const submitToSupabase = async () => {
  // Pass Validation
  const usernameRegex = /^(?=[^0-9])(?=(.*[a-zA-Z]){3,})[a-zA-Z0-9_ ]+$/;

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!usernameRegex.test(username.value)) {
    return;
  }

  if (!strongPasswordRegex.test(password.value)) {
    return;
  }

  if (password.value !== confirmPass.value) {
    return;
  }

  isLoading.value = true;

  if (!usernameRegex.test(username.value)) {
    alert(
      "Nazwa użytkownika jest nieprawidłowa! Nie może zaczynać się od cyfry, musi mieć min. 3 litery i może zawierać tylko spacje oraz podkreślnik (_)."
    );
    isLoading.value = false;
    return;
  }

  if (password.value !== confirmPass.value) {
    alert("Hasła nie są identyczne!");
    isLoading.value = false;
    return;
  }

  // Supabase Auth Registration
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
        sex: sex.value,
        avatar_url: getAvatarUrl(),
      },
    },
  });

  if (error) {
    alert("Błąd: " + error.message);
    isLoading.value = false;
  } else {
    // Switch to OTP step after successful registration
    currentStep.value = "otp";
    isLoading.value = false;
  }

  isLoading.value = false;
};

// Function to verify the 8-digit OTP code
const verifyOtp = async () => {
  if (otpCode.value.length < 8) return;

  isLoading.value = true;

  // Supabase OTP Verification
  const { error } = await supabase.auth.verifyOtp({
    email: email.value,
    token: otpCode.value,
    type: "signup",
  });

  if (error) {
    alert("Błąd weryfikacji: " + error.message);
  } else {
    alert("Konto zweryfikowane pomyślnie!");
    currentStep.value = "home";
  }

  isLoading.value = false;
};
</script>

<template>
  <nav class="flex w-full items-center justify-between px-20 py-8">
    <RouterLink to="/">
      <img
        src="/src/assets/seksmisja-logo-main.svg"
        alt="Logo Seksmisja"
        class="h-10"
      />
    </RouterLink>
    <Button variant="outline" as-child>
      <RouterLink to="/logowanie">Zaloguj</RouterLink>
    </Button>
  </nav>

  <Transition name="fade" mode="out-in">
    <div v-if="currentStep === 'home'" key="home">
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
          <Input
            type="email"
            placeholder="Wpisz swój e-mail..."
            class="h-10"
            v-model="email"
          />

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
        <div
          class="mt-20 flex flex-col flex-wrap items-stretch justify-center gap-6 md:flex-row"
        >
          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img
              src="/src/assets/subtitles.svg"
              alt=""
              width="32px"
              height="32px"
            />
            <!-- <h3 class="mb-2 font-bold text-lg">Bez limitów</h3> -->
            <p class="text-md text-muted-foreground pt-4">
              Korzystanie z portalu jest całkowicie bezpłatne i nie nakładamy
              żadnych limitów na liczbę wiadomości.
            </p>
          </div>

          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img
              src="/src/assets/shield.svg"
              alt=""
              width="32px"
              height="32px"
            />
            <!-- <h3 class="mb-2 font-bold text-lg">Pełna prywatność</h3> -->
            <p class="text-md text-muted-foreground pt-4">
              Chronimy Twoje dane, zdjęcia i filmy – Twój content jest zawsze
              pod pełną kontrolą. Twoja prywatność to nasz priorytet.
            </p>
          </div>

          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img
              src="/src/assets/layout-dashboard.svg"
              alt=""
              width="32px"
              height="32px"
            />
            <!-- <h3 class="mb-2 font-bold text-lg">Intuicyjny UI</h3> -->
            <p class="text-md text-muted-foreground pt-4">
              Doskonalimy interfejs użytkownika tak, aby był nie tylko
              przejrzysty, ale i intuicyjny w obsłudze.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="currentStep === 'register'" key="register">
      <!-- REGISTER SECTION -->
      <div
        class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
      >
        <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
          Rejestracja
        </h2>
        <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
          Jeden krok dzieli cię od niezwykłej przygody
        </p>

        <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5">
          <Input
            v-model="email"
            type="email"
            placeholder="Wpisz email"
            class="h-10"
          />

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
            <Input
              v-model="password"
              type="password"
              placeholder="Stwórz hasło"
              class="h-10"
            />

            <ul class="mt-2 ml-1 space-y-1 text-[11px] transition-all">
              <li
                :class="
                  password.length >= 8
                    ? 'font-medium text-green-500'
                    : 'text-muted-foreground'
                "
              >
                {{ password.length >= 8 ? "✓" : "•" }} Minimum 8 znaków
              </li>
              <li
                :class="
                  /[a-z]/.test(password) && /[A-Z]/.test(password)
                    ? 'font-medium text-green-500'
                    : 'text-muted-foreground'
                "
              >
                {{
                  /[a-z]/.test(password) && /[A-Z]/.test(password) ? "✓" : "•"
                }}
                Małe i wielkie litery
              </li>
              <li
                :class="
                  /\d/.test(password)
                    ? 'font-medium text-green-500'
                    : 'text-muted-foreground'
                "
              >
                {{ /\d/.test(password) ? "✓" : "•" }} Przynajmniej jedna cyfra
              </li>
              <li
                :class="
                  /[!@#$%^&*(),.?&quot;:{}|<>]/.test(password)
                    ? 'font-medium text-green-500'
                    : 'text-muted-foreground'
                "
              >
                {{ /[!@#$%^&*(),.?&quot;:{}|<>]/.test(password) ? "✓" : "•" }}
                Znak specjalny (np. !, @, #, $)
              </li>
            </ul>
          </div>

          <div class="w-full text-left">
            <Input
              v-model="confirmPass"
              type="password"
              placeholder="Powtórz hasło"
              class="h-10"
            />
            <p
              v-if="confirmPass && password !== confirmPass"
              class="mt-1 ml-1 animate-pulse text-[11px] text-red-500"
            >
              Hasła nie są identyczne
            </p>
            <p
              v-if="
                confirmPass && password === confirmPass && password.length > 0
              "
              class="mt-1 ml-1 text-[11px] text-green-500"
            >
              ✓ Hasła są identyczne
            </p>
          </div>

          <div class="w-full text-left">
            <span class="mb-2 ml-1 block text-xs font-medium text-gray-400">
              Płeć
            </span>
            <div class="flex items-center gap-6 px-1">
              <label
                class="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <input
                  type="radio"
                  value="M"
                  v-model="sex"
                  class="h-4 w-4 border-gray-600 bg-zinc-800 text-rose-500 focus:ring-rose-500/50 accent-rose-500"
                />
                Mężczyzna
              </label>

              <label
                class="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <input
                  type="radio"
                  value="K"
                  v-model="sex"
                  class="h-4 w-4 border-gray-600 bg-zinc-800 text-rose-500 focus:ring-rose-500/50 accent-rose-500"
                />
                Kobieta
              </label>

              <label
                class="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <input
                  type="radio"
                  value="I"
                  v-model="sex"
                  class="h-4 w-4 border-gray-600 bg-zinc-800 text-rose-500 focus:ring-rose-500/50 accent-rose-500"
                />
                Inna
              </label>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            class="w-full bg-rose-950 text-rose-500 hover:text-white"
            @click="submitToSupabase"
            :disabled="isLoading"
          >
            {{ isLoading ? "Tworzenie konta..." : "Zarejestruj" }}
          </Button>
        </div>
      </div>
    </div>

    <div
      v-else-if="currentStep === 'otp'"
      key="otp"
      class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
    >
      <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
        Weryfikacja
      </h2>
      <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
        Wysłaliśmy 8-cyfrowy kod na adres <br />
        <span class="text-primary font-bold">{{ email }}</span>
      </p>

      <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5">
        <Input
          v-model="otpCode"
          type="text"
          maxlength="8"
          placeholder="00000000"
          class="h-12 text-center font-mono text-2xl tracking-[0.5em]"
        />

        <Button
          class="w-full bg-rose-950 text-rose-500 hover:text-white"
          @click="verifyOtp"
          :disabled="isLoading || otpCode.length < 8"
        >
          {{ isLoading ? "Weryfikacja..." : "Potwierdź kod" }}
        </Button>

        <button
          @click="currentStep = 'register'"
          class="text-muted-foreground text-sm hover:underline"
        >
          Wróć do poprawy danych
        </button>
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
