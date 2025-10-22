import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChange, checkCurrentUserIsAdmin } from '../services/authService'
import { auth } from '../config/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // Admin routes - terpisah dari user biasa
    {
      path: '/admin',
      redirect: '/admin/login',
    },
    {
      path: '/admin/setup',
      name: 'admin-setup',
      component: () => import('../views/AdminSetup.vue'),
      meta: { requiresAdminSetup: true },
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginSimple.vue'),
      meta: { requiresAdminAuth: true },
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardSimple.vue'),
      meta: { requiresAdminAuth: true, requiresAdminRole: true },
    },
  ],
})

// Navigation guard untuk admin routes - versi sangat sederhana
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path)

  // Untuk admin routes, biarkan semua lewat dulu untuk testing
  if (to.path.startsWith('/admin')) {
    console.log('Admin route detected, allowing access')
    next()
  } else {
    next()
  }
})

export default router
