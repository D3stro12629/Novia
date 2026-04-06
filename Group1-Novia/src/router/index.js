import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStores } from '@/stores/auth'

import HomeView from '../views/HomeView.vue'
import LandingView from '@/views/LandingView.vue'
import ProfileView from '../views/ProfileDetailsView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegitsterView.vue'
import ProfileDetailsView from '../views/ProfileDetailsView.vue'
import Editprofileinfoview from '@/views/Editprofileinfoview.vue'
import Editeducationview from '@/views/Editeducationview.vue'
import Editprojectview from '@/views/Editprojectview.vue'
import SettingsView from '@/views/SettingsView.vue'
import Test from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('@/views/Auth/Forgetpw.vue'),
    },
    {
      path: '/verify-otp',
      name: 'verify-otp',
      component: () => import('@/views/Auth/VerifyOtp.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/Auth/ResetPassword.vue'),
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { require: true },
    },
    {
      path: '/profileDetail',
      name: 'profileDetail',
      component: ProfileDetailsView,
      meta: { require: true },
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: () => import('@/views/Editprofileinfoview.vue'),
      meta: { require: true },
    },
    {
      path: '/editEducation',
      name: 'editEducation',
      component: () => import('@/views/Editeducationview.vue'),
      meta: { require: true },
    },
    {
      path: '/editProject',
      name: 'editProject',
      component: () => import('@/views/Editprojectview.vue'),
      meta: { require: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/ForbiddenView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { require: true },
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: () => import('@/views/CreatePostView.vue'),
      meta: { require: true },
    }
  ],
})

router.beforeEach((to, from) => {
  const auth = useAuthStores()

  if (!auth.isLoggedIn && to.meta.require) {
    return { name: 'login' }
  }

  return true
})

export default router;