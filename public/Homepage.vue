<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Eye, EyeOff } from "lucide-vue-next";

import { useRegister } from "@/composables/useRegister";
import { ref, computed } from "vue";

const {
  // state
  email,
  username,
  password,
  confirmPass,
  sex,
  birthDate,
  city,
  role,
  otpCode,
  isLoading,
  currentStep,
  cooldownSeconds,

  // validation
  isUsernameValid,
  isPasswordStrong,
  doPasswordsMatch,
  isCityValid,
  isAdult,
  isFormValid,

  // actions
  goToRegisterStep,
  submitRegistration,
  verifyOtp,
  resendOtp,
} = useRegister();

// UI helpers
const isPasswordVisible = ref(false);
const isConfirmVisible = ref(false);

const formattedCooldown = computed(() => {
  const m = Math.floor(cooldownSeconds.value / 60);
  const s = cooldownSeconds.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});
</script>

<template>
  <!-- NAVBAR -->
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

  <!-- MAIN CONTENT -->
  <Transition name="fade" mode="out-in">
    <!-- ----------------------------------------------------- -->
    <!-- HOME STEP -->
    <!-- ----------------------------------------------------- -->
    <div v-if="currentStep === 'home'" key="home">
      <section
        class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
      >
        <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
          Wyrusz na swoją <br />
          <span class="text-primary">seksmisję!</span>
        </h2>

        <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
          Odkryj swoje najskrytsze fantazje i znajdź idealny seks układ.
        </p>

        <!-- EMAIL INPUT + CTA -->
        <div class="mx-auto flex w-full max-w-md items-center space-x-2">
          <Input
            type="email"
            placeholder="Wpisz swój e-mail..."
            class="h-10"
            v-model="email"
          />

          <Button
            type="button"
            size="lg"
            class="bg-rose-950 text-rose-500 hover:text-white"
            @click="goToRegisterStep"
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
              width="32"
              height="32"
            />
            <p class="text-md text-muted-foreground pt-4">
              Korzystanie z portalu jest całkowicie bezpłatne i nie nakładamy
              żadnych limitów na liczbę wiadomości.
            </p>
          </div>

          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img src="/src/assets/shield.svg" alt="" width="32" height="32" />
            <p class="text-md text-muted-foreground pt-4">
              Chronimy Twoje dane, zdjęcia i filmy – Twoja prywatność to nasz
              priorytet.
            </p>
          </div>

          <div
            class="bg-card transition-hover flex w-full flex-col items-center rounded-xl border p-6 shadow-sm hover:shadow-md md:w-[400px]"
          >
            <img
              src="/src/assets/layout-dashboard.svg"
              alt=""
              width="32"
              height="32"
            />
            <p class="text-md text-muted-foreground pt-4">
              Interfejs jest przejrzysty, intuicyjny i stale udoskonalany.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- ----------------------------------------------------- -->
    <!-- REGISTER STEP -->
    <!-- ----------------------------------------------------- -->
    <div v-else-if="currentStep === 'register'" key="register">
      <section
        class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
      >
        <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
          Rejestracja
        </h2>

        <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
          Jeden krok dzieli Cię od niezwykłej przygody
        </p>

        <!-- FORM -->
        <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5">
          <!-- EMAIL -->
          <div class="w-full text-left">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400"
              >Email</label
            >
            <Input
              v-model="email"
              type="email"
              placeholder="Wpisz email"
              class="h-10"
              :class="[
                email && !email.includes('@') ? 'border-red-500' : '',
                email && email.includes('@') ? 'border-green-500' : '',
              ]"
            />

            <p
              v-if="email && !email.includes('@')"
              class="text-red-500 text-[11px] mt-1 ml-1"
            >
              Podaj poprawny adres email
            </p>
          </div>

          <!-- USERNAME -->
          <div class="w-full text-left">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400">
              Nazwa użytkownika
            </label>

            <Input
              v-model="username"
              type="text"
              placeholder="Wpisz nazwę użytkownika"
              class="h-10"
              :class="[
                username && !isUsernameValid ? 'border-red-500' : '',
                username && isUsernameValid ? 'border-green-500' : '',
              ]"
            />

            <p
              v-if="username && !isUsernameValid"
              class="text-red-500 text-[11px] mt-1 ml-1"
            >
              Nazwa użytkownika jest nieprawidłowa
            </p>

            <!-- USERNAME VALIDATION -->
            <ul
              class="mt-2 ml-1 space-y-1 text-[11px]"
              :class="
                isUsernameValid ? 'text-green-500' : 'text-muted-foreground'
              "
            >
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

          <!-- PASSWORD -->
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
                      <strong class="text-rose-500 block mb-1">
                        Jak tworzyć silne hasła?
                      </strong>
                      Wybierz wyraz i zamień kilka liter na znaki specjalne oraz
                      cyfry.
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
                :class="[
                  password && !isPasswordStrong ? 'border-red-500' : '',
                  password && isPasswordStrong ? 'border-green-500' : '',
                ]"
              />

              <p
                v-if="password && !isPasswordStrong"
                class="text-red-500 text-[11px] mt-1 ml-1"
              >
                Hasło jest zbyt słabe
              </p>

              <!-- Strength bar -->
              <div class="mt-2 h-1 w-full rounded bg-gray-700">
                <div
                  class="h-full rounded transition-all"
                  :class="{
                    'w-1/4 bg-red-500':
                      password.length > 0 && !isPasswordStrong,
                    'w-3/4 bg-yellow-500':
                      isPasswordStrong && password.length < 12,
                    'w-full bg-green-500':
                      isPasswordStrong && password.length >= 12,
                  }"
                ></div>
              </div>

              <button
                type="button"
                @click="isPasswordVisible = !isPasswordVisible"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-rose-500 transition-colors"
              >
                <component :is="isPasswordVisible ? EyeOff : Eye" :size="16" />
              </button>
            </div>

            <p
              v-if="password && !isPasswordStrong"
              class="mt-1 ml-1 text-[11px] text-red-500"
            >
              Hasło jest za słabe — spróbuj dodać wielką literę, cyfrę i znak
              specjalny.
            </p>
          </div>

          <!-- CONFIRM PASSWORD -->
          <div class="w-full text-left">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400">
              Potwierdź hasło
            </label>

            <div class="relative">
              <Input
                v-model="confirmPass"
                :type="isConfirmVisible ? 'text' : 'password'"
                placeholder="Powtórz hasło"
                class="h-10 pr-10"
                :class="[
                  confirmPass && !doPasswordsMatch ? 'border-red-500' : '',
                  confirmPass && doPasswordsMatch ? 'border-green-500' : '',
                ]"
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
              v-if="confirmPass && !doPasswordsMatch"
              class="text-red-500 text-[11px]"
            >
              Hasła muszą być takie same.
            </p>

            <p
              v-if="doPasswordsMatch"
              class="mt-1 ml-1 text-[11px] text-green-500"
            >
              ✓ Hasła są identyczne
            </p>
          </div>

          <!-- CITY -->
          <div class="text-left w-full">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400">
              Miejscowość
            </label>
            <Input
              v-model="city"
              type="text"
              placeholder="Wpisz miejscowość"
              class="h-10"
              :class="[city && !isCityValid ? 'border-red-500' : '']"
            />

            <p
              v-if="city && !isCityValid"
              class="text-red-500 text-[11px] mt-1 ml-1"
            >
              Nazwa miasta może zawierać tylko litery i spacje
            </p>

            <p
              v-if="city && !isCityValid"
              class="mt-1 ml-1 text-[11px] text-red-500"
            >
              Nazwa miasta może zawierać tylko litery i spacje.
            </p>
          </div>

          <!-- BIRTH DATE -->
          <div class="text-left w-full">
            <label class="mb-1 ml-1 block text-[11px] text-gray-400">
              Data urodzenia
            </label>
            <Input
              v-model="birthDate"
              type="date"
              class="h-10"
              :class="[birthDate && !isAdult ? 'border-red-500' : '']"
            />

            <p
              v-if="birthDate && !isAdult"
              class="text-red-500 text-[11px] mt-1 ml-1"
            >
              Musisz mieć ukończone 18 lat
            </p>

            <p
              v-if="birthDate && !isAdult"
              class="mt-1 ml-1 text-[11px] text-red-500 animate-pulse"
            >
              Musisz mieć ukończone 18 lat, aby dołączyć.
            </p>
          </div>

          <!-- SEX -->
          <div class="w-full text-left">
            <span class="mb-2 ml-1 block text-xs font-medium text-gray-400">
              Płeć
            </span>

            <div class="flex items-center gap-2">
              <!-- Mężczyzna -->
              <Button
                type="button"
                variant="outline"
                class="flex-1 py-2 transition-all"
                :class="
                  sex === 'M'
                    ? 'bg-rose-900/40 text-rose-400 border-rose-500'
                    : 'text-gray-300 hover:text-white'
                "
                @click="sex = 'M'"
              >
                Mężczyzna
              </Button>

              <!-- Kobieta -->
              <Button
                type="button"
                variant="outline"
                class="flex-1 py-2 transition-all"
                :class="
                  sex === 'K'
                    ? 'bg-rose-900/40 text-rose-400 border-rose-500'
                    : 'text-gray-300 hover:text-white'
                "
                @click="sex = 'K'"
              >
                Kobieta
              </Button>

              <!-- Inna -->
              <Button
                type="button"
                variant="outline"
                class="flex-1 py-2 transition-all"
                :class="
                  sex === 'I'
                    ? 'bg-rose-900/40 text-rose-400 border-rose-500'
                    : 'text-gray-300 hover:text-white'
                "
                @click="sex = 'I'"
              >
                Inna
              </Button>
            </div>
          </div>

          <!-- SUBMIT -->
          <Button
            type="submit"
            size="lg"
            class="w-full bg-rose-950 text-rose-500 hover:text-white"
            @click="submitRegistration"
            :disabled="!isFormValid || isLoading"
          >
            {{ isLoading ? "Tworzenie konta..." : "Zarejestruj" }}
          </Button>
        </div>
      </section>
    </div>

    <!-- ----------------------------------------------------- -->
    <!-- OTP STEP -->
    <!-- ----------------------------------------------------- -->
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
        <!-- OTP INPUT -->
        <Input
          v-model="otpCode"
          type="text"
          maxlength="8"
          placeholder="00000000"
          class="h-12 text-center font-mono text-2xl tracking-[0.5em]"
          @input="otpCode = otpCode.replace(/[^0-9]/g, '')"
          :class="[
            otpCode && otpCode.length < 8 ? 'border-red-500' : '',
            otpCode.length === 8 ? 'border-green-500' : '',
          ]"
        />

        <!-- LIVE VALIDATION -->
        <p
          v-if="otpCode && otpCode.length < 8"
          class="text-red-500 text-[11px] mt-1"
        >
          Kod musi mieć 8 cyfr
        </p>

        <!-- SUBMIT BUTTON -->
        <Button
          class="w-full bg-rose-950 text-rose-500 hover:text-white"
          @click="verifyOtp"
          :disabled="isLoading || otpCode.length < 8"
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <span
              class="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full"
            ></span>
            Weryfikacja...
          </span>
          <span v-else>Potwierdź kod</span>
        </Button>

        <!-- RESEND + BACK -->
        <div class="flex flex-col items-center gap-2">
          <!-- RESEND OTP -->
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

          <!-- BACK -->
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

  <!-- FOOTER -->
  <footer class="w-full px-20 py-8"></footer>
</template>
