import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/pages/public/Homepage.vue'
import { supabase } from '@/lib/supabase'
import AppFrame from '@/pages/layouts/AppFrame.vue'
import SettingsFrame from '@/pages/layouts/SettingsFrame.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // PUBLIC ROUTES
    {
      path: '/',
      name: 'home',
      component: Homepage,
      meta: { requiresAuth: false },
    },
    {
      path: '/logowanie',
      name: 'login',
      component: () => import('@/pages/public/Login.vue'),
      meta: { requiresAuth: false },
    },

    // PRIVATE ROUTES (Protected by Guard)
    {
      path: '/app',
      component: AppFrame,
      meta: { requiresAuth: true },
      redirect: '/app/community',
      children: [
        {
          path: 'community',
          name: 'community',
          component: () => import('@/pages/views/app/Community.vue'),
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/pages/views/app/Chat.vue'),
        },
        {
          path: 'likes',
          name: 'likes',
          component: () => import('@/pages/views/app/Likes.vue'),
        },
        {
          path: 'premium',
          name: 'premium',
          component: () => import('@/pages/views/app/Premium.vue'),
        },
        {
          path: 'ustawienia',
          name: 'settings',
          component: SettingsFrame,
          meta: { hideAppSidebar: true },
          redirect: '/app/ustawienia/profil',
          children: [
            {
              path: 'profil',
              name: 'settings-profile',
              component: () => import('@/pages/views/settings/Profile.vue'),
            },
            {
              path: 'ogolne',
              name: 'settings-general',
              component: () => import('@/pages/views/settings/General.vue'),
            },
            {
              path: 'wyglad',
              name: 'settings-appearance',
              component: () => import('@/pages/views/settings/Appearance.vue'),
            },
            {
              path: 'pomoc',
              name: 'settings-support',
              component: () => import('@/pages/views/settings/Support.vue'),
            },
            {
              path: 'feedback',
              name: 'settings-feedback',
              component: () => import('@/pages/views/settings/Feedback.vue'),
            },
            {
              path: 'aktualizacje',
              name: 'settings-updates',
              component: () => import('@/pages/views/settings/Updates.vue'),
            },
            {
              path: 'premium',
              name: 'settings-premium',
              component: () => import('@/pages/views/app/Premium.vue'),
            },
          ],
        },
        {
          path: 'user/:username',
          name: 'user-profile',
          component: () => import('@/pages/user/UserProfilePage.vue'),
        },
      ],
    },
  ],
})

// NAVIGATION GUARD
router.beforeEach(async (to, _from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthRequired = to.matched.some((record) => record.meta.requiresAuth)

  if (isAuthRequired && !session) {
    next({ name: 'login' })
  } else if (to.name === 'login' && session) {
    next({ name: 'community' })
  } else {
    next()
  }
})

export default router
