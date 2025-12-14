<script setup>
import { ref } from 'vue'
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import Divider from 'primevue/divider'
import router from '@/router'

const accountInfo = ref('') // Email or username
const password = ref('')
const errorInfo = ref('')

const login = async () => {
  // Connecting to the JSON server
  try {
    // Checking the data

    const isEmail = accountInfo.value.includes('@')
    const searchParam = isEmail ? `email=${accountInfo.value}` : `name=${accountInfo.value}`

    const response = await fetch(
      `http://localhost:3000/users?${searchParam}&password=${password.value}`,
    )
    const users = await response.json()

    if (users.length > 0) {
      const user = users[0] // logged user
      // Remembering the user for the session
      localStorage.setItem('loggedUser', JSON.stringify(user))

      router.push('/app/news')
    } else {
      errorInfo.value = 'Niepoprawny email lub hasło.'
    }
  } catch (error) {
    console.error(error)
    errorInfo.value = 'Błąd połączenia z serwerem.'
  }
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
