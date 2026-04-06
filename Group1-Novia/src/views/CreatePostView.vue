<script setup lang="ts">
import { ref, computed } from 'vue';
import { Image as ImageIcon, Tag, Paperclip, Smile, X } from 'lucide-vue-next';

const props = defineProps({
  currentUser: {
    type: Object,
    default: () => ({
      full_name: "Senkropum Nhoem",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg"
    })
  }
});

</script>

<template>
  <div class="create-post-modal" modal fade id="createPostModal"  aria-labelledby="createPostModal" aria-hidden="true">

    <!-- USER INFO -->
    <div class="d-flex align-items-center mb-3">
        <img
            :src="currentUser.avatar"
            class="rounded-circle me-3"
            style="width: 40px; height: 40px; object-fit: cover;"
        />
        <div>
            <h6 class="fw-bold mb-0">{{ currentUser.full_name }}</h6>
            <small class="text-muted">Public</small>
        </div>
    </div>

    <!-- TEXT AREA -->
    <textarea

      class="form-control border-0 p-0 "
      placeholder="What's on your mind?"
      style="min-height: 140px; font-size: 1.2rem; resize: none;"
    ></textarea>

    <!-- IMAGE PREVIEW -->
    </div>

    <hr class="my-4" />

    <!-- ACTION ROW -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <small class="text-muted">Add to your post</small>

      <div class="d-flex align-items-center gap-3">

        <!-- IMAGE -->
        <label class="icon-btn">
          <input type="file" accept="image/*" class="d-none" @change="" />
          <ImageIcon  class="text-success" />
        </label>

        <!-- TAG -->
        <button class="icon-btn">
          <Tag class="text-primary" />
        </button>

        <!-- FILE -->
        <button class="icon-btn">
          <Paperclip  class="text-purple" />
        </button>

        <!-- EMOJI -->
        <button class="icon-btn">
          <Smile class="text-warning" />
        </button>
      </div>
    </div>

    <!-- POST BUTTON -->
    <button class="btn btn-primary w-100 mt-3">Post</button>
</template>

<style scoped>
.icon-btn {
  border: none;
  background: transparent;
  padding: 6px;
  border-radius: 8px;
  transition: 0.2s;
}
.icon-btn:hover {
  background: #f5f5f5;
}
</style>