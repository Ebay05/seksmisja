import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage.vue' 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/rejestracja',
      name: 'register',
      component: () => import('./components/Register.vue')
    },
    {
      path: '/logowanie',
      name: 'login',
      component: () => import('./components/Login.vue')
    }
  ]
})

export default router