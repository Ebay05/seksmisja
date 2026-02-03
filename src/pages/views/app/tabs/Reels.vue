<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'

const showDialog = ref(false)

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

  <!-- POPUP -->
  <Dialog v-model:open="showDialog">
    <DialogContent class="border border-white/10 bg-zinc-900 text-white">
      <DialogHeader>
        <DialogTitle>Dodaj filmik</DialogTitle>
      </DialogHeader>

      <div class="mt-4">
        <p class="text-sm text-gray-400">Tu będzie formularz dodawania filmiku.</p>
      </div>
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
