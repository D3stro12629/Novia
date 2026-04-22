<template>
  <div class="post-card" v-if="post && post.creator">
    <div class="card">
      <!-- Post Header -->
      <div class="card-header">
        <div class="d-flex align-items-center gap-2">
          <img
            :src="post.creator.avatar || 'https://via.placeholder.com/40'"
            class="rounded-circle"
            style="width: 40px; height: 40px; object-fit: cover;"
            :alt="post.creator.full_name || 'User'"
          />
          <div class="flex-grow-1">
            <div class="fw-semibold text-body mb-0">{{ post.creator.full_name || 'Unknown User' }}</div>
            <div class="text-muted small d-flex align-items-center gap-1">
              {{ formatDate(post.created_at) }}
              <span class="text-muted">•</span>
              <i class="bi bi-globe-americas"></i>
            </div>
          </div>
          <div v-if="isOwner" class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm" @click="handleEdit">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="handleDelete">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
          <button v-else class="btn btn-link text-muted p-0">
            <i class="bi bi-three-dots"></i>
          </button>
        </div>
      </div>

      <!-- Post Content -->
      <div class="card-body">
        <!-- Text -->
        <p class="post-text mb-3" v-if="post.text">{{ post.text }}</p>

        <!-- Image -->
        <img
          v-if="post.image && !post.image.endsWith('/storage/posts')"
          :src="post.image"
          class="card-img-top rounded-3 mb-3"
          alt="Post image"
          style="width: 100%; max-height: 500px; object-fit: cover;"
        />

        <!-- Attachment -->
        <img
          v-if="post.attachments && !post.attachments.endsWith('/storage/posts')"
          :src="post.attachments"
          class="card-img-top rounded-3 mb-3"
          alt="Attachment image"
          style="width: 100%; max-height: 500px; object-fit: cover;"
        />

        <!-- Categories -->
        <div class="d-flex gap-2 flex-wrap mb-3" v-if="post.categories && post.categories.length > 0">
          <span
            v-for="cat in post.categories"
            :key="cat.id"
            class="badge bg-primary"
          >
            {{ cat.name }}
          </span>
        </div>

        <!-- If no category, show Draft -->
        <div class="mb-3" v-if="post.categories && post.categories.length === 0">
          <span class="badge bg-warning text-dark">Draft</span>
        </div>
      </div>

      <!-- Post Actions -->
      <div class="card-footer bg-white">
        <div class="d-flex justify-content-around py-2">
          <button class="btn btn-link text-muted d-flex align-items-center gap-2 p-0">
            <i class="bi bi-hand-thumbs-up"></i>
            <span class="small">Like</span>
          </button>
          <button class="btn btn-link text-muted d-flex align-items-center gap-2 p-0">
            <i class="bi bi-chat"></i>
            <span class="small">Comment</span>
          </button>
          <button class="btn btn-link text-muted d-flex align-items-center gap-2 p-0">
            <i class="bi bi-share"></i>
            <span class="small">Share</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStores } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const auth = useAuthStores()
const postStore = usePostStore()
const router = useRouter()

// Check if current user owns the post
const isOwner = computed(() => {
  return auth.user?.id === props.post.creator?.id
})

// format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

// Handle edit
const handleEdit = () => {
  router.push({ name: 'CreatePost', query: { edit: props.post.id } })
}

// Handle delete
const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await postStore.deletePost(props.post.id)
      // Optionally show a toast or something
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }
}
</script>

<style scoped>
.post-card {
  margin-bottom: 20px;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  overflow: hidden;
}

.card-header {
  background: transparent;
  border-bottom: 1px solid #e4e6ea;
  padding: 12px 16px;
}

.card-body {
  padding: 16px;
}

.post-text {
  color: #1c1e21;
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  word-wrap: break-word;
}

.card-img-top {
  border-radius: 8px !important;
  border: none;
}

.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
}

.card-footer {
  border-top: 1px solid #e4e6ea;
  padding: 0;
}

.btn-link {
  text-decoration: none;
  border: none;
  background: none;
}

.btn-link:hover {
  text-decoration: none;
  background-color: #f2f3f5;
  border-radius: 6px;
}

.btn-link:focus {
  box-shadow: none;
}

/* Responsive */
@media (max-width: 576px) {
  .card-header,
  .card-body {
    padding: 12px;
  }

  .post-text {
    font-size: 15px;
  }
}
</style>