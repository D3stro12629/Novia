<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import { useCategoryStore } from '@/stores/category'
import { useToast } from 'vue-toast-notification'
import PostCard from '@/components/PostCard.vue'
import CreatePostView from '@/views/CreatePostView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const postStore = usePostStore()
const categoryStore = useCategoryStore()
const loading = ref(true)
const $toast = useToast()

// Fetch posts and categories on component mount
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      postStore.fetchPosts(),
      categoryStore.fetchCategory()
    ])
  } catch (error) {
    console.error('Failed to fetch data:', error)
    $toast.error(error.response?.data?.message || 'Failed to load data. Please try again.')
  } finally {
    loading.value = false
  }
})

// Handle new post creation
const handlePostCreated = async () => {
  try {
    await postStore.fetchPosts()
    $toast.success('Post created successfully!')
  } catch (error) {
    console.error('Failed to refresh posts:', error)
    $toast.error('Failed to refresh posts')
  }
}

// Filter posts by category
const filterByCategory = async (categoryId: number) => {
  loading.value = true
  try {
    await postStore.fetchPosts('', 1, 20, categoryId)
    $toast.success(`Filtered by category`)
  } catch (error) {
    console.error('Failed to filter posts:', error)
    $toast.error('Failed to filter posts')
  } finally {
    loading.value = false
  }
}

// Load more posts
const loadMorePosts = async () => {
  if (loading.value) return

  loading.value = true
  try {
    const nextPage = postStore.pagination.current_page + 1
    await postStore.fetchPostsAppend('', nextPage)
  } catch (error) {
    console.error('Failed to load more posts:', error)
    $toast.error('Failed to load more posts')
  } finally {
    loading.value = false
  }
}

// Get category icon based on category name
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'event': 'bi-calendar-event',
    'internship': 'bi-briefcase',
    'jobs': 'bi-briefcase-fill',
    'presentation': 'bi-easel',
    'project': 'bi-diagram-3',
    'study': 'bi-book',
    'posts': 'bi-newspaper',
    'all posts': 'bi-newspaper'
  }
  return 'bi ' + (iconMap[categoryName.toLowerCase()] || 'bi-tag')
}
</script>

<template>
  <DashboardLayout>
    <div class="home-page">
      <div class="container">
        <div class="row">

          <!-- MAIN FEED -->
          <div class="col-8">
            <!-- Create Post -->
            <div class="card create-post-card">
              <div class="card-body">
                <CreatePostView @post-created="handlePostCreated" />
              </div>
            </div>

            <!-- Loading -->
            <div v-if="loading && postStore.posts.length === 0" class="card text-center">
              <div class="card-body">
                <div class="spinner"></div>
                <p class="card-text">Loading posts...</p>
              </div>
            </div>

            <!-- Posts -->
            <div v-else-if="postStore.posts.length > 0">
              <div
                v-for="post in postStore.posts"
                :key="post.id"
                class="card post-card"
              >
                <div class="card-body">
                  <PostCard :post="post" />
                </div>
              </div>
            </div>

            <!-- Empty -->
            <div v-else class="card text-center">
              <div class="card-body">
                <i class="bi bi-newspaper empty-icon"></i>
                <h4 class="card-title">No posts yet</h4>
                <p class="card-text">Be the first to share something!</p>
              </div>
            </div>

            <!-- Load More -->
            <div
              v-if="postStore.pagination.has_more_pages"
              class="load-more"
            >
              <button
                class="btn-load"
                @click="loadMorePosts"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner small"></span>
                Load More Posts
              </button>
            </div>
          </div>

          <!-- SIDEBAR -->
          <div class="col-3">
            <div class="sidebar">

              <!-- Categories -->
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">Categories</h6>

                  <div v-if="categoryStore.loading" class="text-center">
                    <div class="spinner small"></div>
                  </div>

                  <div v-else class="category-list">
                    <div
                      v-for="cat in categoryStore.category"
                      :key="cat.id"
                      class="category-item"
                      @click="filterByCategory(cat.id)"
                    >
                      <i :class="getCategoryIcon(cat.name)"></i>
                      <span>{{ cat.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Suggestions -->
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">People You May Know</h6>

                  <div class="suggestion-item">
                    <img src="https://via.placeholder.com/40" class="avatar" />
                    <div>
                      <div class="card-title">John Doe</div>
                      <div class="card-text">Frontend Developer</div>
                    </div>
                  </div>

                  <div class="suggestion-item">
                    <img src="https://via.placeholder.com/40" class="avatar" />
                    <div>
                      <div class="card-title">Jane Smith</div>
                      <div class="card-text">UI/UX Designer</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
<style scoped>
.home-page {
  background: #f0f2f5;
  min-height: 100vh;
  padding: 20px 0;
}

/* GRID */
.row {
  display: flex;
  gap: 20px;
}

.col-8 {
  width: 66.66%;
}

.col-4 {
  width: 33.33%;
}

/* CARD */
.card {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.card-body {
  padding: 16px;
}

.card-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.card-text {
  color: #65676b;
  font-size: 14px;
}

/* CREATE POST */
.create-post-card {
  padding: 0;
}

/* POST */
.post-card {
  transition: 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
}

/* CATEGORY */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.category-item:hover {
  background: #f0f2f5;
}

/* SIDEBAR */
.sidebar {
  position: sticky;
  top: 20px;
}

/* SUGGESTION */
.suggestion-item {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* BUTTON */
.btn-load {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #1877f2;
  color: #fff;
  cursor: pointer;
}

.btn-load:hover {
  background: #166fe5;
}

/* SPINNER */
.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #ddd;
  border-top: 3px solid #1877f2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;
}

.spinner.small {
  width: 18px;
  height: 18px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* EMPTY */
.empty-icon {
  font-size: 40px;
  color: #ccc;
  margin-bottom: 10px;
}
</style>