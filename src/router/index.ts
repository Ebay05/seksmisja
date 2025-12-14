import { createRouter, createWebHistory } from 'vue-router'

// Layout
import HomeContainer from '@/views/public/HomeContainer.vue'
import AppFrame from '@/views/app/AppFrame.vue'
import SettingsFrame from '@/views/app/settings/SettingsFrame.vue'

// Homepage Items
import HomeView from '@/views/public/Homepage.vue'
import RegisterForm from '@/views/public/Register.vue'
import LoginForm from '@/views/public/Login.vue'

// App Items
import NewsView from '@/views/app/News.vue'
import Lives from '@/views/app/Lives.vue'
import Searcher from '@/views/app/Searcher.vue'
import Chat from '@/views/app/Chat.vue'
import Likes from '@/views/app/Likes.vue'
import Forum from '@/views/app/Forum.vue'
import Premium from '@/views/app/Premium.vue'

// Settings
import Profile from '@/views/app/settings/Profile.vue'
import General from '@/views/app/settings/General.vue'
import Appearance from '@/views/app/settings/Appearance.vue'
import Help from '@/views/app/settings/Help.vue'
import Feedback from '@/views/app/settings/Feedback.vue'
import Updates from '@/views/app/settings/Updates.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- Public Domain (Layout HomeContainer) ---
    {
      path: '/',
      component: HomeContainer,
      children: [
        {
          path: '',
          name: 'homepage',
          component: HomeView,
          meta: { guestOnly: true },
        },
        {
          // POPRAWKA 1: Usuń "/" -> Teraz ścieżka to: /rejestracja
          path: 'rejestracja',
          name: 'register',
          component: RegisterForm,
          meta: { guestOnly: true },
        },
        {
          // POPRAWKA 1: Usuń "/" -> Teraz ścieżka to: /logowanie
          path: 'logowanie',
          name: 'login',
          component: LoginForm,
          meta: { guestOnly: true },
        },
      ],
    },

    // Application (Layout AppFrame)
    {
      path: '/app',
      name: 'app',
      component: AppFrame,
      children: [
        // Tabs & Main Content
        {
          path: 'news',
          name: 'news',
          component: NewsView,
          meta: { requiresAuth: true },
        },
        {
          path: 'kamerki',
          name: 'lives',
          component: Lives,
          meta: { requiresAuth: true },
        },
        {
          path: 'wyszukiwarka',
          name: 'search',
          component: Searcher,
          meta: { requiresAuth: true },
        },
        // Sidebar Items
        {
          path: 'czat',
          name: 'chat',
          component: Chat,
          meta: { requiresAuth: true },
        },
        {
          path: 'polubienia',
          name: 'likes',
          component: Likes,
          meta: { requiresAuth: true },
        },
        {
          path: 'forum',
          name: 'forum',
          component: Forum,
          meta: { requiresAuth: true },
        },
        {
          path: 'premium',
          name: 'premium',
          component: Premium,
          meta: { requiresAuth: true },
        },
      ],
    },
    // Settings (Layout SettingsFrame)
    {
      path: '/ustawienia',
      name: 'settings',
      component: SettingsFrame,
      children: [
        // Sidebar Items
        {
          path: '',
          name: 'profile',
          component: Profile,
          meta: { requiresAuth: true },
        },
        {
          path: 'ogolne',
          name: 'general',
          component: General,
          meta: { requiresAuth: true },
        },
        {
          path: 'wyglad',
          name: 'appearance',
          component: Appearance,
          meta: { requiresAuth: true },
        },
        {
          path: 'pomoc',
          name: 'help',
          component: Help,
          meta: { requiresAuth: true },
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: Feedback,
          meta: { requiresAuth: true },
        },
        {
          path: 'aktualizacje',
          name: 'updates',
          component: Updates,
          meta: { requiresAuth: true },
        },
        {
          path: 'premium',
          name: 'premium',
          component: Premium,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedUser = localStorage.getItem('loggedUser')

  if (to.meta.requiresAuth && !loggedUser) {
    // Brak autoryzacji: idź do logowania
    next({ name: 'login' })
  } else if (to.meta.guestOnly && loggedUser) {
    // Zalogowany user na stronie dla gości: idź do aplikacji
    // POPRAWKA 2: Zmieniamy 'app' na 'news', bo 'news' jest domyślną nazwą w aplikacji.
    // Zmieniłem też, że trasa /app ma nazwę 'app', więc teraz name: 'app' też zadziała,
    // ale name: 'news' jest bardziej precyzyjne jako dashboard.
    next({ name: 'news' })
  } else {
    next()
  }
})

export default router
