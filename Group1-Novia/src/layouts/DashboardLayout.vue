<template>
  <div class="dashboard-shell">
    <!-- Fixed Navbar -->
    <Navbar @toggle-sidebar="handleToggleSidebar" />

    <!-- Layout Body -->
    <div class="dashboard-body row">
      <!-- Sidebar -->
      <div class="col-lg-3 col-xl-2">
        <Sidebar :is-open="isSidebarOpen" @close="closeSidebar" />
      </div>

      <!-- Main Content Area -->
      <div class="col-lg-9 col-xl-10">
        <main class="main-content" :class="{ 'sidebar-closed': !isSidebarOpen && isDesktop }">
          <div class="content-wrapper">
            <slot />
          </div>
        </main>
      </div>

      <!-- Mobile Overlay -->
      <Transition name="fade">
        <div v-if="isSidebarOpen && !isDesktop" class="mobile-overlay" @click="closeSidebar"></div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

const isSidebarOpen = ref(true)
const windowWidth = ref(1024)

const isDesktop = computed(() => windowWidth.value >= 992)

const handleResize = () => {
  windowWidth.value = window.innerWidth
  isSidebarOpen.value = isDesktop.value
}

const handleToggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.dashboard-shell {
  width: 100%;
  min-height: 100vh;
  color: #e2e8f0;
}

.dashboard-body {
  position: relative;
  padding-top: 40px;
  min-height: 100vh;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.main-content.sidebar-closed {
  margin-left: 0;
}

.content-wrapper {
  /* padding: 2rem; */
  max-width: 1200px;
  min-height: calc(100vh - 70px);
}

.mobile-overlay {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>