import type { Component } from 'vue'
import { MessageCircleMore, HeartPlus, Library, Gem, Users } from 'lucide-vue-next'

export interface SidebarItem {
  title: string
  path: string
  icon: Component
  roles?: string[] // optional: restrict visibility by role
}

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Społeczność',
    path: '/app/community',
    icon: Users,
  },
  {
    title: 'Czat',
    path: '/app/chat',
    icon: MessageCircleMore,
  },
  {
    title: 'Polubienia',
    path: '/app/likes',
    icon: HeartPlus,
  },
  {
    title: 'Forum',
    path: '/app/forum',
    icon: Library,
  },
  {
    title: 'Premium',
    path: '/app/premium',
    icon: Gem,
    roles: ['premium', 'admin'], // optional
  },
]
