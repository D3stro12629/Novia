<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { usePostStore } from '@/stores/post';
import { useRoute } from 'vue-router';

const emit = defineEmits(['post-created']);

const route = useRoute();
const postStore = usePostStore();
const content = ref('');
const image = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const loading = ref(false);
const emojis = ['😀','😂','😍','🔥','👍','❤️','🎉','😎'];
const showEmoji = ref(false);
const textarea = ref<HTMLTextAreaElement | null>(null);
const isEditing = ref(false);
const editingPostId = ref<number | null>(null);

// auto expand textarea
const autoResize = async () => {
  await nextTick();
  if (!textarea.value) return;
  textarea.value.style.height = 'auto';
  textarea.value.style.height = textarea.value.scrollHeight + 'px';
};

// Check for edit mode
onMounted(async () => {
  const editId = route.query.edit as string;
  if (editId) {
    isEditing.value = true;
    editingPostId.value = parseInt(editId);
    try {
      await postStore.fetchPostById(editingPostId.value);
      const post = postStore.post;
      if (post) {
        content.value = post.text || '';
        if (post.image) {
          imagePreview.value = post.image;
        }
        autoResize();
      }
    } catch (error) {
      console.error('Failed to load post for editing:', error);
    }
  }
});

// add emoji
const addEmoji = (e: string) => {
  content.value += e;
  autoResize();
};

// image upload
const uploadImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  image.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

// submit
const submitPost = async () => {
  if (!content.value && !image.value) return;

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('text', content.value);
    if (image.value) {
      formData.append('image', image.value);
    }

    if (isEditing.value && editingPostId.value) {
      await postStore.updatePost(editingPostId.value, formData);
    } else {
      await postStore.addPost(formData);
    }

    // Reset form
    content.value = '';
    image.value = null;
    imagePreview.value = null;
    showEmoji.value = false;

    emit('post-created');
  } catch (error) {
    console.error('Failed to create/update post:', error);
    // You might want to show an error message to the user here
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="composer">
    <div class="composer-header">
      <div class="user-avatar">
        <img src="https://via.placeholder.com/40" alt="User" class="avatar-img">
      </div>
      <div class="composer-input">
        <textarea
          ref="textarea"
          v-model="content"
          class="textarea"
          placeholder="What's on your mind?"
          @input="autoResize"
        />
      </div>
    </div>

    <img v-if="imagePreview" :src="imagePreview" class="preview" alt="Preview" />

    <div class="actions">
      <label class="btn">
        📷 Photo
        <input type="file" hidden @change="uploadImage" accept="image/*" />
      </label>

      <button class="btn" @click="showEmoji = !showEmoji">
        😊 Emoji
      </button>

      <button
        class="post"
        @click="submitPost"
        :disabled="loading || (!content && !image)"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ loading ? (isEditing ? 'Updating...' : 'Posting...') : (isEditing ? 'Update Post' : 'Post') }}
      </button>
    </div>

    <div v-if="showEmoji" class="emoji-box">
      <span
        v-for="e in emojis"
        :key="e"
        @click="addEmoji(e)"
        class="emoji"
      >
        {{ e }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.composer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.composer-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.composer-input {
  flex: 1;
}

.textarea {
  width: 100%;
  min-height: 40px;
  border: none;
  outline: none;
  resize: none;
  font-size: 18px;
  line-height: 1.4;
  color: #1c1e21;
  font-family: inherit;
}

.textarea::placeholder {
  color: #8a8d91;
}

.preview {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e4e6ea;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #e4e6ea;
}

.btn {
  cursor: pointer;
  background: none;
  border: none;
  color: #65676b;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn:hover {
  background-color: #f2f3f5;
}

.post {
  background: #1877f2;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.post:hover:not(:disabled) {
  background: #166fe5;
}

.post:disabled {
  background: #e4e6ea;
  color: #bcc0c4;
  cursor: not-allowed;
}

.emoji-box {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px;
  background: #f2f3f5;
  border-radius: 8px;
}

.emoji {
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.emoji:hover {
  background: white;
}

/* Responsive */
@media (max-width: 576px) {
  .composer {
    padding: 12px;
  }

  .composer-header {
    gap: 8px;
  }

  .avatar-img {
    width: 36px;
    height: 36px;
  }

  .textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .actions {
    flex-wrap: wrap;
    gap: 8px;
  }

  .btn {
    padding: 6px 10px;
    font-size: 13px;
  }

  .post {
    padding: 6px 12px;
  }
}
</style>