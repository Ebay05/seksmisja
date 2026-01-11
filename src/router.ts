import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../public/Homepage.vue'
import { supabase } from '@/lib/supabaseClient' // Import supabase to check auth status

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
      path: '/app/news',
      name: 'news',
      component: () => import('./components/News.vue'), // Ensure this component exists
      meta: { requiresAuth: true },
    },
  ],
})

// NAVIGATION GUARD
router.beforeEach(async (to, from, next) => {
  // Get current session from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !session) {
    // Redirect to login if not authenticated
    next({ name: 'login' })
  } else if (to.name === 'login' && session) {
    // Redirect to private app if already logged in and trying to access login page
    next({ name: 'news' })
  } else {
    // Proceed as normal
    next()
  }
})

export default router
