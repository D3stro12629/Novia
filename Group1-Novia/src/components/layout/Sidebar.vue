<template>
  <aside :class="['novia-sidebar', { 'is-open': isOpen, 'is-mobile': !isDesktop }]">
    <div class="sidebar-content">
      
      <!-- Mobile Header -->
      <div class="sidebar-mobile-header">
        <div class="brand-sm">
          <i class="bi bi-hexagon-fill"></i>
          <span>Novia</span>
        </div>
        <button class="close-btn" @click="$emit('close')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <!-- Main Menu Group -->
        <div class="nav-group">
          <span class="nav-label">Main Menu</span>
          <ul>
            <li v-for="(item, index) in menuItems" :key="index">
              <!-- Using active-class="active" fixes the styling issues -->
              <router-link 
                :to="item.path" 
                class="nav-link" 
                active-class="active"
                @click="handleNavClick"
              >
                <span class="link-icon">
                  <i :class="['bi', item.icon]"></i>
                </span>
                <span class="link-text">{{ item.label }}</span>
                <!-- Indicator shows only when the route is active -->
                <span v-if="$route.path === item.path" class="active-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Settings Group -->
        <div class="nav-group">
          <span class="nav-label">Settings</span>
          <ul>
            <li>
              <router-link to="/settings" class="nav-link" active-class="active" @click="handleNavClick">
                <span class="link-icon"><i class="bi bi-gear"></i></span>
                <span class="link-text">Settings</span>
              </router-link>
            </li>
            <li>
              <router-link to="/messages" class="nav-link" active-class="active" @click="handleNavClick">
                <span class="link-icon"><i class="bi bi-chat-dots"></i></span>
                <span class="link-text">Message</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Account Group (Bottom) -->
        <div class="nav-group bottom">
          <span class="nav-label">Account</span>
          <a href="javascript:void(0)" @click="handleLogout" class="nav-link logout">
            <span class="link-icon">
              <i class="bi bi-box-arrow-left"></i>
            </span>
            <span class="link-text">Log Out</span>
          </a>
        </div>

      </nav>
    </div>
  </aside>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStores } from '@/stores/auth'

const props = defineProps({
  isOpen: { type: Boolean, default: true }
})

const emit = defineEmits(['close'])
const router = useRouter()
const route = useRoute()
const auth = useAuthStores()

const isDesktop = computed(() => window.innerWidth >= 992)

// Updated Menu Items with correct paths
const menuItems = ref([
  { label: 'Home', icon: 'bi-house-door', path: '/home' },
  { label: 'About', icon: 'bi-people', path: '/about' },
  { label: 'Contact', icon: 'bi-envelope', path: '/contact' },
  { label: 'Help', icon: 'bi-question-circle', path: '/help' },
])

const handleNavClick = () => {
  if (!isDesktop.value) {
    emit('close')
  }
}

const handleLogout = () => {
  if(confirm("Logout from Novia?")) {
    auth.isLoggedIn = false
    localStorage.clear()
    router.push('/')
  }
}
</script>
<style scoped>
/* SIDEBAR BASE */
.novia-sidebar {
  width: 260px;
  height: calc(100vh - 70px);
  position: fixed;
  left: 0;
  top: 70px;
  background: white;
  border-right: 1px solid #e2e8f0;
  z-index: 1020;
  transition: transform 0.3s ease;
}

.novia-sidebar.is-mobile {
  transform: translateX(-100%);
  top: 0;
  height: 100vh;
}

.novia-sidebar.is-open {
  transform: translateX(0);
}

.sidebar-content {
  height: 100%;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
}

/* NAV LINKS */
.nav-group { margin-bottom: 1.5rem; }
.nav-group.bottom { margin-top: auto; border-top: 1px solid #f1f5f9; padding-top: 1rem; }
.nav-label { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; padding-left: 1rem; margin-bottom: 0.5rem; display: block; }

ul { list-style: none; padding: 0; margin: 0; }

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  border-radius: 10px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 4px;
  transition: all 0.2s;
}

/* THE ACTIVE STYLE */
.nav-link.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.nav-link:hover:not(.active) {
  background: #f8fafc;
  color: #6366f1;
}

.link-icon { font-size: 1.2rem; }

/* LOGOUT STYLE */
.logout { color: #ef4444; margin-top: 10px; }
.logout:hover { background: #fef2f2 !important; color: #dc2626 !important; }

/* PULSING DOT */
.active-indicator {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

@media (max-width: 991px) {
  .sidebar-mobile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
}
</style>