<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase' // Ensure the path is correct

// PrimeVue Imports
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Message from 'primevue/message'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorInfo = ref('')
const loading = ref(false)

// Submit Button
const register = async () => {
  // 1. Form validation
  if (password.value !== confirmPassword.value) {
    errorInfo.value = 'Passwords do not match!'
    return
  }
  if (!username.value || !email.value || !password.value) {
    errorInfo.value = 'Please fill in all fields!'
    return
  }

  try {
    loading.value = true
    errorInfo.value = ''

    // 2. Registration with Supabase
    // Supabase automatically hashes the password and checks for email uniqueness
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        // Passing additional data (metadata), e.g., display name
        data: {
          display_name: username.value,
        }
      }
    })

    if (error) {
      // Handling Supabase errors
      errorInfo.value = error.message
    } else if (data.user) {
        console.log('Success! Account created.')

        // Check if email confirmation is required (depends on Supabase settings)
        if (data.user.identities?.length === 0) {
            errorInfo.value = "This email is already registered."
        } else {
             // Redirect to the app
            router.push('/app/news')
        }
    }

  } catch (error: any) {
    console.error('Critical error:', error)
    errorInfo.value = 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}

// Google Login (Optional)
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

  <div class="max-w-md mx-auto p-6 shadow-md rounded-md w-6">

    <h2 class="text-center text-5xl font-bold mb-4">Wyrusz w swoją Seksmisję!</h2>

    <Message v-if="errorInfo" severity="error" class="error-container mb-4">

      {{ errorInfo }}

    </Message>


    <FloatLabel variant="in" class="mb-3">

      <InputText id="username" v-model="username" class="w-full" autocomplete="off" />

      <label for="username">Nazwa użytkownika</label>

    </FloatLabel>


    <FloatLabel variant="in" class="mb-3">

      <InputText id="email" v-model="email" type="email" class="w-full" autocomplete="off" />

      <label for="email">Email</label>

    </FloatLabel>


    <FloatLabel variant="in" class="mb-3 w-full">

      <Password

        id="password"

        v-model="password"

        toggleMask

        feedback="false"

        style="width: 100%"

        :inputStyle="{ width: '100%' }"

      />

      <label for="password">Hasło</label>

    </FloatLabel>


    <FloatLabel variant="in" class="mb-3 w-full">

      <Password

        id="confirmPassword"

        v-model="confirmPassword"

        toggleMask

        feedback="false"

        style="width: 100%"

        :inputStyle="{ width: '100%' }"

      />

      <label for="confirmPassword">Powtórz hasło</label>

    </FloatLabel>


    <Button label="Dalej" class="w-full" size="medium" rounded @click="register" />


    <Divider align="center" type="solid"><b>lub</b></Divider>


    <Button

      label="Zarejestruj się przez Google"

      icon="pi pi-google"

      class="w-full"

      size="medium"

      severity="secondary"

      rounded

    />


    <p class="mt-4 text-center">

      Masz już konto?

      <a href="/logowanie" class="font-bold text-primary">Zaloguj się</a>

    </p>

  </div>

</template>

