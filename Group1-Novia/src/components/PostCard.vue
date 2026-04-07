<template>
  <div class="col-11 bg-white ms-5 rounded shadow border-0 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div class="card h-100 p-3 p-4  justify-between border-0">
      <div class="d-flex align-items-center mt-2 gap-2">
        <img
          :src="post.creator.avatar"
          class="rounded-circle"
          style="width: 40px; height: 40px; object-fit: cover;"
        />
        <div >
          <div class="fw-semibold text-body">{{ post.creator.full_name }}</div>

          <div class="text-muted" flex-row gap-1 style="font-size: 0.90rem;">
            {{ formatDate(post.created_at) }}
          <span class="text-muted">•</span>
          <span class="text-muted">{{ post.creator.current_city }}</span>
          </div>
        </div>
      </div>
      <img
        v-if="post.image && !post.image.endsWith('/storage/posts')"
        :src="post.image"
        class="card-img-top rounded-3 mt-3"
        alt="Post image"
        style="width: 100%; height: 300px; object-fit: cover;"
      />

      <!-- Attachment (if image is empty or second photo) -->
      <img
        v-if="post.attachments"
        :src="post.attachments"
        class="card-img-top rounded-3 mb-3"
        alt="Attachment image"
        style="width: 100%; height: 300px; object-fit: cover;"
      />

      <!-- Category Badges -->
      <div class="d-flex gap-2 flex-wrap mt-3">
        <span
          v-for="cat in post.categories"
          :key="cat.id"
          class="badge bg-primary"
        >
          {{ cat.name }}
        </span>

        <!-- If no category, show Draft -->
        <span
          v-if="post.categories.length === 0"
          class="badge bg-warning text-dark"
        >
          Draft
        </span>
      </div>

      <!-- Text -->
      <h5 class="fw-bold">{{ post.text }}</h5>

      <!-- Creator -->
    <div class="card-footer bg-white border-gray-200 mt-3">
        <div class="d-flex justify-content-around">
          <button class="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors border-0 bg-transparent">
            <Heart/>
            <span class="text-sm">Like</span>
          </button>
          <button class="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors border-0 bg-transparent">
            <MessageCircle/>
            <span class="text-sm">Comment</span>
          </button>
          <button class="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors border-0 bg-transparent">
            <Share2 />
            <span class="text-sm ">Share</span>
          </button>
        </div>
      </div>

    </div>
    </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>