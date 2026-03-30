<template>
  <!-- Page Title -->
  <div class="d-flex align-items-center gap-3 mt-5 mb-4">
    <div class="icon-box-title">
      <User class="text-main" :size="28" />
    </div>
    <div>
      <h3 class="fw-bold mb-1">My Profile</h3>
      <p class="text-muted mb-0 small">Manage your account and details</p>
    </div>
  </div>

  <!-- ── Profile Header Card ── -->
  <div class="profile-header-card mb-4">
    <!-- Cover Banner -->
    <div
      class="cover-banner"
      :style="profile.cover ? `background-image:url(${profile.cover});background-size:cover;background-position:center` : ''"
    >
      <button class="btn btn-cover" @click="$emit('editCover')">
        <ImageIcon :size="15" class="me-1" /> Edit Cover
      </button>
    </div>

    <!-- Avatar + Info + Actions -->
    <div class="profile-body px-4 pb-3">
      <div class="avatar-row">

        <!-- Avatar -->
        <div class="position-relative avatar-wrapper">
          <img :src="avatarSrc" class="profile-avatar" alt="profile" />
          <div class="dropdown">
            <span class="avatar-edit-trigger" data-bs-toggle="dropdown">
              <Pencil :size="14" />
            </span>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm px-1">
              <li>
                <input id="uploadImage" type="file" @change="handleFile" accept="image/*" style="display:none" />
                <label for="uploadImage" class="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2">
                  <Pencil :size="15" /> Change Photo
                </label>
              </li>
              <li>
                <button
                  class="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-danger"
                  type="button"
                  @click="$emit('removeAvatar')"
                >
                  <Trash2 :size="15" /> Remove Photo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Name / role / meta -->
        <div class="profile-meta ms-3 mt-5 flex-grow-1">
          <h4 class="fw-bold mb-1 profile-name">{{ profile.full_name || '—' }}</h4>

          <!-- Job title + company from professional -->
          <p class="profile-role mb-2">
            {{ profile.professional?.job_title || '—' }}
            <span v-if="profile.professional?.company_name" class="text-muted fw-normal">
              @ {{ profile.professional.company_name }}
            </span>
          </p>

          <!-- Positions badges -->
          <div class="d-flex flex-wrap gap-2 mb-2" v-if="profile.positions?.length">
            <span class="badge-position" v-for="pos in profile.positions" :key="pos.id">
              {{ profile.professional.job_title }}
            </span>
          </div>

          <!-- Types badges -->
          <div class="d-flex flex-wrap gap-2 mb-2" v-if="profile.types?.length">
            <span class="badge-type" v-for="type in profile.types" :key="type.id">
              {{ type.name }}
            </span>
          </div>

          <div class="d-flex flex-wrap gap-3 mt-2 profile-meta-items">
            <span class="meta-item" v-if="profile.current_city">
              <MapPin :size="13" /> {{ profile.current_city }}
            </span>
            <span class="meta-item" v-if="profile.home_town">
              <Home :size="13" /> {{ profile.home_town }}
            </span>
            <a
              v-if="profile.portfolio_link"
              :href="profile.portfolio_link"
              target="_blank"
              class="meta-item meta-link"
            >
              <LinkIcon :size="13" /> {{ profile.portfolio_link }}
            </a>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="d-flex gap-2 align-items-start pt-2 flex-shrink-0">
          <button class="btn btn-outline-profile" @click="$emit('editProfile')">
            <Pencil :size="14" class="me-1" /> Edit Profile
          </button>
          <button class="btn btn-danger-soft" @click="$emit('signOut')">
            <LogOut :size="14" class="me-1" /> Sign out
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="profile-tabs mt-3">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>

  <!-- ── ALL POST: Post Feed ── -->
  <div v-if="activeTab === 'info'" class="fade-in">
 <button class="btn btn-cover" @click="$emit('newPost')">
        <square-pen :size="15" class="me-1" /> New Post
  </button>
    <!-- Loading skeleton -->
    <div v-if="postsLoading" class="post-card mb-3 p-4">
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="skeleton skeleton-circle" style="width:42px;height:42px;"></div>
        <div class="flex-grow-1">
          <div class="skeleton skeleton-line" style="width:140px;height:14px;margin-bottom:6px;"></div>
          <div class="skeleton skeleton-line" style="width:80px;height:11px;"></div>
        </div>
      </div>
      <div class="skeleton skeleton-line mb-2" style="width:100%;height:13px;"></div>
      <div class="skeleton skeleton-line mb-3" style="width:70%;height:13px;"></div>
      <div class="skeleton skeleton-img"></div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!posts.length" class="post-card p-5 text-center">
      <FileText :size="40" class="text-muted mb-3" />
      <p class="text-muted mb-0">No posts yet.</p>
    </div>

    <!-- Post cards -->
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post-card mb-3">

        <!-- Post header -->
        <div class="post-header d-flex align-items-start gap-3">
          <img
            :src="post.creator?.avatar || avatarSrc"
            class="post-avatar"
            alt=""
          />
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <p class="post-author mb-0">{{ post.creator?.full_name || '—' }}</p>
                <p class="post-meta-sub mb-0">
                  {{ post.creator?.current_city || '' }}
                  <span v-if="post.creator?.current_city"> · </span>
                  {{ formatDateTime(post.created_at) }}
                </p>
              </div>
              <button class="btn p-0 border-0 bg-transparent">
                <MoreHorizontal :size="18" class="text-muted" />
              </button>
            </div>
          </div>
        </div>

        <!-- Post text -->
        <div class="post-body" v-if="post.text">{{ post.text }}</div>

        <!-- Categories -->
        <div v-if="post.categories?.length" class="px-3 pb-2 d-flex flex-wrap gap-1">
          <span class="badge-position" v-for="cat in post.categories" :key="cat.id">
            {{ cat.name }}
          </span>
        </div>

        <!-- Main image -->
        <div v-if="post.image" class="post-image">
          <img :src="post.image" alt="post image" />
        </div>

        <!-- Attachments (secondary image) -->
        <div v-else-if="post.attachments" class="post-image">
          <img :src="post.attachments" alt="attachment" />
        </div>

        <!-- Stats row -->
        <div class="post-stats">
          <span class="d-flex align-items-center gap-1">
            <Heart :size="13" style="color:#7c3aed;" />
            {{ post.likes_count ?? 0 }} Likes
          </span>
          <span>{{ post.comments_count ?? 0 }} Comments</span>
        </div>

        <!-- Action buttons -->
        <div class="post-actions">
          <button
            class="action-btn"
            :class="{ 'action-liked': post.liked }"
            @click="toggleLike(post)"
          >
            <Heart :size="15" />
            {{ post.liked ? 'Liked' : 'Like' }}
          </button>
          <button class="action-btn" @click="$emit('commentPost', post)">
            <MessageSquare :size="15" /> Comment
          </button>
          <button class="action-btn" @click="$emit('sharePost', post)">
            <Share2 :size="15" /> Share
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── ABOUT: Professional ── -->
  <div v-if="activeTab === 'about'" class="info-panel fade-in">
    <h5 class="panel-title">Professional Information</h5>
    <div class="row g-0">
      <div class="col-lg-6 pe-lg-5">
        <div class="info-row">
          <span class="info-label">Job Title</span>
          <p class="info-value">{{ profile.professional?.job_title || '—' }}</p>
        </div>
        <div class="info-row">
          <span class="info-label">Company</span>
          <p class="info-value">{{ profile.professional?.company_name || '—' }}</p>
        </div>
        <div class="info-row">
          <span class="info-label">Responsibility</span>
          <p class="info-value" style="white-space:pre-line;">{{ profile.professional?.responsibility || '—' }}</p>
        </div>
      </div>
      <div class="col-lg-6 ps-lg-4 border-start-lg">
        <div class="info-row">
          <span class="info-label">Positions</span>
          <div class="d-flex flex-wrap gap-2 mt-1">
            <span class="badge-position" v-for="pos in profile.positions" :key="pos.id">{{ pos.name }}</span>
            <span v-if="!profile.positions?.length" class="info-value">—</span>
          </div>
        </div>
        <div class="info-row mt-3">
          <span class="info-label">Types</span>
          <div class="d-flex flex-wrap gap-2 mt-1">
            <span class="badge-type" v-for="t in profile.types" :key="t.id">{{ t.name }}</span>
            <span v-if="!profile.types?.length" class="info-value">—</span>
          </div>
        </div>
        <div class="info-row mt-3">
          <span class="info-label">Collaboration Link</span>
          <p class="info-value">
            <a
              v-if="profile.collaboration?.company_link"
              :href="profile.collaboration.company_link"
              target="_blank"
              class="info-link"
            >{{ profile.collaboration.company_link }}</a>
            <span v-else>—</span>
          </p>
        </div>
        <div class="info-row">
          <span class="info-label">CV</span>
          <p class="info-value">
            <a v-if="profile.cv" :href="profile.cv" target="_blank" class="info-link">View CV</a>
            <span v-else class="text-muted" style="font-size:.85rem;">Not uploaded</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ── EDUCATION ── -->
  <div v-if="activeTab === 'education'" class="info-panel fade-in">
    <h5 class="panel-title">Education</h5>
    <div v-if="profile.educations?.length">
      <div class="timeline-item" v-for="edu in profile.educations" :key="edu.id">
        <p class="fw-bold mb-0">{{ edu.degree || edu.school || '—' }}</p>
        <p class="text-muted small mb-0">{{ edu.institution }} · {{ edu.year }}</p>
      </div>
    </div>
    <div v-else class="empty-state">
      <GraduationCap :size="36" class="mb-2 text-muted" />
      <p class="text-muted small">No education records yet.</p>
    </div>
  </div>

  <!-- ── PROJECTS ── -->
  <div v-if="activeTab === 'project'" class="info-panel fade-in">
    <h5 class="panel-title">Projects</h5>
    <div v-if="profile.projects?.length">
      <div class="proj-item" v-for="proj in profile.projects" :key="proj.id">
        <div class="d-flex align-items-center justify-content-between">
          <p class="fw-bold mb-1">{{ proj.title }}</p>
          <a :href="proj.link" target="_blank" class="proj-link">
            <ExternalLink :size="14" /> Visit
          </a>
        </div>
        <p class="info-link small mb-0">{{ proj.link }}</p>
      </div>
    </div>
    <div v-else class="empty-state">
      <FolderOpen :size="36" class="mb-2 text-muted" />
      <p class="text-muted small">No projects added yet.</p>
    </div>
  </div>

  <!-- ── SKILLS ── -->
  <div v-if="activeTab === 'skills'" class="info-panel fade-in">
    <h5 class="panel-title">Skills</h5>
    <div v-if="profile.skills?.length" class="d-flex flex-wrap gap-2">
      <span class="skill-badge" v-for="skill in profile.skills" :key="skill.id">
        {{ skill.name }}
      </span>
    </div>
    <div v-else class="empty-state">
      <Layers :size="36" class="mb-2 text-muted" />
      <p class="text-muted small">No skills added yet.</p>
    </div>
  </div>

</template>

<script setup>
import { useAuthStores } from "@/stores/auth"
import { ref, onMounted } from "vue"
import {
  User, Pencil, Trash2, ImageIcon, MapPin,
  Home, Link as LinkIcon, LogOut, GraduationCap,
  ExternalLink, FolderOpen, Layers,
  Heart, MessageSquare, Share2, MoreHorizontal, FileText
} from "lucide-vue-next"
import { usePostStore } from "@/stores/post"  // adjust path to your post store

// ── Stores ─────────────────────────────────────────────
const auth     = useAuthStores()
const postStore = usePostStore()

// ── State ──────────────────────────────────────────────
const profile      = ref({})
const avatarSrc    = ref("https://i.pinimg.com/736x/13/7f/60/137f60eb88c20c91362878bd395df867.jpg")
const activeTab    = ref("info")
const posts        = ref([])
const postsLoading = ref(true)

const tabs = [
  { key: "info",      label: "All Post"  },
  { key: "about",     label: "About"     },
  { key: "education", label: "Education" },
  { key: "project",   label: "Project"   },
  { key: "skills",    label: "Skills"    },
]

// ── Lifecycle ──────────────────────────────────────────
onMounted(async () => {
  await Promise.all([loadProfile(), loadPosts()])
})

async function loadProfile() {
  try {
    const res = await auth.profile()
    // res.data → { result, code, message, data: { id, full_name, avatar, ... } }
    if (res.data.result) {
      profile.value = res.data.data
      if (res.data.data.avatar) avatarSrc.value = res.data.data.avatar
    }
  } catch (e) {
    console.error("Failed to load profile", e)
  }
}

async function loadPosts() {
  postsLoading.value = true
  try {
    const res = await postStore.getMyPosts()
    // res.data → { result, code, message, data: [ { id, text, image, creator, categories, attachments, created_at }, ... ] }
    if (res.data.result) {
      posts.value = (res.data.data ?? []).map(p => ({ ...p, liked: false }))
    }
  } catch (e) {
    console.error("Failed to load posts", e)
  } finally {
    postsLoading.value = false
  }
}

// ── Methods ────────────────────────────────────────────
function handleFile(e) {
  const file = e.target.files[0]
  if (!file) return
  avatarSrc.value = URL.createObjectURL(file)
}

function toggleLike(post) {
  post.liked = !post.liked
  post.likes_count = (post.likes_count ?? 0) + (post.liked ? 1 : -1)
}

/** "2026-03-30 08:39:34" → "30 Mar 2026, 08:39" */
function formatDateTime(dateStr) {
  if (!dateStr) return "—"
  const d = new Date(dateStr.replace(" ", "T"))
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    + ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}

/** "1999-01-01" → "01 Jan 1999" */
function formatDate(dateStr) {
  if (!dateStr) return "—"
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}
</script>

<style scoped>
/* ── Card shell ── */
.profile-header-card {
  background: #fff;
  border: 1px solid #e9e3ff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(124,58,237,.08);
  overflow: visible;
}

/* ── Cover ── */
.cover-banner {
  background-color: #7c3aed;
  height: 160px;
  border-radius: 15px 15px 0 0;
  position: relative;
}
.btn-cover {
  position: absolute;
  top: 14px; right: 14px;
  background: #fff;
  border: 1.5px solid #e9e3ff;
  border-radius: 8px;
  font-size: .8rem; font-weight: 500;
  padding: 6px 14px; color: #374151;
  display: inline-flex; align-items: center; gap: 4px;
  transition: background .15s;
}
.btn-cover:hover { background: #f5f3ff; }

/* ── Avatar ── */
.avatar-row {
  display: flex; align-items: flex-start;
  flex-wrap: wrap; gap: 8px;
  margin-top: -44px;
}
.avatar-wrapper { position: relative; width: 96px; height: 96px; flex-shrink: 0; }
.profile-avatar {
  width: 96px; height: 96px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  box-shadow: 0 4px 18px rgba(124,58,237,.22);
}
.avatar-edit-trigger {
  position: absolute; bottom: 2px; right: -4px;
  width: 28px; height: 28px;
  background: #7c3aed; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; cursor: pointer;
  box-shadow: 0 2px 8px rgba(124,58,237,.35);
  transition: background .15s;
}
.avatar-edit-trigger:hover { background: #5b21b6; }

/* ── Name / meta ── */
.profile-name { font-size: 1.15rem; color: #1e1b4b; }
.profile-role { font-size: .82rem; font-weight: 600; color: #7c3aed; }
.meta-item    { font-size: .78rem; color: #6b7280; display: inline-flex; align-items: center; gap: 4px; }
.meta-link    { text-decoration: none; color: #7c3aed; }
.meta-link:hover { text-decoration: underline; }

/* ── Badges ── */
.badge-position { background:#ede9fe; color:#5b21b6; font-size:.72rem; font-weight:600; padding:3px 10px; border-radius:20px; }
.badge-type     { background:#fef3c7; color:#92400e; font-size:.72rem; font-weight:600; padding:3px 10px; border-radius:20px; }
.badge-role     { background:#d1fae5; color:#065f46; font-size:.72rem; font-weight:600; padding:3px 10px; border-radius:20px; }
.skill-badge    { background:#f3f4f6; color:#374151; font-size:.78rem; font-weight:600; padding:5px 14px; border-radius:20px; border:1px solid #e5e7eb; }

/* ── Buttons ── */
.btn-outline-profile {
  border: 1.5px solid #e9e3ff; background: transparent;
  color: #1e1b4b; border-radius: 8px;
  padding: 7px 16px; font-size: .82rem; font-weight: 500;
  display: inline-flex; align-items: center;
  transition: border-color .15s, background .15s;
}
.btn-outline-profile:hover { border-color: #7c3aed; background: #ede9fe; }
.btn-danger-soft {
  border: 1.5px solid #fee2e2; background: transparent;
  color: #dc2626; border-radius: 8px;
  padding: 7px 16px; font-size: .82rem; font-weight: 500;
  display: inline-flex; align-items: center;
  transition: background .15s;
}
.btn-danger-soft:hover { background: #fee2e2; }

/* ── Tabs ── */
.profile-tabs { border-top: 1px solid #e9e3ff; display: flex; padding-top: 2px; flex-wrap: wrap; }
.tab-btn {
  background: none; border: none;
  border-bottom: 2.5px solid transparent;
  padding: 10px 18px; font-size: .84rem; font-weight: 500;
  color: #6b7280; cursor: pointer;
  transition: color .15s, border-color .15s;
}
.tab-btn:hover  { color: #7c3aed; }
.tab-btn.active { color: #7c3aed; border-bottom-color: #7c3aed; }

/* ── Info panel ── */
.info-panel {
  background: #fff;
  border: 1px solid #e9e3ff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(124,58,237,.08);
  padding: 28px 32px 32px;
  margin-bottom: 24px;
}
.panel-title {
  font-size: 1rem; font-weight: 700; color: #1e1b4b;
  margin-bottom: 24px; padding-bottom: 12px;
  border-bottom: 1px solid #e9e3ff;
}
.info-row     { margin-bottom: 18px; }
.info-label   { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #9ca3af; }
.info-value   { font-size: .95rem; font-weight: 600; color: #1e1b4b; margin: 4px 0 0; }
.info-value.mono { font-family: 'Courier New', monospace; font-size: .88rem; }
.info-link    { color: #7c3aed; text-decoration: none; }
.info-link:hover { text-decoration: underline; }

@media (min-width: 992px) {
  .border-start-lg { border-left: 1px solid #e9e3ff !important; }
}

/* ── Timeline / project items ── */
.timeline-item, .proj-item {
  border-left: 3px solid #7c3aed;
  padding: 10px 16px;
  background: #f5f3ff;
  border-radius: 0 8px 8px 0;
  margin-bottom: 12px;
}
.proj-link {
  font-size: .78rem; font-weight: 600;
  color: #7c3aed; text-decoration: none;
  display: inline-flex; align-items: center; gap: 4px;
}
.proj-link:hover { text-decoration: underline; }

/* ── Empty state ── */
.empty-state { text-align: center; padding: 32px 0 16px; display: flex; flex-direction: column; align-items: center; }

/* ── Dropdown ── */
.dropdown-menu { min-width: 170px; border-radius: 10px; font-size: .85rem; }

/* ── Animation ── */
.fade-in { animation: fadeUp .28s ease both; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Post card ── */
.post-card {
  background: #fff;
  border: 1px solid #e9e3ff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(124,58,237,.07);
  overflow: hidden;
  transition: box-shadow .2s;
}
.post-card:hover { box-shadow: 0 6px 24px rgba(124,58,237,.13); }

.post-header { padding: 16px 16px 8px; }
.post-avatar {
  width: 42px; height: 42px;
  border-radius: 50%; object-fit: cover;
  border: 2px solid #ede9fe;
  flex-shrink: 0;
}
.post-author   { font-size: .88rem; font-weight: 700; color: #1e1b4b; }
.post-meta-sub { font-size: .74rem; color: #9ca3af; }

.post-body {
  padding: 4px 16px 12px;
  font-size: .875rem;
  line-height: 1.65;
  color: #374151;
}

.post-image img {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  display: block;
}

.post-stats {
  padding: 10px 16px;
  font-size: .78rem;
  color: #9ca3af;
  border-top: 1px solid #f3f0ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-actions {
  border-top: 1px solid #f3f0ff;
  display: flex;
}
.action-btn {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 10px 0;
  font-size: .82rem; font-weight: 500;
  color: #6b7280;
  background: none; border: none;
  cursor: pointer;
  font-family: inherit;
  transition: color .15s, background .15s;
}
.action-btn:hover  { color: #7c3aed; background: #f5f3ff; }
.action-liked      { color: #7c3aed !important; }

/* ── Skeleton loader ── */
.skeleton { background: linear-gradient(90deg,#f3f0ff 25%,#e9e3ff 50%,#f3f0ff 75%); background-size:200% 100%; animation: shimmer 1.4s infinite; border-radius: 6px; }
.skeleton-circle  { border-radius: 50%; flex-shrink: 0; }
.skeleton-line    { display: block; }
.skeleton-img     { width: 100%; height: 180px; border-radius: 8px; }
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
</style>