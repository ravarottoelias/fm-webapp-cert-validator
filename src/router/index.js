import QrValidatorView from '@/views/QrValidatorView.vue'
import ValidatorView from '@/views/ValidatorView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/validate/scan-qr',
      name: 'qrValidator',
      component: QrValidatorView,
    },
    {
      path: '/validate',
      name: 'validator',
      component: ValidatorView,
    },
  ],
})

export default router
