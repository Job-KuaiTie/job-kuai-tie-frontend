import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dashboardRoutes from './dashboardRouter'
import { useAuthStore } from '@/stores/authStore'
import { useFlashMessageStore } from '@/stores/flashMessageStore'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string // `title` is optional and must be a string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { title: '關於求職快貼', requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard/job' }, // default tab
        ...dashboardRoutes,
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { title: '關於求職快貼' },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/LoginView.vue'),
      meta: { title: '登入' },
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/SignupView.vue'),
      meta: { title: '註冊' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/error/NotFoundView.vue'),
    },
  ],
})

router.afterEach((to) => {
  const defaultTitle = '躺卷｜人生財務規劃輕鬆算'
  // nullish coalescing operator. allows you a default value when the left-hand operand is null or undefined.
  document.title = to.meta?.title ?? defaultTitle
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.token
  // Non login would redirect to main page when access protected page
  if (to.meta.requiresAuth && !isLoggedIn) {
    const flashMessageStore = useFlashMessageStore()
    flashMessageStore.setFlashMessage('請登入已前往指定頁面', 'success')
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  } else if (to.path === '/' && isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
