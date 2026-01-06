<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabaseConnect'

// PrimeVue Imports
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Message from 'primevue/message'

const router = useRouter()

// Form states
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const otpToken = ref('') // Store the 6-digit code from email

// UI Control states
const errorInfo = ref('')
const successInfo = ref('')
const loading = ref(false)
const isVerifying = ref(false) // Toggle between Registration form and OTP input

/**
 * Step 1: Handle initial user registration
 */
const register = async () => {
  // Basic front-end validation
  if (!username.value || !email.value || !password.value) {
    errorInfo.value = 'Proszę wypełnić wszystkie pola!'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorInfo.value = 'Hasła nie są identyczne!'
    return
  }

  try {
    loading.value = true
    errorInfo.value = ''
    successInfo.value = ''

    // Sign up the user in Supabase Auth
    // metadata is stored in 'display_name' to be captured by DB triggers
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: username.value,
        }
      }
    })

    if (error) throw error

    if (data.user) {
      // If session is null, it means email confirmation is enabled in Supabase settings
      if (data.session === null) {
        isVerifying.value = true
        successInfo.value = 'Konto utworzone! Wpisz poniżej kod przesłany na Twój e-mail.'
      } else {
        // If confirmation is disabled, user is logged in immediately
        router.push('/app/news')
      }
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    errorInfo.value = error.message === 'User already registered'
      ? 'Ten adres email jest już zarejestrowany.'
      : 'Wystąpił błąd: ' + error.message
  } finally {
    loading.value = false
  }
}

/**
 * Step 2: Verify the 6-digit OTP code sent to user's email
 */
const verifyOtp = async () => {
  if (otpToken.value.length < 8) {
    errorInfo.value = 'Kod musi mieć 8 cyfr!'
    return
  }

  try {
    loading.value = true
    errorInfo.value = ''

    const { data, error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otpToken.value,
      type: 'email'
    })

    if (error) throw error

    if (data.session) {
      await supabase.auth.setSession(data.session)
      router.push('/app/news')
    }
  } catch (error: any) {
    console.error('OTP Error:', error)
    errorInfo.value = 'Niepoprawny kod lub kod wygasł. Spróbuj ponownie.'
  } finally {
    loading.value = false
  }
}

/**
 * Social login
 */
const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
        redirectTo: window.location.origin + '/app/news'
    }
  })
  if (error) errorInfo.value = error.message
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 shadow-md rounded-md w-full sm:w-8">

    <div v-if="!isVerifying">
      <h2 class="text-center text-4xl font-bold mb-4 uppercase">Wyrusz w swoją Seksmisję!</h2>

      <Message v-if="errorInfo" severity="error" class="mb-4">{{ errorInfo }}</Message>

      <div class="flex flex-column gap-4">
        <FloatLabel variant="in">
          <InputText id="username" v-model="username" class="w-full" :disabled="loading" />
          <label for="username">Nazwa użytkownika</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <InputText id="email" v-model="email" type="email" class="w-full" :disabled="loading" />
          <label for="email">Email</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <Password
            id="password"
            v-model="password"
            toggleMask
            :feedback="false"
            class="w-full"
            :inputStyle="{ width: '100%' }"
            :disabled="loading"
          />
          <label for="password">Hasło</label>
        </FloatLabel>

        <FloatLabel variant="in">
          <Password
            id="confirmPassword"
            v-model="confirmPassword"
            toggleMask
            :feedback="false"
            class="w-full"
            :inputStyle="{ width: '100%' }"
            :disabled="loading"
          />
          <label for="confirmPassword">Powtórz hasło</label>
        </FloatLabel>

        <Button
          label="Zarejestruj się"
          class="w-full p-3 font-bold"
          rounded
          :loading="loading"
          @click="register"
        />

        <Divider align="center" type="solid"><b>lub</b></Divider>

        <Button
          label="Zarejestruj się przez Google"
          icon="pi pi-google"
          class="w-full p-3"
          severity="secondary"
          rounded
          @click="loginWithGoogle"
        />

        <p class="mt-4 text-center text-sm">
          Masz już konto?
          <router-link to="/logowanie" class="font-bold text-primary no-underline">Zaloguj się</router-link>
        </p>
      </div>
    </div>

    <div v-else>
      <h2 class="text-center text-3xl font-bold mb-2">Potwierdź swój e-mail</h2>
      <p class="text-center text-gray-600 mb-5">
        Wysłaliśmy kod weryfikacyjny na adres:<br>
        <span class="font-bold text-primary">{{ email }}</span>
      </p>

      <Message v-if="successInfo" severity="success" class="mb-4">{{ successInfo }}</Message>
      <Message v-if="errorInfo" severity="error" class="mb-4">{{ errorInfo }}</Message>

      <div class="flex flex-column gap-4">
        <FloatLabel variant="in">
          <InputText
            id="otp"
            v-model="otpToken"
            class="w-full text-center text-3xl tracking-widest"
            maxlength="8"
            autocomplete="one-time-code"
            :disabled="loading"
          />
          <label for="otp">Kod (8 cyfr)</label>
        </FloatLabel>

        <Button
          label="Potwierdź i wejdź"
          class="w-full p-3 font-bold"
          rounded
          :loading="loading"
          @click="verifyOtp"
        />

        <Button
          label="Wróć i popraw dane"
          variant="text"
          class="w-full text-sm"
          @click="isVerifying = false"
          :disabled="loading"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
:deep(.p-password input) {
  width: 100%;
}
</style>
