import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
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
  ],
})

export default router
