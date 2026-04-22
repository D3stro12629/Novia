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
</script>

<template>
  <DashboardLayout>
    <div class="home-page">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <!-- Main Feed Column -->
          <div class="col-lg-8 col-md-10">
            <!-- Create Post Section -->
            <div class="create-post-card mb-4">
              <CreatePostView @post-created="handlePostCreated" />
            </div>

            <!-- Loading State -->
            <div v-if="loading && postStore.posts.length === 0" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="text-muted mt-3">Loading posts...</p>
            </div>

            <!-- Posts Feed -->
            <div v-else-if="postStore.posts.length > 0" class="posts-feed">
              <PostCard
                v-for="post in postStore.posts"
                :key="post.id"
                :post="post"
                class="mb-4"
              />
            </div>

            <!-- No Posts Message -->
            <div v-else class="no-posts text-center py-5">
              <div class="no-posts-icon mb-3">
                <i class="bi bi-newspaper" style="font-size: 3rem; color: #6c757d;"></i>
              </div>
              <h4 class="text-muted">No posts yet</h4>
              <p class="text-muted">Be the first to share something!</p>
            </div>

            <!-- Load More Button -->
            <div v-if="postStore.pagination.has_more_pages" class="text-center mb-4">
              <button
                class="btn btn-outline-primary"
                @click="loadMorePosts"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                Load More Posts
              </button>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="col-lg-3 d-none d-lg-block">
            <div class="sidebar-content">
              <!-- Categories -->
              <div class="card mb-4">
                <div class="card-header">
                  <h6 class="card-title mb-0">
                    <i class="bi bi-tags"></i>
                    Categories
                  </h6>
                </div>
                <div class="card-body">
                  <div v-if="categoryStore.loading" class="text-center">
                    <div class="spinner-border spinner-border-sm" role="status"></div>
                  </div>
                  <div v-else-if="categoryStore.category.length > 0">
                    <div class="category-item mb-2" v-for="cat in categoryStore.category" :key="cat.id">
                      <button
                        class="badge bg-primary category-btn"
                        @click="filterByCategory(cat.id)"
                      >
                        {{ cat.name }}
                      </button>
                    </div>
                  </div>
                  <div v-else class="text-muted small">
                    No categories available
                  </div>
                </div>
              </div>

              <!-- Friend Suggestions -->
              <div class="card">
                <div class="card-header">
                  <h6 class="card-title mb-0">
                    <i class="bi bi-people"></i>
                    People You May Know
                  </h6>
                </div>
                <div class="card-body">
                  <div class="suggestion-item mb-3">
                    <div class="d-flex align-items-center">
                      <img src="https://via.placeholder.com/40" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                      <div>
                        <div class="fw-semibold">John Doe</div>
                        <small class="text-muted">Frontend Developer</small>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary mt-2">Connect</button>
                  </div>
                  <div class="suggestion-item">
                    <div class="d-flex align-items-center">
                      <img src="https://via.placeholder.com/40" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                      <div>
                        <div class="fw-semibold">Jane Smith</div>
                        <small class="text-muted">UI/UX Designer</small>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary mt-2">Connect</button>
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
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px 0;
}

.create-post-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
}


.no-posts {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.no-posts-icon {
  opacity: 0.5;
}

.sidebar-content {
  position: sticky;
  top: 20px;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
}

.card-header {
  background: transparent;
  border-bottom: 1px solid #e4e6ea;
  padding: 16px;
}

.card-title {
  color: #1c1e21;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.card-body {
  padding: 16px;
}

.trending-item {
  margin-bottom: 8px;
}

.trending-item:last-child {
  margin-bottom: 0;
}

.category-item {
  margin-bottom: 8px;
}

.category-item:last-child {
  margin-bottom: 0;
}

.category-btn {
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.category-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.badge {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 18px;
}

.suggestion-item {
  padding: 12px 0;
  border-bottom: 1px solid #e4e6ea;
}

.suggestion-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 991px) {
  .home-page {
    padding: 10px 0;
  }

  .create-post-card {
    margin: 0 15px 20px 15px;
  }
}

@media (max-width: 576px) {
  .home-page {
    padding: 5px 0;
  }

  .create-post-card {
    margin: 0 10px 20px 10px;
  }
}
</style>
