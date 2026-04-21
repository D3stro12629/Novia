import { createRouter, createWebHistory } from "vue-router";
import { useAuthStores } from "@/stores/auth";

import HomeView from "../views/HomeView.vue";
import LandingView from '@/views/LandingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/home', name: 'home', component: HomeView, meta: { require: true } },
    { path: '/login', name: 'login', component: () => import('@/views/Auth/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('@/views/Auth/RegisterView.vue') },
    { path: '/forget-password', name: 'forget-password', component: () => import("@/views/Auth/Forgetpw.vue") },
    { path: '/profileDetail', name: 'profileDetail', component: () => import('../views/ProfileDetailsView.vue'), meta: { require: true } },
    { path: '/editProfile', name: 'editProfile', component: () => import('@/views/Editprofileinfoview.vue'), meta: { require: true } },
    { path: '/settings', name: 'settings', component: () => import('@/views/SettingsView.vue'), meta: { require: true } },
    { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { require: true } },
    { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue'), meta: { require: true } },
    { path: '/help', name: 'help', component: () => import('@/views/HelpView.vue'), meta: { require: true } },
    { path: '/chatview', name: 'ChatView', component: () => import('@/views/ChatView.vue'), meta: { require: true } },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/ForbiddenView.vue') },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStores();

  // ONLY protect pages that REQUIRE authentication
  if (to.meta.require && !auth.isLoggedIn) {
    next({ name: 'login' });
  } else {
    // We REMOVED the "if isLoggedIn go to home" block.
    // This allows the user to visit /login even if they are already logged in.
    next();
  }
});

export default router;