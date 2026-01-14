<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref, computed } from "vue";
import { supabase } from "@/lib/supabaseClient";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Eye, EyeOff } from "lucide-vue-next";

import maleAvatar from "https://ncpbptkitgswsudanyfj.supabase.co/storage/v1/object/public/avatars/default_male_avatar.jpg";
import femaleAvatar from "https://ncpbptkitgswsudanyfj.supabase.co/storage/v1/object/public/avatars/default_female_avatar.jpg";

const isRegisterVisible = ref(false);
const currentStep = ref("home");

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPass = ref("");
const isPasswordVisible = ref(false);
const isConfirmVisible = ref(false);
const sex = ref("M");
const birth_date = ref("");
const city = ref("");
const role = ref("Vanilla");
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
    return "/avatars/default_female_avatar.jpg";
  }
  return "/avatars/default_male_avatar.jpg";
};

// ADULT VALIDATION
const isAdult = computed(() => {
  if (!birth_date.value) return false;

  const today = new Date();
  const birth = new Date(birth_date.value);

  const ageLimit = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return birth <= ageLimit;
});

// CITY VALIDATION
const isCityValid = computed(() => {
  if (!city.value) return false;
  const cityRegex = /^[a-zA-ZĄ-ż\s]+$/;
  return cityRegex.test(city.value.trim());
});

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

  if (!isAdult.value) {
    alert("Rejestracja dozwolona tylko dla osób pełnoletnich.");
    return;
  }

  if (!isCityValid.value) {
    alert("Wprowadź poprawną nazwę miasta.");
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
        city: city.value,
        birth_date: birth_date.value,
        avatar_url: getAvatarUrl(),
        role: role.value,
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

// RESEND OTP
const cooldownSeconds = ref(0);
const cooldownInterval = ref<ReturnType<typeof setInterval> | null>(null);

const formattedCooldown = computed(() => {
  const m = Math.floor(cooldownSeconds.value / 60);
  const s = cooldownSeconds.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

const startCooldown = () => {
  cooldownSeconds.value = 300; // 5 minutes
  if (cooldownInterval.value) clearInterval(cooldownInterval.value);

  cooldownInterval.value = setInterval(() => {
    if (cooldownSeconds.value > 0) {
      cooldownSeconds.value--;
    } else {
      if (cooldownInterval.value) clearInterval(cooldownInterval.value);
    }
  }, 1000);
};

const resendOtp = async () => {
  if (cooldownSeconds.value > 0 || isLoading.value) return;

  isLoading.value = true;

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email.value,
  });

  if (error) {
    alert("Błąd: " + error.message);
  } else {
    alert("Nowy kod został wysłany!");
    startCooldown();

    isLoading.value = false;
  }
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

        <!-- Email Input -->
        <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5">
          <div class="w-full text-left">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400"
              >Email</label
            >
            <Input
              v-model="email"
              type="email"
              placeholder="Wpisz email"
              class="h-10"
            />
          </div>

          <!-- Username Input -->
          <div class="w-full text-left">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400"
              >Nazwa użytkownika</label
            >
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

          <!-- Password Input -->

          <div class="w-full text-left">
            <div class="flex items-center justify-between mb-1 ml-1 pr-1">
              <label class="text-[11px] text-gray-400">Hasło</label>

              <TooltipProvider :delayDuration="200">
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Info
                      :size="14"
                      class="text-rose-500 cursor-help opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="end"
                    class="max-w-[280px] border-white/10 bg-zinc-900 p-3 text-xs leading-relaxed text-gray-200 shadow-2xl"
                  >
                    <p>
                      <strong class="text-rose-500 block mb-1"
                        >Jak tworzyć silne hasła?</strong
                      >
                      Aby stworzyć silne i łatwe do zapamiętania hasło, wybierz
                      sobie wyraz np.
                      <span class="italic text-white">Samochod</span>, a
                      następnie zamień kilka liter na znaki specjalne oraz
                      cyfry, np.
                      <span
                        class="font-mono text-rose-400 bg-white/5 px-1 rounded"
                        >S@moch*d34</span
                      >
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div class="relative">
              <Input
                v-model="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder="Stwórz hasło"
                class="h-10 pr-10"
              />
              <button
                type="button"
                @click="isPasswordVisible = !isPasswordVisible"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-rose-500 transition-colors"
              >
                <component :is="isPasswordVisible ? EyeOff : Eye" :size="16" />
              </button>
            </div>

            <ul class="mt-2 ml-1 space-y-1 text-[11px] transition-all"></ul>
          </div>

          <!-- Confirm Password -->

          <div class="w-full text-left">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400"
              >Potwierdź hasło</label
            >
            <div class="relative">
              <Input
                v-model="confirmPass"
                :type="isConfirmVisible ? 'text' : 'password'"
                placeholder="Powtórz hasło"
                class="h-10 pr-10"
              />
              <button
                type="button"
                @click="isConfirmVisible = !isConfirmVisible"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-rose-500 transition-colors"
              >
                <component :is="isConfirmVisible ? EyeOff : Eye" :size="16" />
              </button>
            </div>

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

          <!-- Age & City -->

          <div class="text-left w-full">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400"
              >Miejscowość</label
            >
            <Input
              v-model="city"
              type="text"
              placeholder="Wpisz miejscowość"
              class="h-10"
              :class="
                city && !isCityValid ? 'border-red-500 focus:ring-red-500' : ''
              "
            />

            <p
              v-if="city && !isCityValid"
              class="mt-1 ml-1 text-[11px] text-red-500"
            >
              Nazwa miasta może zawierać tylko litery i spacje.
            </p>
          </div>

          <div class="text-left w-full">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400"
              >Data urodzenia</label
            >
            <Input
              v-model="birth_date"
              type="date"
              class="h-10"
              :class="
                birth_date && !isAdult
                  ? 'border-red-500 focus:ring-red-500'
                  : ''
              "
            />

            <p
              v-if="birth_date && !isAdult"
              class="mt-1 ml-1 text-[11px] text-red-500 animate-pulse"
            >
              Musisz mieć ukończone 18 lat, aby dołączyć.
            </p>
          </div>

          <!-- Sex Radio Buttons -->
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

    <!-- VERIFICATION CODE -->

    <div
      v-else-if="currentStep === 'otp'"
      key="otp"
      class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
    >
      <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
        Weryfikacja
      </h2>
      <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
        Wysłaliśmy kod na adres <br />
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

        <div class="flex flex-col items-center gap-2">
          <button
            @click="resendOtp"
            :disabled="cooldownSeconds > 0 || isLoading"
            class="text-sm transition-colors"
            :class="
              cooldownSeconds > 0
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-rose-500 hover:text-rose-400 font-semibold underline decoration-dotted'
            "
          >
            {{
              cooldownSeconds > 0
                ? `Wyślij ponownie za ${formattedCooldown}`
                : "Nie otrzymałeś kodu? Wyślij ponownie"
            }}
          </button>

          <button
            @click="currentStep = 'register'"
            class="text-muted-foreground text-xs hover:underline opacity-70"
          >
            Wróć do poprawy danych
          </button>
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
