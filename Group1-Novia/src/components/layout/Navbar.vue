<template>
    <nav class="novia-navbar">
        <div class="navbar-container">
            <!-- Left: Toggle + Brand -->
            <div class="navbar-section left">
                <button class="mobile-toggle d-lg-none" @click="$emit('toggle-sidebar')" aria-label="Toggle menu">
                    <i class="bi bi-list"></i>
                </button>

                <router-link to="/settings" class="brand">
                    <div class="logo-icon">
                        <i class="bi bi-hexagon-fill"></i>
                    </div>
                    <span class="logo-text">Novia</span>
                </router-link>
            </div>

            <!-- Center: Search -->
            <div class="navbar-section center d-none d-md-flex">
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" placeholder="Search..." class="search-input">
                </div>
            </div>

            <!-- Right: Actions -->
            <div class="navbar-section right">
                <div class="nav-actions">
                    <router-link to="/settings" class="action-btn d-none d-lg-flex">
                        <i class="bi bi-house-door-fill"></i>
                    </router-link>

                    <router-link to="/settings" class="action-btn d-none d-lg-flex">
                        <i class="bi bi-chat-dots-fill"></i>
                        <span class="badge">2</span>
                    </router-link>

                    <!-- Notifications Dropdown -->
                    <div class="dropdown-container">
                        <button class="action-btn" @click.stop="toggleDropdown('notifications')"
                            :class="{ active: activeDropdown === 'notifications' }">
                            <i class="bi bi-bell-fill"></i>
                            <span class="badge pulse">3</span>
                        </button>

                        <Transition name="dropdown">
                            <div v-if="activeDropdown === 'notifications'" class="dropdown-menu notifications-dropdown">
                                <div class="dropdown-header">
                                    <h6>Notifications</h6>
                                    <router-link to="/settings" class="mark-read">Mark all read</router-link>
                                </div>
                                <div class="dropdown-items">
                                    <router-link v-for="i in 3" :key="i" to="/settings" class="notification-item">
                                        <div class="notif-avatar" :class="`color-${i}`">
                                            <i class="bi bi-person-fill"></i>
                                        </div>
                                        <div class="notif-content">
                                            <p><strong>User {{ i }}</strong> liked your post</p>
                                            <span>{{ i }}m ago</span>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <!-- Profile Dropdown -->
                    <div class="dropdown-container">
                        <button class="profile-btn" @click.stop="toggleDropdown('profile')"
                            :class="{ active: activeDropdown === 'profile' }">
                            <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="Profile">
                            <div class="status-indicator"></div>
                        </button>

                        <Transition name="dropdown">
                            <div v-if="activeDropdown === 'profile'" class="dropdown-menu profile-dropdown">
                                <div class="profile-header">
                                    <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
                                        class="header-avatar">
                                    <div class="header-info">
                                        <h6>John Doe</h6>
                                        <span>@johndoe</span>
                                    </div>
                                </div>
                                <div class="dropdown-divider"></div>
                                <router-link to="/settings" class="dropdown-item">
                                    <i class="bi bi-person"></i> Profile
                                </router-link>
                                <router-link to="/settings" class="dropdown-item">
                                    <i class="bi bi-gear"></i> Settings
                                </router-link>
                                <div class="dropdown-divider"></div>
                                <router-link to="/settings" class="dropdown-item text-danger">
                                    <i class="bi bi-box-arrow-right"></i> Logout
                                </router-link>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['toggle-sidebar'])
const activeDropdown = ref(null)

const toggleDropdown = (name) => {
    activeDropdown.value = activeDropdown.value === name ? null : name
}

const closeDropdowns = (e) => {
    if (!e.target.closest('.dropdown-container')) {
        activeDropdown.value = null
    }
}

onMounted(() => {
    document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdowns)
})
</script>

<style scoped>
.novia-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    z-index: 1030;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 1.5rem;
    max-width: 100%;
}

.navbar-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/* Mobile Toggle */
.mobile-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s;
}

.mobile-toggle:hover {
    background: #f1f5f9;
    color: #6366f1;
}

@media (max-width: 991px) {
    .mobile-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

/* Brand */
.brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
}

.logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.5px;
}

/* Search */
.search-container {
    position: relative;
    width: 300px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
}

.search-input {
    width: 100%;
    height: 42px;
    background: #f1f5f9;
    border: 2px solid transparent;
    border-radius: 21px;
    padding: 0 1rem 0 2.5rem;
    font-size: 0.9rem;
    transition: all 0.3s;
}

.search-input:focus {
    outline: none;
    background: white;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Actions */
.nav-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-btn {
    position: relative;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #64748b;
    font-size: 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
}

.action-btn:hover,
.action-btn.active {
    background: #f1f5f9;
    color: #6366f1;
    transform: translateY(-2px);
}

.badge {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 18px;
    height: 18px;
    background: #ef4444;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
}

.badge.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}

/* Profile */
.profile-btn {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 2px solid transparent;
    padding: 2px;
    background: none;
    cursor: pointer;
    margin-left: 0.5rem;
    transition: all 0.2s;
}

.profile-btn:hover,
.profile-btn.active {
    border-color: #6366f1;
}

.profile-btn img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.status-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background: #10b981;
    border: 2px solid white;
    border-radius: 50%;
}

/* Dropdowns */
.dropdown-container {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: white;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    width: 280px;
    overflow: hidden;
    z-index: 1040;
}

.notifications-dropdown {
    width: 320px;
}

.dropdown-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown-header h6 {
    margin: 0;
    font-weight: 600;
}

.mark-read {
    font-size: 0.8rem;
    color: #6366f1;
    text-decoration: none;
}

.notification-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid #f8fafc;
    transition: background 0.2s;
}

.notification-item:hover {
    background: #f8fafc;
}

.notif-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
}

.notif-avatar.color-1 {
    background: #ec4899;
}

.notif-avatar.color-2 {
    background: #3b82f6;
}

.notif-avatar.color-3 {
    background: #10b981;
}

.notif-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #475569;
}

.notif-content span {
    font-size: 0.8rem;
    color: #94a3b8;
}

/* Profile Dropdown */
.profile-header {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.header-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-info h6 {
    margin: 0;
    font-weight: 700;
    color: #1e293b;
}

.header-info span {
    font-size: 0.85rem;
    color: #64748b;
}

.dropdown-divider {
    height: 1px;
    background: #f1f5f9;
    margin: 0.5rem 0;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    color: #475569;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 0.95rem;
}

.dropdown-item:hover {
    background: #f8fafc;
    color: #6366f1;
    padding-left: 1.5rem;
}

.dropdown-item.text-danger {
    color: #ef4444;
}

.dropdown-item.text-danger:hover {
    background: #fef2f2;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}
</style>