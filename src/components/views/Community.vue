<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const userProfile = ref<{
  avatar_url: string
  username: string
  birth_date: string | Date
  city: string
} | null>(null)

const userAge = computed(() => {
  if (!userProfile.value?.birth_date) return null

  const birth = new Date(userProfile.value.birth_date)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
})

const fetchProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url, username')
      .eq('id', user.id)
      .single()

    if (!error) {
      userProfile.value = data
    }
  }
}

import { ImagePlus, Video, SmilePlus, Send } from 'lucide-vue-next'

const actions = [
  { title: 'Dodaj zdjęcie', icon: ImagePlus, type: 'image' },
  { title: 'Dodaj wideo', icon: Video, type: 'video' },
  { title: 'Dodaj emoji', icon: SmilePlus, type: 'emoji' },
]

const allNewbies = ref<any[]>([]) // Pełna lista 50 osób
const displayLimit = ref(12) // Ile osób pokazujemy na start

const fetchNewbies = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, birth_date, city, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (!error) {
    allNewbies.value = data
  }
}

// Funkcja pomocnicza do wieku dla każdego użytkownika z listy
const calculateAge = (date: string) => {
  if (!date) return ''
  const birth = new Date(date)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) {
    age--
  }
  return age
}

// Wywołaj w onMounted
onMounted(() => {
  fetchProfile()
  fetchNewbies() // Dodaj to
})

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="flex h-full w-full overflow-hidden">
    <div class="flex w-full flex-1 flex-col items-center overflow-y-auto p-8">
      <Tabs default-value="news" class="flex w-3/4 flex-col items-center">
        <TabsList class="mb-6">
          <TabsTrigger value="news"> Aktualności </TabsTrigger>
          <TabsTrigger value="live"> Kamerki </TabsTrigger>
          <TabsTrigger value="searcher"> Wyszukiwarka </TabsTrigger>
          <TabsTrigger value="listings"> Ogłoszenia </TabsTrigger>
          <TabsTrigger value="viewers"> Obserwujący </TabsTrigger>
          <TabsTrigger value="newbies"> Nowi </TabsTrigger>
        </TabsList>

        <TabsContent value="news" class="mt-0 w-3/4">
          <h2 class="mb-6 text-2xl font-bold text-white">Aktualności</h2>

          <!-- ----------------------------------------------------- -->
          <!-- ---------------------ADDING POST--------------------- -->
          <!-- ----------------------------------------------------- -->
          <div class="flex flex-col gap-4">
            <Card class="border-white/10 bg-zinc-800/20">
              <CardContent class="flex items-center gap-4">
                <Avatar class="h-12 w-12 shrink-0 border-2 border-rose-500/50 shadow-lg">
                  <AvatarImage :src="userProfile?.avatar_url as string" alt="Avatar" />
                </Avatar>

                <!-- Post Message -->
                <textarea
                  name="newPost"
                  id="newPost"
                  placeholder="O czym teraz myślisz?"
                  class="h-12 min-h-[48px] flex-1 resize-none overflow-hidden rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-rose-500/50 focus:outline-none"
                ></textarea>

                <!-- Send Icon -->
                <button
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-800 bg-rose-950 text-rose-600 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-800 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Opublikuj"
                >
                  <Send :size="18" />
                </button>

                <!-- Additional Actions -->
                <div class="flex shrink-0 items-center gap-3 px-2">
                  <button
                    v-for="action in actions"
                    :key="action.title"
                    class="text-gray-400 transition-colors hover:text-rose-500"
                    :title="action.title"
                  >
                    <component :is="action.icon" :size="20" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="live" class="mt-0 w-3/4">
          <h2 class="text-2xl font-bold text-white">Kamerki</h2>
        </TabsContent>

        <TabsContent value="searcher" class="mt-0 w-3/4">
          <h2 class="text-2xl font-bold text-white">Wyszukiwarka</h2>
        </TabsContent>

        <TabsContent value="listings" class="mt-0 w-3/4">
          <h2 class="text-2xl font-bold text-white">Ogłoszenia</h2>
        </TabsContent>

        <TabsContent value="viewers" class="mt-0 w-3/4">
          <h2 class="text-2xl font-bold text-white">Obserwujący</h2>
        </TabsContent>

        <TabsContent value="newbies" class="mt-0 w-full lg:w-3/4">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">Nowi użytkownicy</h2>
            <span class="text-xs text-gray-500">Ostatnie 50 osób</span>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card
              v-for="user in allNewbies.slice(0, displayLimit)"
              :key="user.id"
              class="group border-white/5 bg-zinc-900/50 transition-all hover:border-rose-500/30 hover:bg-zinc-800/50"
            >
              <CardContent class="flex flex-col items-center p-4 text-center">
                <Avatar
                  class="h-20 w-20 border-2 border-rose-500/20 shadow-xl transition-transform group-hover:scale-105"
                >
                  <AvatarImage :src="user.avatar_url" alt="Avatar" />
                </Avatar>

                <div class="mt-4">
                  <h3 class="leading-tight font-bold text-white">
                    {{ user.username }}
                  </h3>
                  <p class="text-xs text-gray-400">
                    {{ calculateAge(user.birth_date) }} lat, {{ user.city }}
                  </p>
                </div>
              </CardContent>

              <CardFooter class="flex justify-center p-3 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  class="h-8 w-full text-[11px] text-rose-500 hover:bg-rose-500 hover:text-white"
                >
                  Zobacz profil
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div v-if="displayLimit < allNewbies.length" class="mt-10 flex justify-center pb-10">
            <Button
              @click="displayLimit += 12"
              variant="outline"
              class="border-rose-900 bg-rose-950/20 text-rose-500 hover:bg-rose-500 hover:text-white"
            >
              Pokaż więcej osób
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <div class="h-full w-80 p-8">
      <div class="h-full rounded-3xl border border-white/20 p-6">
        <h2 class="mb-4 text-lg font-semibold text-white">Kontakty</h2>
        <div class="space-y-4">
          <p class="text-sm text-gray-500 italic">Brak aktywnych kontaktów</p>
        </div>
      </div>
    </div>
  </div>
</template>
