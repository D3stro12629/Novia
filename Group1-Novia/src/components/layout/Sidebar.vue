<template>
  <aside :class="['novia-sidebar', { 'is-open': isOpen, 'is-mobile': !isDesktop }]">
    <div class="sidebar-content">
      <!-- Mobile Header -->
      <div class="sidebar-mobile-header d-lg-none">
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
        <div class="nav-group">
          <span class="nav-label">Main Menu</span>
          <ul>
            <li v-for="(item, index) in menuItems" :key="index">
              <router-link to="/settings" class="nav-link" :class="{ active: activeItem === index }"
                @click="setActive(index)">
                <span class="link-icon">
                  <i :class="['bi', item.icon]"></i>
                </span>
                <span class="link-text">{{ item.label }}</span>
                <span v-if="activeItem === index" class="active-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav-group">
          <span class="nav-label">Settings</span>
          <ul>
            <li>
              <router-link to="/settings" class="nav-link" :class="{ active: activeItem === 'settings' }"
                @click="setActive('settings')">
                <span class="link-icon">
                  <i class="bi bi-gear"></i>
                </span>
                <span class="link-text">Settings</span>
                <span v-if="activeItem === 'settings'" class="active-indicator"></span>
              </router-link>
            </li>
            <li>
              <router-link to="/messages" class="nav-link" :class="{ active: activeItem === 'messages' }"
                @click="setActive('messages')">
                <span class="link-icon">
                  <i class="bi bi-chat-dots"></i>
                </span>
                <span class="link-text">Message</span>
                <span v-if="activeItem === 'messages'" class="active-indicator"></span>
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="nav-link" :class="{ active: activeItem === 'privacy' }"
                @click="setActive('privacy')">
                <span class="link-icon">
                  <i class="bi bi-shield-check"></i>
                </span>
                <span class="link-text">Privacy & Security</span>
                <span v-if="activeItem === 'privacy'" class="active-indicator"></span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="nav-group bottom">
          <span class="nav-label">Account</span>
          <router-link to="/settings" class="nav-link logout">
            <span class="link-icon">
              <i class="bi bi-box-arrow-left"></i>
            </span>
            <span class="link-text">Log Out</span>
          </router-link>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const activeItem = ref('settings')
const windowWidth = ref(window.innerWidth)

const isDesktop = computed(() => windowWidth.value >= 992)

const menuItems = ref([
  { label: 'Home', icon: 'bi-house-door' },
  { label: 'About', icon: 'bi-people' },
  { label: 'Contact', icon: 'bi-envelope' },
])

const setActive = (key) => {
  activeItem.value = key
  if (!isDesktop.value) {
    emit('close')
  }
}

// Handle resize
watch(() => props.isOpen, (val) => {
  if (!isDesktop.value) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<style scoped>
.novia-sidebar {
  width: 260px;
  height: calc(100vh - 70px);
  position: fixed;
  left: 0;
  top: 70px;
  background: rgba(255, 255, 255, 0.98);
  border-right: 1px solid #e2e8f0;
  z-index: 1020;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

/* Mobile Styles */
.novia-sidebar.is-mobile {
  transform: translateX(-100%);
  top: 0;
  height: 100vh;
  z-index: 1040;
  background: white;
}

.novia-sidebar.is-mobile.is-open {
  transform: translateX(0);
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  overflow-y: auto;
}

/* Mobile Header */
.sidebar-mobile-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

@media (max-width: 991px) {
  .sidebar-mobile-header {
    display: flex;
  }
}

.brand-sm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

.brand-sm i {
  color: #6366f1;
  font-size: 1.5rem;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
  transform: rotate(90deg);
}

/* Navigation */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-group {
  margin-bottom: 2rem;
}

.nav-group.bottom {
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

.nav-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.nav-link:hover {
  background: #f8fafc;
  color: #6366f1;
  transform: translateX(4px);
}

.nav-link.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
}

.link-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.nav-link:hover .link-icon {
  background: rgba(99, 102, 241, 0.1);
}

.nav-link.active .link-icon {
  background: rgba(255, 255, 255, 0.2);
}

.link-text {
  flex: 1;
  font-size: 0.95rem;
}

.active-indicator {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

/* Logout */
.nav-link.logout {
  color: #ef4444;
}

.nav-link.logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

.nav-link.logout .link-icon {
  background: #fef2f2;
}
</style>