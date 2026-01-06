<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase' // Ensure the path is correct

// PrimeVue Imports
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import Divider from 'primevue/divider'
import Message from 'primevue/message'

const router = useRouter()

// Using email as Supabase requires email for authentication by default
const email = ref('')
const password = ref('')
const errorInfo = ref('')
const loading = ref(false)

const login = async () => {
  errorInfo.value = ''

  if (!email.value || !password.value) {
    errorInfo.value = 'Please enter email and password.'
    return
  }

  try {
    loading.value = true

    // Logging in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      errorInfo.value = 'Invalid email or password.' // Supabase returns "Invalid login credentials"
    } else {
      // Success!
      console.log('Logged in:', data.user)

      // No need to manually set localStorage - Supabase handles session management automatically.

      router.push('/app/news')
    }
  } catch (err) {
    console.error(err)
    errorInfo.value = 'Server connection error.'
  } finally {
    loading.value = false
  }
}

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

  <section class="w-full h-screen flex flex-column justify-content-center align-items-center">

    <div class="">

      <h2 class="text-center text-5xl font-bold">Witaj Ponownie!</h2>

    </div>

    <div class="mx-auto p-6 shadow-md rounded-md">

      <Message v-if="errorInfo" severity="error" class="error-container mb-4">

        {{ errorInfo }}

      </Message>

      <!-- Nazwa użytkownika -->

      <FloatLabel variant="in" class="mb-3">

        <InputText id="accountInfo" v-model="accountInfo" autocomplete="off" class="w-full" />

        <label for="accountInfo">Email / Username</label>

      </FloatLabel>


      <!-- Hasło -->

      <FloatLabel variant="in" class="mb-3">

        <Password

          id="password"

          v-model="password"

          toggleMask

          feedback="false"

          class="w-full"

          :inputStyle="{ width: '100%' }"

        />

        <label for="password">Hasło</label>

      </FloatLabel>


      <!-- Submit -->

      <Button label="Zaloguj się" class="w-full" @click="login" size="medium" rounded />


      <Divider align="center" type="solid">

        <b>lub</b>

      </Divider>


      <Button

        label="Zaloguj się przez Google"

        icon="pi pi-google"

        class="w-full"

        size="medium"

        severity="secondary"

        rounded

      />

    </div>

    <p>

      Nie masz konta?<a href="/rejestracja" class="font-bold px-1 text-primary">Zarejestruj się</a>

    </p>

  </section>

</template>


<style></style>



to samo z logowaniem
