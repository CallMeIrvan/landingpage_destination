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
    // Admin Setup route removed for security
    // {
    //   path: '/admin/setup',
    //   name: 'admin-setup',
    //   component: () => import('../views/AdminSetup.vue'),
    //   meta: { requiresAdminSetup: true },
    // },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginSimple.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardSimple.vue'),
      meta: { requiresAdminAuth: true, requiresAdminRole: true },
    },
  ],
})

// Navigation guard untuk admin routes
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAdminAuth)
  const requiresAdminRole = to.matched.some((record) => record.meta.requiresAdminRole)

  if (requiresAuth) {
    // Tunggu status auth siap
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChange((user) => {
        unsubscribe()
        resolve(user)
      })
    })

    const currentUser = auth.currentUser

    if (!currentUser) {
      // Jika tidak login, redirect ke login
      next({ name: 'admin-login' })
    } else {
      // Jika butuh role admin spesifik
      if (requiresAdminRole) {
        const isAdminUser = await checkCurrentUserIsAdmin()
        if (isAdminUser) {
          next()
        } else {
          // User login tapi bukan admin
          console.warn('Unauthorized access attempt by non-admin user')
          next({ name: 'home' }) // atau halaman unauthorized
        }
      } else {
        next()
      }
    }
  } else if (to.name === 'admin-login' && auth.currentUser) {
    // Jika sudah login dan coba akses login page, redirect ke dashboard
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
