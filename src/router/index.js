import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('@/views/SignIn.vue'),
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('@/views/Forgot.vue'),
    },
    {
      path: '/users',
      component: () => import('@/views/Users.vue'),
    },
  ],
})

export default router
