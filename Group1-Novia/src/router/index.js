import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStores } from '../stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
<<<<<<< HEAD
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
=======
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/ForbiddenView.vue'),
    },
    {
<<<<<<< HEAD
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '/settings',
          component: () => import('../views/SettingsView.vue'),
        }
      ]
    },  
    //    {
    //   path: "/",
    //   component: DashboardLayout,
    //   children: [
    //     {
    //       path: "",
    //       name: "home",
    //       component: HomeView,
    //       // meta: {
    //       //   title: "Dashboard",
    //       // },
    //     },
    //     {
    //       path: "category",
    //       name: "category",
    //       component: CategoryView,
    //       // meta: {
    //       //   title: "Category List",
    //       // },
    //     },
    //     {
    //       path: "profile",
    //       name: "profile",
    //       component: ProfileView,
    //       // meta: {
    //       //   title: "Profile View",
    //       // },
    //     },
    //   ],
    // },
>>>>>>> 175be5bbba3490f7f77b669bf9f5d4aad3052223
=======
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

>>>>>>> 024adc2f26af7ace16df5ae648fa7bc5123cd2f9
  ],
});

router.beforeEach((to, from) => {
  const auth = useAuthStores();

  if (!auth.isLoggedIn && to.meta.require) {
    return { name: "login" };
  }

  return true;
});

export default router;