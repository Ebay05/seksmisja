<script lang="ts">
import { Volume2, Settings, MessageCircleMore, MailPlus, Trash2, Plus } from 'lucide-vue-next'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Volume2,
    Settings,
    MessageCircleMore,
    MailPlus,
    Trash2,
    Plus,
  },
})
</script>
<template>
  <div class="flex h-full w-full overflow-hidden">
    <!-- ----------------------------------------------------- -->
    <!-- ---------------------LEFT SIDEBAR-------------------- -->
    <!-- ----------------------------------------------------- -->
    <div class="flex w-1/4 flex-col items-center overflow-y-auto p-8">
      <div class="mb-3 flex w-full items-center justify-between">
        <!-- Title -->
        <h2 class="text-2xl font-bold text-white">Wiadomości</h2>
        <div class="flex gap-2">
          <!-- Speaker Icon -->
          <button
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/20 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            title="Dźwięk powiadomień"
          >
            <Volume2 :size="18" />
          </button>

          <!-- Settings Icon -->
          <button
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/20 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            title="Ustaawienia wiadomości"
          >
            <Settings :size="18" />
          </button>
        </div>
      </div>

      <!-- ----------------------------------------------------- -->
      <!-- --------------------MESSAGES TYPES------------------- -->
      <!-- ----------------------------------------------------- -->
      <div class="my-3 flex w-full gap-3">
        <!-- Friends Messages Icon -->
        <button
          class="flex h-10 flex-1 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/20 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          title="Usunięte"
        >
          <MessageCircleMore :size="18" />
        </button>

        <!-- New Messages Icon -->
        <button
          class="flex h-10 flex-1 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/20 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          title="Ustaawienia wiadomości"
        >
          <MailPlus :size="18" />
        </button>

        <!-- Trash Icon -->
        <button
          class="flex h-10 flex-1 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/20 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          title="Ustaawienia wiadomości"
        >
          <Trash2 :size="18" />
        </button>
      </div>

      <div class="flex w-full items-center justify-between">
        <!-- Title -->
        <h3 class="my-5 text-xl font-bold text-white">Rozmowy</h3>
        <button
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/20 shadow-lg transition-all hover:scale-105 hover:border hover:border-rose-800 hover:bg-rose-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          title="Dźwięk powiadomień"
        >
          <Plus :size="18" />
        </button>
      </div>
    </div>
    <!-- ----------------------------------------------------- -->
    <!-- ---------------------CHAT WINDOW--------------------- -->
    <!-- ----------------------------------------------------- -->
    <div class="flex w-3/4 p-8">
      <div
        class="flex w-full items-center justify-center overflow-y-auto rounded-4xl border border-white/10 bg-zinc-800/20 p-8"
      >
        <span class="text-2xl">Nie wybrałeś jeszcze żadnej konwersacji</span>
      </div>
    </div>
  </div>
</template>
