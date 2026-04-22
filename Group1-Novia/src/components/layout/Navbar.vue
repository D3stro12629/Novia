<template>
    <nav class="novia-navbar">
        <div class="navbar-container">
            <!-- Left: Brand -->
            <div class="navbar-section left">
                <router-link to="/settings" class="brand">
                    <div class="logo-icon">
                        <i class="bi bi-hexagon-fill"></i>
                    </div>
                    <span class="logo-text">Novia</span>
                </router-link>
            </div>

            <!-- Center: Search -->
            <div class="navbar-section center">
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" placeholder="Search..." class="search-input">
                </div>
            </div>

            <!-- Right: Actions -->
            <div class="navbar-section right">
                <div class="nav-actions">
                    <!-- Notifications -->
                    <button class="action-btn" @click="toggleNotifications">
                        <i class="bi bi-bell-fill"></i>
                        <span class="notification-dot"></span>
                    </button>

                    <!-- Messages -->
                    <button class="action-btn" @click="toggleMessages">
                        <i class="bi bi-chat-dots-fill"></i>
                        <span class="badge">{{ unreadMessages }}</span>
                    </button>

                    <!-- User Profile Dropdown -->
                    <div class="user-profile-dropdown" ref="dropdownRef">
                        <div class="user-profile" @click="toggleProfileDropdown">
                            <img :src="userAvatar" alt="Profile" class="user-avatar">
                            <span class="user-name">{{ userName }}</span>
                            <i class="bi bi-chevron-down dropdown-icon" :class="{ 'rotate': showProfileDropdown }"></i>
                        </div>

                        <div v-if="showProfileDropdown" class="profile-dropdown-menu">
                            <router-link to="/profile" class="dropdown-item" @click="closeDropdown">
                                <i class="bi bi-person-circle"></i>
                                <span>My Profile</span>
                            </router-link>
                            <router-link to="/profileDetail" class="dropdown-item" @click="closeDropdown">
                                <i class="bi bi-person-fill"></i>
                                <span>Profile Details</span>
                            </router-link>
                            <router-link to="/settings" class="dropdown-item" @click="closeDropdown">
                                <i class="bi bi-gear"></i>
                                <span>Settings</span>
                            </router-link>
                            <hr class="dropdown-divider">
                            <button class="dropdown-item" @click="logout">
                                <i class="bi bi-box-arrow-right"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStores } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStores()

// Reactive data
const unreadMessages = ref(3)
const showProfileDropdown = ref(false)
const dropdownRef = ref(null)

// Computed properties for user data
const userAvatar = computed(() => auth.user?.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff')
const userName = computed(() => auth.user?.full_name || 'User')

// Functions
const toggleNotifications = () => {
    // TODO: Implement notifications panel
    console.log('Toggle notifications')
}

const toggleMessages = () => {
    router.push('/messages')
}

const toggleProfileDropdown = () => {
    showProfileDropdown.value = !showProfileDropdown.value
}

const closeDropdown = () => {
    showProfileDropdown.value = false
}

const logout = () => {
    auth.logout()
    router.push('/login')
    closeDropdown()
}

// Click outside to close dropdown
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showProfileDropdown.value = false
    }
}

// Lifecycle
onMounted(async () => {
    document.addEventListener('click', handleClickOutside)
    // Fetch user data when component mounts
    if (auth.isLoggedIn) {
        console.log('Navbar: User is logged in, fetching user data...')
        await auth.fetchUser()
        console.log('Navbar: User data after fetch:', auth.user)
    } else {
        console.log('Navbar: User is not logged in')
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.novia-navbar {
    position: sticky;
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

.action-btn:hover {
    background: #f1f5f9;
    color: #6366f1;
    transform: translateY(-2px);
}

.notification-dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
}

.badge {
    position: absolute;
    top: 6px;
    right: 6px;
    min-width: 18px;
    height: 18px;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    padding: 0 4px;
}

/* User Profile Dropdown */
.user-profile-dropdown {
    position: relative;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: #f8fafc;
    transition: all 0.2s;
    cursor: pointer;
}

.user-profile:hover {
    background: #f1f5f9;
    transform: translateY(-1px);
}

.dropdown-icon {
    font-size: 0.8rem;
    color: #64748b;
    transition: transform 0.2s;
}

.dropdown-icon.rotate {
    transform: rotate(180deg);
}

.profile-dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 200px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(226, 232, 240, 0.8);
    z-index: 1050;
    overflow: hidden;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #374151;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
}

.dropdown-item:hover {
    background: #f8fafc;
    color: #6366f1;
}

.dropdown-item i {
    font-size: 1rem;
    width: 18px;
}

.dropdown-divider {
    margin: 0.5rem 0;
    border: 0;
    border-top: 1px solid #e5e7eb;
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
}

/* Responsive */
@media (max-width: 768px) {
    .search-container {
        width: 200px;
    }

    .user-name {
        display: none;
    }

    .profile-dropdown-menu {
        min-width: 180px;
        right: -10px;
    }

    .navbar-container {
        padding: 0 1rem;
    }
}

@media (max-width: 576px) {
    .search-container {
        display: none;
    }

    .profile-dropdown-menu {
        min-width: 160px;
    }
}
</style>