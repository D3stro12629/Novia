<template>
  <DashboardLayout>
    <div class="pv-wrap">

      <!-- ═════════ COVER + HERO ═════════ -->
      <div class="cover-shell">
        <div
          class="cover-bg"
          :style="profile.cover ? `background-image:url(${profile.cover})` : ''"
        />
        <div class="cover-gradient" />

        <div class="hero-content">
          <div class="hero-inner">

            <!-- Avatar -->
            <div class="av-shell">
              <img
                :src="profile.avatar"
                class="av-img"
                alt="avatar"
              />
              <span class="av-online" />
            </div>

            <!-- Info -->
            <div class="hero-text">
              <h2 class="hero-name">{{ profile.full_name }}</h2>

              <p class="hero-role" v-if="profile.professional?.job_title">
                {{ profile.professional.job_title }}
                <span v-if="profile.professional?.company_name">
                  @ {{ profile.professional.company_name }}
                </span>
              </p>

              <div class="hero-meta">
                <span class="meta-chip">
                  <Mail :size="11" /> {{ profile.email || '—' }}
                </span>
              </div>
            </div>

            <!-- Stats -->
            <div class="hero-stats">
              <div class="stat-box">
                <span class="stat-num">{{ postCount }}</span>
                <span class="stat-lbl">Posts</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ═════════ CONTENT ═════════ -->
      <div class="pv-content">
        <div class="pv-grid">

          <!-- LEFT -->
          <div class="main-col">

            <!-- POSTS -->
            <div class="section-label">
              <Newspaper :size="13" /> My Posts
              <router-link to="/create-post" class="btn btn-primary btn-sm ms-auto">
                <Plus :size="14" /> Create Post
              </router-link>
            </div>

            <div v-if="loadingPosts">Loading...</div>

            <div v-else>
              <PostCard
                v-for="post in paginatedPosts"
                :key="post.id"
                :post="post"
                class="mb-3"
              />
            </div>

            <!-- PAGINATION -->
            <div class="pager" v-if="totalPages > 1">
              <button
                class="page-btn"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <ChevronLeft :size="14" />
              </button>

              <button
                v-for="p in totalPages"
                :key="p"
                class="page-btn"
                :class="{ active: p === currentPage }"
                @click="currentPage = p"
              >
                {{ p }}
              </button>

              <button
                class="page-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <ChevronRight :size="14" />
              </button>
            </div>

          </div>

          <!-- SIDEBAR -->
          <aside class="side-col">
            <div class="side-card">
              <p class="side-title">Stats</p>

              <div class="side-stat">
                <span>Total Posts</span>
                <strong>{{ postCount }}</strong>
              </div>

              <div class="side-stat">
                <span>User ID</span>
                <strong>#{{ profile.id }}</strong>
              </div>

              <div class="side-stat">
                <span>Email</span>
                <strong>{{ profile.email || '—' }}</strong>
              </div>

            </div>
          </aside>

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

import {
  Mail, Newspaper, ChevronLeft, ChevronRight, Plus
} from 'lucide-vue-next'

const postStore = usePostStore()
const auth = useAuthStores()

// =====================
// LOAD ALL POSTS
// =====================
const loadingPosts = ref(false)

onMounted(async () => {
  loadingPosts.value = true
  try {
    await postStore.fetchPosts() // MUST return ALL posts
  } finally {
    loadingPosts.value = false
  }
})

// =====================
// PROFILE SAFE
// =====================
const profile = computed(() => {
  const u = auth.user || {}

  return {
    id: u.id,
    full_name: u.full_name || 'User',
    avatar: u.avatar || 'https://i.pravatar.cc/150',
    cover: u.cover || '',
    email: u.email || '',
    professional: u.professional || null
  }
})

// =====================
// ALL POSTS
// =====================
const allPosts = computed(() => postStore.posts || [])

// =====================
// FILTER OWN POSTS
// =====================
const ownPosts = computed(() => {
  if (!auth.user?.id) return []

  return allPosts.value.filter(p =>
    p.user_id === auth.user.id ||
    p.creator?.id === auth.user.id
  )
})

// =====================
// POST COUNT (REAL-TIME)
// =====================
const postCount = computed(() => ownPosts.value.length)

// =====================
// PAGINATION (CLIENT SIDE)
// =====================
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
.pv-wrap {
  background: #f6f5ff;
  min-height: 100vh;
  font-family: system-ui, -apple-system, Segoe UI, sans-serif;
}

/* =======================
   COVER
======================= */
.cover-shell {
  position: relative;
  height: 280px;
  overflow: hidden;
  border-bottom: 1px solid #e9e3ff;
}

.cover-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: saturate(1.1);
}

.cover-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.05),
    rgba(20,10,50,0.7)
  );
}

/* =======================
   HERO
======================= */
.hero-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 24px 18px;
}

.hero-inner {
  max-width: 1100px;
  margin: auto;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.av-shell {
  position: relative;
}

.av-img {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
}

.av-online {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 14px;
  height: 14px;
  background: #22c55e;
  border: 2px solid #fff;
  border-radius: 50%;
}

.hero-text {
  flex: 1;
  color: white;
}

.hero-name {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
}

.hero-role {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 3px;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(6px);
}

/* =======================
   STATS
======================= */
.hero-stats {
  display: flex;
  gap: 14px;
}

.stat-box {
  text-align: center;
  color: white;
}

.stat-num {
  font-size: 1.5rem;
  font-weight: 800;
}

.stat-lbl {
  font-size: 0.7rem;
  opacity: 0.8;
}

/* =======================
   LAYOUT
======================= */
.pv-content {
  max-width: 1100px;
  margin: auto;
  padding: 20px 16px 60px;
}

.pv-grid {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 18px;
}

@media (max-width: 900px) {
  .pv-grid {
    grid-template-columns: 1fr;
  }
}

/* =======================
   SECTION TITLE
======================= */
.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #7c3aed;
  margin: 10px 0 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* =======================
   POST CARD (wrapper spacing)
======================= */
.mb-3 {
  margin-bottom: 14px;
}

/* =======================
   SIDEBAR
======================= */
.side-col {
  position: sticky;
  top: 70px;
}

.side-card {
  background: white;
  border: 1px solid #e9e3ff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 6px 20px rgba(124,58,237,0.08);
}

.side-title {
  font-size: 0.7rem;
  font-weight: 800;
  color: #7c3aed;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.side-stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  padding: 6px 0;
  color: #6b7280;
}

.side-stat strong {
  color: #111827;
}

/* =======================
   PAGINATION
======================= */
.pager {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 18px;
}

.page-btn {
  min-width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #e9e3ff;
  background: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: 0.2s;
}

.page-btn:hover {
  border-color: #7c3aed;
  color: #7c3aed;
  transform: translateY(-1px);
}

.page-btn.active {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
