import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../public/Homepage.vue'
import { supabase } from '@/lib/supabaseClient'
import AppFrame from './components/AppFrame.vue'

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
      component: () => import('../public/Login.vue'),
      meta: { requiresAuth: false },
    },

    // PRIVATE ROUTES (Protected by Guard)
    {
      path: '/app',
      component: AppFrame,
      meta: { requiresAuth: true },
      redirect: '/app/community',
      children: [
        { path: 'community', component: () => import('@/components/views/Community.vue') },
        { path: 'chat', component: () => import('@/components/views/Chat.vue') },
        { path: 'likes', component: () => import('@/components/views/Likes.vue') },
        { path: 'forum', component: () => import('@/components/views/Forum.vue') },
        { path: 'premium', component: () => import('@/components/views/Premium.vue') },
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
