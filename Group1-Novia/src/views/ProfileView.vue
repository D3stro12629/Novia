<template>
  <DashboardLayout>
    <div class="profile-page">

      <!-- HERO -->
      <div class="hero-banner">
        <div class="hero-bg" :style="profile.cover ? `background-image:url(${profile.cover})` : ''"></div>
        <div class="hero-overlay"></div>

        <div class="container">
          <div class="hero-content">
            <div class="avatar-wrap">
              <img :src="profile.avatar" class="avatar-img" />
            </div>

            <div class="hero-info">
              <h2 class="hero-name">{{ profile.full_name }}</h2>
              <p class="hero-role">
                {{ profile.professional?.job_title || 'Frontend Developer' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- TABS -->
      <div class="profile-tabs">
        <div class="container">
          <div class="tabs">

            <span class="tab" :class="{ active: activeTab === 'overview' }"
              @click="activeTab = 'overview'">Overview</span>

            <span class="tab" :class="{ active: activeTab === 'professional' }"
              @click="activeTab = 'professional'">Professional</span>

            <span class="tab" :class="{ active: activeTab === 'education' }"
              @click="activeTab = 'education'">Education</span>

            <span class="tab" :class="{ active: activeTab === 'collaboration' }"
              @click="activeTab = 'collaboration'">Collaboration</span>

            <span class="tab" :class="{ active: activeTab === 'cv' }" @click="activeTab = 'cv'">CV</span>

          </div>
        </div>
      </div>

      <!-- MAIN -->
      <div class="container">
        <div class="row">

          <!-- LEFT SIDEBAR -->
          <div class="col-3">

            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Contact Information</h6>
                <p class="card-text">{{ profile.email || '—' }}</p>
                <p class="card-text">{{ profile.phone || '—' }}</p>
                <p class="card-text">{{ profile.current_city }}</p>

                <button class="btn-primary w-full">Collaboration</button>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Professional Skills</h6>
                <p class="card-text">{{ profile.professional?.job_title || 'No skills added yet.' }}</p>
                <p class="card-text">{{ profile.professional?.company_name || 'No skills added yet.' }}</p>
                <p class="card-text">{{ profile.professional?.responsibility || 'No skills added yet.' }}</p>


              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h6 class="card-title">Education Summary</h6>
                <p class="card-text">{{ profile.educations?.school || 'No education history added.' }}</p>
              </div>
            </div>

          </div>

          <!-- RIGHT CONTENT -->
          <div class="col-8 my-3">

            <!-- OVERVIEW -->

            <div v-if="activeTab === 'overview'" class="card">
              <div class="card-body">
                <h6 class="card-title">My Posts ({{ postCount }})</h6>
                <div class="section-label">
                  <router-link to="/create-post" class="btn btn-primary btn-sm ms-auto">
                    <Plus :size="14" /> Create Post
                  </router-link>
                </div>

                <div v-if="loadingPosts" class="text-center">
                  <div class="spinner"></div>
                </div>

                <div v-else-if="paginatedPosts.length">
                  <PostCard v-for="post in paginatedPosts" :key="post.id" :post="post" class="mb-3" />
                </div>

                <div v-else class="text-center">
                  <p class="card-text">No posts yet</p>
                </div>

                <!-- PAGINATION -->
                <div class="pager" v-if="totalPages > 1">
                  <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>

                  <button v-for="p in totalPages" :key="p" class="page-btn" :class="{ active: p === currentPage }"
                    @click="currentPage = p">
                    {{ p }}
                  </button>

                  <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
                </div>
              </div>
            </div>

            <!-- COLLAB -->
            <div v-if="activeTab === 'collaboration'" class="card">
              <div class="card-body text-center">

                <h5 class="card-title">Collaboration Opportunities</h5>

                <div class="empty-state">
                  <i class="bi bi-people"></i>
                  <h4>No Collaborations Yet</h4>
                  <p class="card-text">
                    Post your first collaboration opportunity to connect with partners.
                  </p>

                  <button class="btn-primary">+ Add Collaboration</button>
                </div>

              </div>
            </div>

            <!-- PROFESSIONAL -->
            <div v-if="activeTab === 'professional'" class="card">
              <div class="card-body">
                <h6 class="card-title">Professional Info</h6>
                <p class="card-text">No data yet</p>
              </div>
            </div>

            <!-- EDUCATION -->
            <div v-if="activeTab === 'education'" class="card">
              <div class="card-body">
                <h6 class="card-title">Education</h6>
                <p class="card-text">No data yet</p>
              </div>
            </div>

            <!-- CV -->
            <div v-if="activeTab === 'cv'" class="card">
              <div class="card-body">
                <h6 class="card-title">CV</h6>
                <p class="card-text">No CV uploaded</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import { useAuthStores } from '@/stores/auth'
import PostCard from '@/components/PostCard.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const postStore = usePostStore()
const auth = useAuthStores()

const activeTab = ref('collaboration') // DEFAULT TAB

const loadingPosts = ref(false)

onMounted(async () => {
  loadingPosts.value = true
  try {
    await postStore.fetchPosts()
  } finally {
    loadingPosts.value = false
  }
})

const profile = computed(() => {
  const u = auth.user || {}

  return {
    id: u.id,
    full_name: u.full_name || 'User',
    avatar: u.avatar || 'https://i.pravatar.cc/150',
    cover: u.cover || '',
    email: u.email || '',
    phone: u.phone || '',
    current_city: u.current_city || '',
    professional: u.professional || null,
    job_title: u.professional?.job_title || [],
    company_name: u.professional?.company_name || [],
    responsibility: u.professional?.responsibility || [],
    educations: u.educations || null,
    school: u.educations?.school || null


  }
})

const allPosts = computed(() => postStore.posts || [])

const ownPosts = computed(() => {
  if (!auth.user?.id) return []
  return allPosts.value.filter(p =>
    p.user_id === auth.user.id ||
    p.creator?.id === auth.user.id
  )
})

const postCount = computed(() => ownPosts.value.length)

const currentPage = ref(1)
const perPage = 5

const totalPages = computed(() =>
  Math.max(1, Math.ceil(ownPosts.value.length / perPage))
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return ownPosts.value.slice(start, start + perPage)
})
</script>

<style scoped>
.profile-page {
  background: #f3f4f6;
  min-height: 100vh;
}

/* HERO */
.hero-banner {
  height: 240px;
  position: relative;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
}

.hero-content {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding-top: 140px;
}

/* AVATAR */
.avatar-wrap {
  width: 100px;
  height: 100px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #fff;
}

/* INFO */
.hero-name {
  color: #fff;
}

.hero-role {
  color: #e5e7eb;
}

/* TABS */
.profile-tabs {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.tabs {
  display: flex;
  gap: 24px;
  padding: 14px 0;
}

.tab {
  cursor: pointer;
  color: #6b7280;
}

.tab.active {
  color: #111;
  border-bottom: 2px solid #111;
}

/* GRID */
.row {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.col-4 {
  width: 30%;
}

.col-8 {
  width: 70%;
}

/* CARD */
.card {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-weight: 600;
}

.card-text {
  color: #6b7280;
}

/* BUTTON */
.btn-primary {
  background: #111;
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.w-full {
  width: 100%;
}

/* EMPTY */
.empty-state {
  padding: 40px 0;
  text-align: center;
}

/* SPINNER */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #ddd;
  border-top: 3px solid #111;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* PAGER */
.pager {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
}

.page-btn.active {
  background: #111;
  color: #fff;
}

/* UTIL */
.mt-3 {
  margin-top: 16px;
}

.mb-3 {
  margin-bottom: 12px;
}
</style>