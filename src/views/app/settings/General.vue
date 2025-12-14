<script lang="ts" setup>
import { ref } from 'vue'
import { ToggleSwitch, InputText, FloatLabel } from 'primevue' // Dodaj importy dla InputText i FloatLabel

// Obiekt przechowujący niezależny stan dla każdego przełącznika
const settings = ref({
  likes: true,
  comments: true,
  friendRequests: true,
  profileFollow: true,
  showFriends: true,
  showLikes: false,
  showAge: false,
})

const data = ref({
  messagesFrom: 'Mężczyźni, Kobiety, Pary',
  newMessages: 'Tylko od płci, których szukam',
})

// Funkcja przełączająca, która przyjmuje klucz (nazwę ustawienia)
const toggleSetting = (key: keyof typeof settings.value) => {
  settings.value[key] = !settings.value[key]
}
</script>

<template>
  <div class="w-full flex flex-column">
    <h1 class="w-full">Ogólne</h1>
    <h2 class="font-semibold mt-4 mb-3">Akceptuj</h2>
    <div class="flex flex-column gap-3">
      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('likes')"
      >
        <span>Polubienia do zdjęć, filmów i postów</span>
        <ToggleSwitch v-model="settings.likes" @click.stop />
      </div>

      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('comments')"
      >
        <span>Komentarze do zdjęć, filmów i postów</span>
        <ToggleSwitch v-model="settings.comments" @click.stop />
      </div>

      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('friendRequests')"
      >
        <span>Zaproszenia do znajomych</span>
        <ToggleSwitch v-model="settings.friendRequests" @click.stop />
      </div>

      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('profileFollow')"
      >
        <span>Obserwowanie mojego profilu</span>
        <ToggleSwitch v-model="settings.profileFollow" @click.stop />
      </div>

      <FloatLabel variant="in">
        <InputText
          id="messagesFrom"
          type="text"
          :model-value="data.messagesFrom"
          class="w-full"
          readonly
        />
        <label for="messagesFrom" type>Akceptowane Płcie</label>
      </FloatLabel>

      <FloatLabel variant="in">
        <InputText
          id="newMessages"
          type="text"
          :model-value="data.newMessages"
          class="w-full"
          readonly
        />
        <label for="newMessages" type>Nowe Rozmowy</label>
      </FloatLabel>
    </div>

    <h2 class="font-semibold mt-4 mb-3">Prywatność</h2>
    <div class="flex flex-column gap-3">
      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('showFriends')"
      >
        <span>Pokazuj innym moich znajomych</span>
        <ToggleSwitch v-model="settings.showFriends" @click.stop />
      </div>

      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('showLikes')"
      >
        <span>Pokazuj innym moje polubienia</span>
        <ToggleSwitch v-model="settings.showLikes" @click.stop />
      </div>

      <div
        class="flex justify-content-between align-items-center cursor-pointer user-select-none"
        @click="toggleSetting('showAge')"
      >
        <span>Pokazuj innym mój wiek</span>
        <ToggleSwitch v-model="settings.showAge" @click.stop />
      </div>
    </div>
    <Button label="Zapisz" icon="pi pi-save" class="border-round-3xl mt-5 w-auto" />
  </div>
</template>
