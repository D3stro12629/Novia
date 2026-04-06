<template>


<div class="container">
  <div class="page-title-row">
    <div class="page-icon-wrap">
      <User :size="20" />
    </div>
    <div>
      <h3 class="page-title">My Profile</h3>
      <p class="page-sub">Manage your account and details</p>
    </div>
  </div>

  <div class="pcard mb-4">

    <div
      class="cover"
      :style="profile.cover
        ? `background-image:url(${profile.cover});background-size:cover;background-position:center`
        : ''"
    >
      <!-- Cover gradient overlay -->
      <div class="cover-overlay" />

      <!-- Edit cover -->
      <label class="cover-edit-btn" title="Change cover">
        <input type="file" accept="image/*" @change="handleCoverFile" style="display:none" />
        <ImageIcon :size="14" />
        <span>Edit Cover</span>
      </label>
    </div>

    <!-- Body: avatar + info + actions -->
    <div class="pcard-body">
      <div class="hero-row">

        <!-- ── Avatar ── -->
        <div class="avatar-shell">
          <img :src="avatarSrc" class="avatar-img" alt="avatar" />
          <!-- Online dot -->
          <span class="online-dot" />
          <!-- Edit dropdown -->
          <div class="dropdown">
            <button class="avatar-edit-btn" data-bs-toggle="dropdown" aria-expanded="false">
              <Camera :size="13" />
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 py-1">
              <li>
                <input id="avatarFile" type="file" accept="image/*" @change="handleAvatarFile" style="display:none" />
                <label for="avatarFile" class="dropdown-item d-flex align-items-center gap-2 py-2 px-3">
                  <Upload :size="14" class="text-primary-v" /> Change Photo
                </label>
              </li>
              <li><hr class="dropdown-divider my-1" /></li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 py-2 px-3 text-danger"
                        @click="removeAvatar">
                  <Trash2 :size="14" /> Remove Photo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- ── Name / meta ── -->
        <div class="hero-info">
          <div class="name-row">
            <h4 class="hero-name">{{ profile.full_name || '—' }}</h4>
            <!-- Verified chip -->
            <span class="verified-chip" v-if="profile.roles?.length">
              <CheckCircle2 :size="11" />
              {{ profile.roles[0]?.name }}
            </span>
          </div>

          <p class="hero-role">
            <Briefcase :size="13" class="me-1 opacity-70" />
            {{ profile.professional?.job_title || 'No title set' }}
            <span class="hero-company" v-if="profile.professional?.company_name">
              &nbsp;·&nbsp; {{ profile.professional.company_name }}
            </span>
          </p>

          <!-- Position + Type chips -->
          <div class="chip-row" v-if="profile.positions?.length || profile.types?.length">
            <span class="chip chip-pos" v-for="p in profile.positions" :key="p.id">{{ p.name }}</span>
            <span class="chip chip-type" v-for="t in profile.types" :key="t.id">{{ t.name }}</span>
          </div>

          <!-- Location / link row -->
          <div class="meta-row">
            <span class="meta-pill" v-if="profile.current_city">
              <MapPin :size="11" /> {{ profile.current_city }}
            </span>
            <span class="meta-pill" v-if="profile.home_town">
              <Home :size="11" /> {{ profile.home_town }}
            </span>
            <a class="meta-pill meta-pill-link"
               v-if="profile.portfolio_link"
               :href="profile.portfolio_link"
               target="_blank">
              <Globe :size="11" /> {{ shortLink(profile.portfolio_link) }}
            </a>
          </div>
        </div>

        <!-- ── Action buttons ── -->
        <div class="hero-actions">
          <button class="btn-edit text-dark" @click="$emit('editProfile')">
            <SquarePen :size="14" class="text-dark" /> Edit Profile
          </button>
          <button class="btn-signout" @click="$emit('signOut')">
            <LogOut :size="14" /> Sign out
          </button>
        </div>
      </div>

      <!-- ── Tabs ── -->
      <nav class="tab-nav">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <component :is="tab.icon" :size="14" />
          {{ tab.label }}
        </button>
      </nav>
    </div>
  </div>


  <div v-if="activeTab === 'posts'" class="tab-fade">

    <!-- New post button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <p class="section-count text-muted small mb-0">
        {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }}
      </p>
      <button class="btn-primary-v text-black" @click="$emit('newPost')">
        <SquarePen :size="14" /> New Post
      </button>
    </div>

    <!-- Skeleton -->
    <template v-if="postsLoading">
      <div class="post-card mb-3" v-for="n in 2" :key="n">
        <div class="post-card-header">
          <div class="sk sk-circle"></div>
          <div class="flex-grow-1">
            <div class="sk sk-line" style="width:120px;height:12px;margin-bottom:5px;"></div>
            <div class="sk sk-line" style="width:80px;height:10px;"></div>
          </div>
        </div>
        <div class="px-4 pb-3">
          <div class="sk sk-line mb-2" style="width:100%;height:11px;"></div>
          <div class="sk sk-line mb-3" style="width:65%;height:11px;"></div>
          <div class="sk sk-block" style="height:180px;border-radius:10px;"></div>
        </div>
      </div>
    </template>

    <!-- Empty -->
    <div v-else-if="!posts.length" class="empty-panel">
      <div class="empty-icon-wrap">
        <FileText :size="28" />
      </div>
      <p class="empty-title">No posts yet</p>
      <p class="empty-sub">Share your first post with the world</p>
      <button class="btn-primary-v mt-2 text-black" @click="$emit('newPost')">
        <SquarePen :size="13" /> Create Post
      </button>
    </div>

    <!-- Post list -->
    <div v-else>
      <article v-for="post in posts" :key="post.id" class="post-card mb-3">
        <!-- Header -->
        <div class="post-card-header">
          <img :src="post.creator?.avatar || avatarSrc" class="post-av" alt="" />
          <div class="flex-grow-1 min-w-0">
            <p class="post-name">{{ post.creator?.full_name || '—' }}</p>
            <p class="post-time">
              <MapPin :size="10" v-if="post.creator?.current_city" />
              {{ post.creator?.current_city }}
              <span v-if="post.creator?.current_city"> · </span>
              {{ formatDateTime(post.created_at) }}
            </p>
          </div>
          <!-- Post menu -->
          <div class="dropdown">
            <button class="post-menu-btn" data-bs-toggle="dropdown">
              <MoreHorizontal :size="17" />
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 py-1">
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 py-2 px-3"
                        @click="$emit('editPost', post)">
                  <SquarePen :size="13" /> Edit Post
                </button>
              </li>
              <li><hr class="dropdown-divider my-1" /></li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 py-2 px-3 text-danger"
                        @click="$emit('deletePost', post)">
                  <Trash2 :size="13" /> Delete Post
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Text -->
        <div class="post-body" v-if="post.text">{{ post.text }}</div>

        <!-- Categories -->
        <div class="post-cats" v-if="post.categories?.length">
          <span class="chip chip-pos" v-for="cat in post.categories" :key="cat.id">{{ cat.name }}</span>
        </div>

        <!-- Image (prefer post.image, fallback attachments) -->
        <div class="post-media" v-if="post.image || post.attachments">
          <img :src="post.image || post.attachments" alt="media" />
        </div>

        <!-- Stats -->
        <div class="post-stats">
          <button class="stat-pill" :class="{ 'stat-liked': post.liked }" @click="toggleLike(post)">
            <Heart :size="13" :fill="post.liked ? 'currentColor' : 'none'" />
            {{ post.likes_count ?? 0 }}
          </button>
          <button class="stat-pill" @click="$emit('commentPost', post)">
            <MessageSquare :size="13" />
            {{ post.comments_count ?? 0 }}
          </button>
          <div class="ms-auto">
            <button class="stat-pill" @click="$emit('sharePost', post)">
              <Share2 :size="13" /> Share
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>


  <div v-if="activeTab === 'about'" class="info-panel tab-fade">
    <div class="panel-header">
      <h5 class="panel-title">Professional Info</h5>
      <RouterLink class="btn-ghost" to="/editProfile" @click="$emit('editProfessional')">
        <SquarePen :size="14" /> Edit
      </RouterLink>
    </div>

    <div class="row g-0">
      <div class="col-lg-6 col-divider-right">
        <div class="info-field">
          <span class="field-label">Job Title</span>
          <p class="field-val">{{ profile.professional?.job_title || '—' }}</p>
        </div>
        <div class="info-field">
          <span class="field-label">Company</span>
          <p class="field-val">{{ profile.professional?.company_name || '—' }}</p>
        </div>
        <div class="info-field">
          <span class="field-label">Responsibility</span>
          <p class="field-val" style="white-space:pre-line;line-height:1.7;">
            {{ profile.professional?.responsibility || '—' }}
          </p>
        </div>
      </div>
      <div class="col-lg-6 ps-lg-5">
        <div class="info-field">
          <span class="field-label">Positions</span>
          <div class="chip-row mt-2">
            <span class="chip chip-pos" v-for="p in profile.positions" :key="p.id">{{ p.name }}</span>
            <span class="field-val" v-if="!profile.positions?.length">—</span>
          </div>
        </div>
        <div class="info-field">
          <span class="field-label">Types</span>
          <div class="chip-row mt-2">
            <span class="chip chip-type" v-for="t in profile.types" :key="t.id">{{ t.name }}</span>
            <span class="field-val" v-if="!profile.types?.length">—</span>
          </div>
        </div>
        <div class="info-field">
          <span class="field-label">Collaboration Link</span>
          <a v-if="profile.collaboration?.company_link"
             :href="profile.collaboration.company_link"
             target="_blank" class="field-link">
            <Globe :size="13" /> {{ shortLink(profile.collaboration.company_link) }}
          </a>
          <p class="field-val" v-else>—</p>
        </div>
        <div class="info-field">
          <span class="field-label">CV / Resume</span>
          <a v-if="profile.cv" :href="profile.cv" target="_blank" class="field-link">
            <FileText :size="13" /> View CV
          </a>
          <p class="field-muted" v-else>Not uploaded</p>
        </div>
      </div>
    </div>
  </div>


  <div v-if="activeTab === 'education'" class="info-panel tab-fade">
    <div class="panel-header">
      <h5 class="panel-title">Education</h5>
      <RouterLink class="btn-ghost" to="/editEducation" @click="$emit('editEducation')">
        <Plus :size="14" /> Add
      </RouterLink>
    </div>

    <div v-if="profile.educations?.length">
      <div class="timeline-item" v-for="(edu, i) in profile.educations" :key="edu.id"
           :style="`--delay:${i * 60}ms`">
        <div class="timeline-dot" />
        <div class="timeline-content">
          <p class="tl-title">{{edu.degree.name}}</p>
          <p class="tl-sub">{{ edu.subject?.name || '—' }}<span v-if="edu.year"> · {{ edu.year }}</span></p>
                          <Building2 :size="11" class="me-1" />
                {{ edu.school?.name || '—' }}

        </div>
      </div>
    </div>

    <div v-else class="empty-panel">
      <div class="empty-icon-wrap"><GraduationCap :size="26" /></div>
      <p class="empty-title">No education records</p>
      <p class="empty-sub">Add your academic background</p>
    </div>
  </div>


  <div v-if="activeTab === 'project'" class="info-panel tab-fade">
    <div class="panel-header">
      <h5 class="panel-title">Projects</h5>
      <RouterLink class="btn-ghost" to="/editProject" @click="$emit('editProject')">
        <Plus :size="14" /> Add
      </RouterLink>
    </div>

    <div class="proj-grid" v-if="profile.projects?.length">
      <a
        v-for="(proj, i) in profile.projects"
        :key="proj.id"
        :href="proj.link"
        target="_blank"
        class="proj-card"
        :style="`--delay:${i * 60}ms`"
      >
        <div class="proj-icon-wrap">
          <FolderOpen :size="20" />
        </div>
        <div class="flex-grow-1 min-w-0">
          <p class="proj-name">{{ proj.title }}</p>
          <p class="proj-url">{{ shortLink(proj.link) }}</p>
        </div>
        <ExternalLink :size="14" class="proj-arrow" />
      </a>
    </div>

    <div v-else class="empty-panel">
      <div class="empty-icon-wrap"><FolderOpen :size="26" /></div>
      <p class="empty-title">No projects yet</p>
      <p class="empty-sub">Showcase your work here</p>
    </div>
  </div>


  <div v-if="activeTab === 'skills'" class="info-panel tab-fade">
    <div class="panel-header">
      <h5 class="panel-title">Skills</h5>
      <button class="btn-ghost" @click="$emit('editSkills')">
        <SquarePen :size="14" /> Edit
      </button>
    </div>

    <div class="skills-wrap" v-if="profile.skills?.length">
      <span
        class="skill-tag"
        v-for="(skill, i) in profile.skills"
        :key="skill.id"
        :style="`--delay:${i * 30}ms`"
      >{{ skill.name }}</span>
    </div>

    <div v-else class="empty-panel">
      <div class="empty-icon-wrap"><Layers :size="26" /></div>
      <p class="empty-title">No skills added</p>
      <p class="empty-sub">Highlight your technical expertise</p>
    </div>
  </div>
</div>
</template>


<script setup>
import { ref, onMounted } from "vue"
import {
  User, Pencil, Trash2, ImageIcon, MapPin, Home,
  Globe, LogOut, GraduationCap, ExternalLink,
  FolderOpen, Layers, Heart, MessageSquare, Share2,
  MoreHorizontal, FileText, SquarePen, Camera, Upload,
  CheckCircle2, Briefcase, Plus, BookOpen, Code2,
  Newspaper
} from "lucide-vue-next"
import { useAuthStores }    from "@/stores/auth"
import { usePostStore }     from "@/stores/post"
import { useProfileStore }  from "@/stores/profile"

// ── Stores ─────────────────────────────────────────────────
const auth          = useAuthStores()
const postStore     = usePostStore()
const profileStore  = useProfileStore()

// ── State ──────────────────────────────────────────────────
const profile      = ref({})
const avatarSrc    = ref("https://i.pinimg.com/736x/13/7f/60/137f60eb88c20c91362878bd395df867.jpg")
const activeTab    = ref("posts")
const posts        = ref([])
const postsLoading = ref(true)

const tabs = [
  { key: "posts",     label: "All Posts",  icon: Newspaper   },
  { key: "about",     label: "About",      icon: Briefcase   },
  { key: "education", label: "Education",  icon: BookOpen    },
  { key: "project",   label: "Projects",   icon: FolderOpen  },
  { key: "skills",    label: "Skills",     icon: Code2       },
]

onMounted(() => Promise.all([loadProfile(), loadPosts()]))

async function loadProfile() {
  try {
    // Uses auth store (existing) OR profileStore.getProfile()
    const res = await auth.profile()
    // res.data → { result, code, message, data: { id, full_name, avatar, cover, ... } }
    if (res.data.result) {
      profile.value = res.data.data
      if (res.data.data.avatar) avatarSrc.value = res.data.data.avatar
    }
  } catch (e) {
    console.error("Failed to load profile", e)
  }
}

// ── Load posts ─────────────────────────────────────────────
async function loadPosts() {
  postsLoading.value = true
  try {
    const res = await postStore.getAllPosts()
    // res.data → { result, code, message, data: [ { id, text, image, creator, categories, attachments, created_at } ] }
    if (res.data.result) {
      posts.value = (res.data.data ?? []).map(p => ({
        ...p,
        liked:          false,
        likes_count:    p.likes_count    ?? 0,
        comments_count: p.comments_count ?? 0,
      }))
    }
  } catch (e) {
    console.error("Failed to load posts", e)
  } finally {
    postsLoading.value = false
  }
}

// ── Avatar handlers ────────────────────────────────────────
function handleAvatarFile(e) {
  const file = e.target.files[0]
  if (!file) return
  avatarSrc.value = URL.createObjectURL(file)
  // Upload to API → profileStore.updateAvatar(file)
  profileStore.updateAvatar(file).catch(console.error)
}

function removeAvatar() {
  // Call API → profileStore.deleteAvatar()
  profileStore.deleteAvatar()
    .then(() => { avatarSrc.value = "https://i.pinimg.com/736x/13/7f/60/137f60eb88c20c91362878bd395df867.jpg" })
    .catch(console.error)
}

// ── Cover handler ──────────────────────────────────────────
function handleCoverFile(e) {
  const file = e.target.files[0]
  if (!file) return
  // Optimistic preview
  profile.value = { ...profile.value, cover: URL.createObjectURL(file) }
  // Upload to API → profileStore.updateCover(file)
  profileStore.updateCover(file).catch(console.error)
}

// ── Post actions ───────────────────────────────────────────
function toggleLike(post) {
  post.liked       = !post.liked
  post.likes_count = (post.likes_count ?? 0) + (post.liked ? 1 : -1)
}

// ── Helpers ────────────────────────────────────────────────
/** "2026-03-30 08:39:34" → "30 Mar 2026, 08:39" */
function formatDateTime(str) {
  if (!str) return "—"
  const d = new Date(str.replace(" ", "T"))
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
       + ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}

/** "https://chandalen.dev/some/path" → "chandalen.dev" */
function shortLink(url) {
  try { return new URL(url).hostname.replace("www.", "") }
  catch { return url }
}
</script>


<!-- ══════════════════════════════════════════════════════════
     STYLES
══════════════════════════════════════════════════════════ -->
<style scoped>
/* ── Design tokens ── */
:root {
  --v:       #6d28d9;
  --v-light: #ede9fe;
  --v-mid:   #7c3aed;
  --v-dark:  #4c1d95;
  --border:  #ede9fe;
  --bg:      #faf9ff;
  --text:    #1e1b4b;
  --muted:   #6b7280;
  --card:    #ffffff;
  --shadow:  0 2px 20px rgba(109,40,217,.07);
  --radius:  16px;
}

/* ── Page header ── */
.page-title-row {
  display: flex; align-items: center; gap: 14px;
  margin: 36px 0 24px;
}
.page-icon-wrap {
  width: 42px; height: 42px;
  background: var(--v-light);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--v-mid);
}
.page-title { font-size: 1.2rem; font-weight: 800; margin: 0; color: var(--text); letter-spacing: -.02em; }
.page-sub   { font-size: .78rem; color: var(--muted); margin: 0; }

/* ── Profile card shell ── */
.pcard {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: visible;
}

/* ── Cover ── */
.cover {
  height: 180px;
  background: linear-gradient(135deg, #6d28d9 0%, #a855f7 60%, #7c3aed 100%);
  border-radius: var(--radius) var(--radius) 0 0;
  position: relative;
  overflow: hidden;
}
.cover-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.22));
}
.cover-edit-btn {
  position: absolute; bottom: 14px; right: 14px;
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.35);
  color: #fff;
  border-radius: 8px;
  padding: 6px 13px;
  font-size: .78rem; font-weight: 500;
  cursor: pointer;
  transition: background .2s;
}
.cover-edit-btn:hover { background: rgba(255,255,255,.28); }

/* ── Card body ── */
.pcard-body { padding: 0 24px 0; }

/* ── Hero row ── */
.hero-row {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: -48px;
  padding-bottom: 16px;
}

/* ── Avatar ── */
.avatar-shell {
  position: relative;
  width: 96px; height: 96px;
  flex-shrink: 0;
}
.avatar-img {
  width: 96px; height: 96px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(109,40,217,.25);
}
.online-dot {
  position: absolute; bottom: 6px; right: 2px;
  width: 14px; height: 14px;
  background: #22c55e;
  border: 2.5px solid #fff;
  border-radius: 50%;
}
.avatar-edit-btn {
  position: absolute; top: 0; right: -2px;
  width: 28px; height: 28px;
  background: var(--v-mid);
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: background .15s, transform .15s;
  box-shadow: 0 2px 8px rgba(109,40,217,.3);
}
.avatar-edit-btn:hover { background: var(--v-dark); transform: scale(1.08); }

/* ── Hero info ── */
.hero-info { flex: 1; min-width: 0; padding-top: 52px; }

.name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.hero-name { font-size: 1.18rem; font-weight: 800; color: var(--text); margin: 0; letter-spacing: -.025em; }
.verified-chip {
  display: inline-flex; align-items: center; gap: 4px;
  background: #dcfce7; color: #166534;
  font-size: .68rem; font-weight: 700;
  padding: 2px 8px; border-radius: 20px;
  border: 1px solid #bbf7d0;
}

.hero-role {
  font-size: .82rem; font-weight: 500;
  color: var(--v-mid);
  display: flex; align-items: center; gap: 4px;
  margin-bottom: 8px;
}
.hero-company { color: var(--muted); font-weight: 400; }

.chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.chip {
  font-size: .7rem; font-weight: 700;
  padding: 3px 10px; border-radius: 20px;
  display: inline-flex; align-items: center;
}
.chip-pos  { background: var(--v-light); color: var(--v-dark); border: 1px solid #ddd6fe; }
.chip-type { background: #fef9c3; color: #713f12; border: 1px solid #fde68a; }

.meta-row { display: flex; flex-wrap: wrap; gap: 8px; }
.meta-pill {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: .74rem; color: var(--muted);
  background: #f5f3ff;
  padding: 3px 10px; border-radius: 20px;
  border: 1px solid var(--border);
  text-decoration: none;
}
.meta-pill-link { color: var(--v-mid); }
.meta-pill-link:hover { background: var(--v-light); }

/* ── Hero actions ── */
.hero-actions {
  display: flex; flex-direction: column; gap: 8px;
  padding-top: 52px;
  flex-shrink: 0;
}
.btn-edit {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--v-mid); color: #fff;
  border: none; border-radius: 9px;
  padding: 8px 18px; font-size: .82rem; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  transition: background .15s, transform .1s;
  box-shadow: 0 3px 12px rgba(109,40,217,.3);
}
.btn-edit:hover { background: var(--v-dark); transform: translateY(-1px); }

.btn-signout {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; color: #dc2626;
  border: 1.5px solid #fecaca; border-radius: 9px;
  padding: 7px 18px; font-size: .82rem; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  transition: background .15s, border-color .15s;
}
.btn-signout:hover { background: #fff1f2; border-color: #fca5a5; }

/* ── Tab nav ── */
.tab-nav {
  display: flex; gap: 0; flex-wrap: wrap;
  border-top: 1px solid var(--border);
  margin: 0 -24px;
  padding: 0 24px;
}
.tab-item {
  display: inline-flex; align-items: center; gap: 6px;
  background: none; border: none;
  border-bottom: 2.5px solid transparent;
  padding: 12px 16px;
  font-size: .82rem; font-weight: 500;
  color: var(--muted); cursor: pointer;
  transition: color .15s, border-color .15s;
  white-space: nowrap;
}
.tab-item:hover { color: var(--v-mid); }
.tab-item.active { color: var(--v-mid); border-bottom-color: var(--v-mid); font-weight: 700; }

/* ── Tab animation ── */
.tab-fade { animation: tabIn .3s cubic-bezier(.22,1,.36,1) both; }
@keyframes tabIn {
  from { opacity:0; transform: translateY(8px); }
  to   { opacity:1; transform: translateY(0); }
}

/* ── Shared panel ── */
.info-panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px 28px 28px;
  margin-bottom: 20px;
}
.panel-header {
  display: flex; align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}
.panel-title { font-size: .95rem; font-weight: 800; color: var(--text); margin: 0; letter-spacing: -.01em; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--v-light); color: var(--v-mid);
  border: 1px solid #ddd6fe; border-radius: 7px;
  padding: 5px 12px; font-size: .78rem; font-weight: 600;
  cursor: pointer;
  transition: background .15s;
}
.btn-ghost:hover { background: #ddd6fe; }

.btn-primary-v {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--v-mid); color: #fff;
  border: none; border-radius: 9px;
  padding: 8px 18px; font-size: .82rem; font-weight: 600;
  cursor: pointer;
  transition: background .15s, transform .1s;
  box-shadow: 0 3px 12px rgba(109,40,217,.25);
}
.btn-primary-v:hover { background: var(--v-dark); transform: translateY(-1px); }

/* ── Info fields ── */
.col-divider-right { padding-right: 36px; }
@media (min-width:992px) {
  .col-divider-right { border-right: 1px solid var(--border); }
  .col-lg-6.ps-lg-5  { padding-left: 36px !important; }
}
.info-field { margin-bottom: 20px; }
.field-label {
  font-size: .68rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: .07em;
  color: #a78bfa; display: block; margin-bottom: 4px;
}
.field-val   { font-size: .9rem; font-weight: 600; color: var(--text); margin: 0; }
.field-muted { font-size: .82rem; color: var(--muted); margin: 0; }
.field-link  {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: .86rem; font-weight: 600;
  color: var(--v-mid); text-decoration: none;
}
.field-link:hover { text-decoration: underline; }

/* ── Timeline ── */
.timeline-item {
  display: flex; gap: 14px; align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #f5f3ff;
  animation: tabIn .3s var(--delay, 0ms) both;
}
.timeline-item:last-child { border-bottom: none; }
.timeline-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--v-mid);
  border: 2px solid var(--v-light);
  flex-shrink: 0; margin-top: 5px;
}
.tl-title { font-size: .9rem; font-weight: 700; color: var(--text); margin: 0 0 3px; }
.tl-sub   { font-size: .78rem; color: var(--muted); margin: 0; }

/* ── Project grid ── */
.proj-grid { display: flex; flex-direction: column; gap: 10px; }
.proj-card {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px;
  background: #faf9ff;
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  transition: box-shadow .18s, transform .18s, background .18s;
  animation: tabIn .3s var(--delay, 0ms) both;
}
.proj-card:hover {
  background: var(--v-light);
  box-shadow: 0 4px 16px rgba(109,40,217,.12);
  transform: translateY(-1px);
}
.proj-icon-wrap {
  width: 38px; height: 38px;
  background: var(--v-light);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: var(--v-mid); flex-shrink: 0;
}
.proj-name  { font-size: .88rem; font-weight: 700; color: var(--text); margin: 0 0 2px; }
.proj-url   { font-size: .74rem; color: var(--muted); margin: 0; }
.proj-arrow { color: var(--v-mid); flex-shrink: 0; }

/* ── Skills ── */
.skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag {
  display: inline-block;
  background: #f5f3ff; color: var(--text);
  font-size: .8rem; font-weight: 600;
  padding: 6px 14px; border-radius: 20px;
  border: 1px solid var(--border);
  transition: background .15s, color .15s, transform .15s;
  animation: tabIn .25s var(--delay, 0ms) both;
}
.skill-tag:hover { background: var(--v-light); color: var(--v-dark); transform: translateY(-1px); }

/* ── Post card ── */
.post-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: box-shadow .2s, transform .2s;
}
.post-card:hover { box-shadow: 0 8px 28px rgba(109,40,217,.12); transform: translateY(-1px); }

.post-card-header {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 16px 10px;
}
.post-av {
  width: 40px; height: 40px;
  border-radius: 50%; object-fit: cover;
  border: 2px solid var(--v-light); flex-shrink: 0;
}
.post-name { font-size: .86rem; font-weight: 700; color: var(--text); }
.post-time { font-size: .72rem; color: #a1a1aa; display: flex; align-items: center; gap: 3px; }
.post-menu-btn {
  background: none; border: none; cursor: pointer;
  color: #a1a1aa; padding: 4px;
  border-radius: 6px; transition: background .15s;
}
.post-menu-btn:hover { background: #f3f0ff; color: var(--v-mid); }

.post-body {
  padding: 2px 16px 12px;
  font-size: .875rem; line-height: 1.68; color: #374151;
}
.post-cats { padding: 0 16px 10px; display: flex; flex-wrap: wrap; gap: 6px; }

.post-media img {
  width: 100%; display: block;
  max-height: 300px; object-fit: cover;
}

.post-stats {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px;
  border-top: 1px solid #f5f3ff;
}
.stat-pill {
  display: inline-flex; align-items: center; gap: 5px;
  background: none; border: none;
  font-size: .78rem; font-weight: 600; color: #9ca3af;
  padding: 5px 10px; border-radius: 20px; cursor: pointer;
  transition: background .15s, color .15s;
  font-family: inherit;
}
.stat-pill:hover  { background: #f5f3ff; color: var(--v-mid); }
.stat-liked       { color: var(--v-mid) !important; background: var(--v-light); }

/* ── Skeleton ── */
.sk {
  background: linear-gradient(90deg, #f3f0ff 25%, #e9e3ff 50%, #f3f0ff 75%);
  background-size: 300% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px; display: block;
}
.sk-circle { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; }
.sk-line   { }
.sk-block  { width: 100%; }
@keyframes shimmer {
  from { background-position: 100% 0; }
  to   { background-position: -100% 0; }
}

/* ── Empty state ── */
.empty-panel {
  text-align: center;
  padding: 40px 20px 24px;
  display: flex; flex-direction: column; align-items: center;
}
.empty-icon-wrap {
  width: 56px; height: 56px;
  background: var(--v-light);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--v-mid); margin-bottom: 14px;
}
.empty-title { font-size: .92rem; font-weight: 700; color: var(--text); margin: 0 0 4px; }
.empty-sub   { font-size: .8rem; color: var(--muted); margin: 0; }

/* ── Misc ── */
.min-w-0 { min-width: 0; }
.dropdown-menu { min-width: 160px; border-radius: 10px; font-size: .83rem; }
.dropdown-item { cursor: pointer; font-size: .83rem; }
.section-count { font-size: .8rem; }
</style>