<script setup lang="ts">
// Importujemy podstawowe komponenty Tabs z Twojej biblioteki UI
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ref, onMounted } from 'vue'

import { supabase } from '@/lib/supabaseClient'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const userProfile = ref<{ avatar_url: string } | null>(null)

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

import { ImagePlus, Video, SmilePlus } from 'lucide-vue-next'

const actions = [
  { title: 'Dodaj zdjęcie', icon: ImagePlus, type: 'image' },

  { title: 'Dodaj wideo', icon: Video, type: 'video' },

  { title: 'Dodaj emoji', icon: SmilePlus, type: 'emoji' },
]

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

          <div class="flex flex-col gap-4">
            <Card class="border-white/10 bg-zinc-800/20">
              <CardContent class="flex items-center gap-4">
                <Avatar class="h-12 w-12 shrink-0 border-2 border-rose-500/50 shadow-lg">
                  <AvatarImage :src="userProfile?.avatar_url" alt="Avatar" />
                  <AvatarFallback class="bg-rose-950 text-rose-500">U</AvatarFallback>
                </Avatar>

                <textarea
                  name="newPost"
                  id="newPost"
                  placeholder="O czym teraz myślisz?"
                  class="h-12 min-h-[48px] flex-1 resize-none overflow-hidden rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-rose-500/50 focus:outline-none"
                ></textarea>

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
        <TabsContent value="live">
          <h2 class="text-2xl font-bold text-white">Kamerki</h2>
        </TabsContent>

        <TabsContent value="searcher">
          <h2 class="text-2xl font-bold text-white">Wyszukiwarka</h2>
        </TabsContent>

        <TabsContent value="listings">
          <h2 class="text-2xl font-bold text-white">Ogłoszenia</h2>
        </TabsContent>

        <TabsContent value="viewers">
          <h2 class="text-2xl font-bold text-white">Obserwujący</h2>
        </TabsContent>

        <TabsContent value="newbies">
          <h2 class="text-2xl font-bold text-white">Nowi</h2>
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
