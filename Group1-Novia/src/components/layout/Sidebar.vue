<template>
  <aside :class="['novia-sidebar', { 'is-open': isOpen, 'is-mobile': !isDesktop }]">
    
    <!-- Overlay (Mobile) -->
    <div v-if="isOpen && !isDesktop" class="sidebar-overlay" @click="$emit('close')"></div>

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

        <!-- Main -->
        <div class="nav-group">
          <span class="nav-label">Main Menu</span>
          <ul>
            <li v-for="item in menuItems" :key="item.key">
              <router-link
                :to="item.to"
                class="nav-link"
                :class="{ active: activeItem === item.key }"
                @click="setActive(item.key)"
              >
                <span class="link-icon">
                  <i :class="['bi', item.icon]"></i>
                </span>
                <span class="link-text">{{ item.label }}</span>
                <span v-if="activeItem === item.key" class="active-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Settings -->
        <div class="nav-group">
          <span class="nav-label">Settings</span>
          <ul>
            <li v-for="item in settingsItems" :key="item.key">
              <router-link
                :to="item.to"
                class="nav-link"
                :class="{ active: activeItem === item.key }"
                @click="setActive(item.key)"
              >
                <span class="link-icon">
                  <i :class="['bi', item.icon]"></i>
                </span>
                <span class="link-text">{{ item.label }}</span>
                <span v-if="activeItem === item.key" class="active-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Logout -->
        <div class="nav-group bottom">
          <span class="nav-label">Account</span>
          <button class="nav-link logout" @click="handleLogout">
            <span class="link-icon">
              <i class="bi bi-box-arrow-left"></i>
            </span>
            <span class="link-text">Log Out</span>
          </button>
        </div>

      </nav>
    </div>
  </aside>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router' // Fixed
// import { useAuthStores } from '@/stores/auth' // Make sure this exists!

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const router = useRouter()
const route = useRoute() 
// const auth = useAuthStores() // Uncomment if imported

const windowWidth = ref(window.innerWidth)
const isDesktop = computed(() => windowWidth.value >= 992)

/* Menu Data */
const menuItems = [
  { key: 'home', label: 'Home', icon: 'bi-house-door', to: '/' },
  { key: 'about', label: 'About', icon: 'bi-people', to: '/about' },
  { key: 'contact', label: 'Contact', icon: 'bi-envelope', to: '/contact' },
]

const settingsItems = [
  { key: 'settings', label: 'Settings', icon: 'bi-gear', to: '/settings' },
  { key: 'messages', label: 'Message', icon: 'bi-chat-dots', to: '/messages' },
  { key: 'Help', label: 'Help', icon: 'bi-shield-check', to: '/help' },
]

/* Logic to determine which item is active based on URL */
const activeItem = computed(() => {
  const allItems = [...menuItems, ...settingsItems]
  const currentItem = allItems.find(item => item.to === route.path)
  return currentItem ? currentItem.key : ''
})

const setActive = () => {
  if (!isDesktop.value) emit('close')
}

// ... rest of your code
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
/* Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1030;
}

/* Fix mobile header always hidden on desktop */
.sidebar-mobile-header {
  display: none;
}

@media (max-width: 991px) {
  .sidebar-mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
}

/* Better sidebar layering */
.novia-sidebar {
  z-index: 1040;
}

/* Improve button reset */
.nav-link.logout {
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
</style>