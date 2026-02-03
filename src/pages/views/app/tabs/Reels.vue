<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'

import { useReels } from '@/composables/useReels'
import { supabase } from '@/lib/supabase'

const { loading, error, videoFile, reelsTitle, reelsTags, saveReels } = useReels()

async function handleSave() {
  console.log('handleSave clicked', {
    title: reelsTitle.value,
    tags: reelsTags.value.length,
    file: !!videoFile.value,
  })
  try {
    const res = await supabase.auth.getUser()
    if (res.error) {
      console.error('getUser error', res.error)
      error.value = 'Błąd uwierzytelniania.'
      return
    }
    const user = res.data?.user
    if (!user) {
      error.value = 'Użytkownik nie jest zalogowany.'
      return
    }

    const ok = await saveReels(user.id)
    if (ok) {
      showDialog.value = false
      error.value = null
      success.value = 'Dodano reels pomyślnie'
      setTimeout(() => (success.value = null), 3000)
    }
  } catch (err) {
    console.error(err)
    error.value = 'Wystąpił nieoczekiwany błąd.'
  }
}

import Input from '@/components/ui/input/Input.vue'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { X } from 'lucide-vue-next'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const showDialog = ref(false)
const success = ref<string | null>(null)

const availableTags = ref([
  'masturbacja',
  'seks',
  'ostre rżnięcie',
  'zmysłowość',
  'seks oralny',
  'seks analny',
  'seks grupowy',
  'fetysz',
  'bondage',
  'dominacja',
  'uległość',
  'BDSM',
  'trójkąt',
  'gangbang',
  'orgazm',
  'squirt',
  'wytrysk',
  'szczupła',
  'BBW',
])

// dodawanie tagu
function addTag(tag: string | null) {
  if (!tag) return
  if (!reelsTags.value.includes(tag)) {
    reelsTags.value.push(tag)
  }
}

// usuwanie tagu
function removeTag(tag: string) {
  reelsTags.value = reelsTags.value.filter((t) => t !== tag)
}

// upload video
function handleVideoUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (!file.type.startsWith('video/')) {
    error.value = 'Możesz dodać tylko pliki video.'
    return
  }

  const url = URL.createObjectURL(file)
  const video = document.createElement('video')
  video.src = url

  video.onloadedmetadata = () => {
    URL.revokeObjectURL(url)
    if (video.duration > 300) {
      error.value = 'Film może mieć maksymalnie 5 minut.'
      videoFile.value = null
      return
    }
    videoFile.value = file
  }

  video.onerror = () => {
    URL.revokeObjectURL(url)
    error.value = 'Nie można odczytać pliku wideo.'
  }
}

/* -----------------------------------------------------
   RESET VIDEO ON MOUSE LEAVE
----------------------------------------------------- */
const playVideo = (e: Event) => {
  const v = e.target as HTMLVideoElement
  v.play()
}

const resetVideo = (e: Event) => {
  const v = e.target as HTMLVideoElement
  v.pause()
  v.currentTime = 0
}
</script>

<template>
  <div class="mb-6 flex w-full items-center justify-between">
    <h2 class="text-2xl font-medium text-white">Kamerki</h2>

    <!-- Otwieranie popupu -->
    <Button variant="ghost" class="w-20 bg-rose-900/50 text-rose-500" @click="showDialog = true">
      <Plus />
    </Button>
  </div>

  <div v-if="success" class="mb-4 rounded-md bg-emerald-900/40 px-3 py-2 text-sm text-emerald-200">
    {{ success }}
  </div>
  <div v-if="error" class="mb-4 rounded-md bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
    {{ error }}
  </div>

  <!-- POPUP -->
  <Dialog v-model:open="showDialog">
    <DialogContent class="border border-white/10 bg-zinc-900 text-white">
      <DialogHeader>
        <DialogTitle>Dodaj reels</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div v-if="error" class="mb-2 rounded-md bg-rose-900/30 px-3 py-2 text-sm text-rose-200">
          {{ error }}
        </div>
        <div
          v-if="success"
          class="mb-2 rounded-md bg-emerald-900/40 px-3 py-2 text-sm text-emerald-200"
        >
          {{ success }}
        </div>
        <div class="mt-4 w-full space-y-4">
          <!-- Upload video -->
          <input
            type="file"
            accept="video/*"
            @change="handleVideoUpload"
            class="mb-4 min-h-100 w-1/2 rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white file:bg-rose-600 file:text-white"
          />

          <!-- Title -->
          <Input v-model="reelsTitle" placeholder="Tytuł reelsa" class="w-full" />

          <!-- MULTI TAG SELECT -->
          <div class="space-y-2">
            <Select @update:modelValue="addTag">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Dodaj tag" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem v-for="tag in availableTags" :key="tag" :value="tag">
                  {{ tag }}
                </SelectItem>
              </SelectContent>
            </Select>

            <!-- Wybrane tagi -->
            <div class="mt-2 flex flex-wrap gap-2">
              <div
                v-for="tag in reelsTags"
                :key="tag"
                class="flex items-center gap-1 rounded-full bg-rose-700/40 px-3 py-1 text-sm"
              >
                {{ tag }}
                <button @click="removeTag(tag)" class="text-white/70 hover:text-white">
                  <X class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <Button class="w-full bg-rose-600 text-white" @click="handleSave" :disabled="loading">
            <span v-if="loading">Dodawanie...</span>
            <span v-else>Dodaj reels</span>
          </Button>
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>

  <!-- Popular Videos -->
  <div class="w-full">
    <h3 class="mb-2 tracking-[0.1rem] text-gray-300 uppercase">Popularne</h3>
    <div class="flex flex-1 gap-3">
      <div class="w-1/3">
        <video
          src="/src/assets/sample1.mp4"
          class="h-[350px] w-full rounded-xl object-cover"
          loop
          muted
          @mouseenter="playVideo"
          @mouseleave="resetVideo"
        />

        <h5 class="mt-2 truncate text-sm font-medium text-white">
          Tytuł przykładowego reelsa blb fffdkfd
        </h5>

        <h6 class="text-xs text-gray-400">1234 wyświetleń</h6>
      </div>

      <div class="w-1/3">
        <video
          src="/src/assets/sample1.mp4"
          class="h-[350px] w-full rounded-xl object-cover"
          loop
          muted
          @mouseenter="playVideo"
          @mouseleave="resetVideo"
        />

        <h5 class="mt-2 truncate text-sm font-medium text-white">
          Tytuł przykładowego reelsa blb fffdkfd
        </h5>

        <h6 class="text-xs text-gray-400">1234 wyświetleń</h6>
      </div>

      <div class="w-1/3">
        <video
          src="/src/assets/sample1.mp4"
          class="h-[350px] w-full rounded-xl object-cover"
          loop
          muted
          @mouseenter="playVideo"
          @mouseleave="resetVideo"
        />

        <h5 class="mt-2 truncate text-sm font-medium text-white">
          Tytuł przykładowego reelsa blb fffdkfd
        </h5>

        <h6 class="text-xs text-gray-400">1234 wyświetleń</h6>
      </div>
    </div>

    <Separator class="my-5 w-full" />

    <!-- All Videos -->
    <h3 class="mb-2 tracking-[0.1rem] text-gray-300 uppercase">Wszystkie</h3>
    <div class="grid w-full grid-cols-4 gap-3">
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
      <video
        src="/src/assets/sample1.mp4"
        class="h-60 rounded-xl object-cover"
        loop
        muted
        @mouseenter="($event.target as HTMLVideoElement).play()"
        @mouseleave="($event.target as HTMLVideoElement).pause()"
      ></video>
    </div>
  </div>
</template>
