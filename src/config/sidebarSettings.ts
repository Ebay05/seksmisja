import type { Component } from 'vue'
import { MessageCircleMore, HeartPlus, Library, Gem, Users } from 'lucide-vue-next'

export interface sidebarSettings {
  title: string
  path: string
  icon: Component
}

export const sidebarSettings: sidebarSettings[] = [
  {
    title: 'Profil',
    path: '/app/ustawienia/profil',
    icon: Users,
  },
  {
    title: 'Ogólne',
    path: '/app/ustawienia/ogolne',
    icon: MessageCircleMore,
  },
  {
    title: 'Wygląd',
    path: '/app/ustawienia/wyglad',
    icon: HeartPlus,
  },
  {
    title: 'Pomoc',
    path: '/app/ustawienia/pomoc',
    icon: Library,
  },
  {
    title: 'Feedback',
    path: '/app/ustawienia/feedback',
    icon: MessageCircleMore,
  },
  {
    title: 'Aktualizacje',
    path: '/app/ustawienia/aktualizacje',
    icon: HeartPlus,
  },
  {
    title: 'Premium',
    path: '/app/ustawienia/premium',
    icon: Gem,
  },
]
