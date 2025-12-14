<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { Toast } from 'primevue'
import Message from 'primevue/message'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorInfo = ref('')

// Submit Button
const register = async () => {
  if (password.value != confirmPassword.value) {
    errorInfo.value = 'Hasła są różne!'
    return
  }
  if (!username.value || !email.value || !password.value) {
    errorInfo.value = 'Wypełnij wszystkie pola!'
    return
  }

  // Preparing data to sending to the server
  const newUser = {
    name: username.value,
    email: email.value,
    password: password.value,
    createdAt: new Date().toISOString(),
  }

  // Sending data to the JSON server
  try {
    // Checking the email
    const checkEmail = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const existingUsers = await checkEmail.json()

    if (existingUsers.length > 0) {
      errorInfo.value = 'Istnieje już użytkownik powiązany z tym adresem email.'
      return
    }

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    if (response.ok) {
      console.log('Sukces! Użytkownik dodany.')

      // redirecting to news view
      router.push('/app/news')
    } else {
      console.error('Błąd serwera')
    }
  } catch (error) {
    console.error('Błąd połączenia:', error)
  }
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
