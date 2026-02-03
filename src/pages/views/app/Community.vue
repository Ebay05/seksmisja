<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { House, Film, Search, Megaphone, Eye, UserPlus } from 'lucide-vue-next'

import News from './tabs/News.vue'
import Reels from './tabs/Reels.vue'
import Searcher from './tabs/Searcher.vue'
import Listings from './tabs/Listings.vue'
import Viewers from './tabs/Viewers.vue'
import Newbies from './tabs/Newbies.vue'
import Contacts from './tabs/Contacts.vue'
</script>

<template>
  <div class="flex h-full w-full overflow-y-auto">
    <!-- MAIN CONTENT -->
    <div class="z-0 mr-[20%] flex w-4/5 flex-1 flex-col items-center py-8">
      <Tabs default-value="news" class="flex w-3/4 flex-col items-center">
        <TabsList class="mb-6 w-full justify-center rounded-xl bg-zinc-800/20">
          <TabsTrigger value="news"><House /></TabsTrigger>
          <TabsTrigger value="live"><Film /></TabsTrigger>
          <TabsTrigger value="searcher"><Search /></TabsTrigger>
          <TabsTrigger value="listings"><Megaphone /></TabsTrigger>
          <TabsTrigger value="viewers"><Eye /></TabsTrigger>
          <TabsTrigger value="newbies"><UserPlus /></TabsTrigger>
        </TabsList>

        <TabsContent value="news" class="mt-0 h-full w-full font-medium">
          <News />
        </TabsContent>

        <TabsContent value="live" class="mt-0 h-full w-full font-medium">
          <Reels />
        </TabsContent>

        <TabsContent value="searcher" class="mt-0 h-full w-full font-medium">
          <Searcher />
        </TabsContent>

        <TabsContent value="listings" class="mt-0 h-full w-full font-medium">
          <Listings />
        </TabsContent>

        <TabsContent value="viewers" class="mt-0 h-full w-full font-medium">
          <Viewers />
        </TabsContent>

        <TabsContent value="newbies" class="mt-0 w-full">
          <Newbies />
        </TabsContent>
      </Tabs>
    </div>

    <!-- RIGHT SIDEBAR -->
    <div class="fixed top-0 right-0 z-20 h-screen w-1/5 p-8">
      <Contacts />
    </div>
  </div>
</template>
