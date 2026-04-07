import { createRouter, createWebHistory } from "vue-router";
import { useAuthStores } from "@/stores/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegitsterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: () => import("@/views/Auth/Forgetpw.vue"),
    },
    {
      path: "/verify-otp",
      name: "verify-otp",
      component: () => import("@/views/Auth/VerifyOtp.vue"),
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("@/views/Auth/ResetPassword.vue"),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  const auth = useAuthStores();

  if (!auth.isLoggedIn && to.meta.require) {
    return { name: "login" };
  }

  return true;
});

export default router;