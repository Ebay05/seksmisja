<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const router = useRouter();

const identifier = ref(""); // Can be username or email
const password = ref("");
const isLoading = ref(false);

// Handle the sign-in process
const handleLogin = async () => {
  if (!identifier.value || !password.value) {
    alert("Proszę wypełnić wszystkie pola.");
    return;
  }

  isLoading.value = true;
  let loginEmail = identifier.value;

  // Logic to allow login via username:
  // We check if the input is an email. If not, we search for the email in the profiles table.
  if (!identifier.value.includes("@")) {
    const { data, error } = await supabase
      .from("profiles") // Make sure you have a profiles table or use your metadata logic
      .select("email")
      .eq("username", identifier.value)
      .single();

    if (error || !data) {
      alert("Nie znaleziono użytkownika o takiej nazwie.");
      isLoading.value = false;
      return;
    }
    loginEmail = data.email;
  }

  // Supabase Authentication
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: password.value,
  });

  if (authError) {
    alert("Błąd logowania: " + authError.message);
    isLoading.value = false;
  } else {
    // Redirect to the private app area after successful login
    router.push("/app");
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
  </nav>

  <div
    class="flex w-full flex-1 flex-col items-center justify-center px-12 py-10 text-center"
  >
    <h2 class="mb-6 text-6xl font-extrabold tracking-wide lg:text-7xl">
      Logowanie
    </h2>
    <p class="text-muted-foreground mx-auto mb-10 max-w-[600px] text-xl">
      Witaj ponownie!
    </p>

    <form
      @submit.prevent="handleLogin"
      class="mx-auto flex w-full max-w-md flex-col items-center gap-5"
    >
      <Input
        v-model="identifier"
        type="text"
        placeholder="Email lub nazwa użytkownika"
        class="h-10"
      />

      <Input
        v-model="password"
        type="password"
        placeholder="Twoje hasło"
        class="h-10"
      />

      <Button
        type="submit"
        size="lg"
        class="w-full bg-rose-950 text-rose-500 hover:text-white"
        :disabled="isLoading"
      >
        {{ isLoading ? "Logowanie..." : "Zaloguj się" }}
      </Button>

      <p class="text-sm text-muted-foreground mt-2">
        Nie masz konta?
        <RouterLink to="/" class="text-rose-500 hover:underline"
          >Zarejestruj się</RouterLink
        >
      </p>
    </form>
  </div>

  <footer class="w-full px-20 py-8"></footer>
</template>
