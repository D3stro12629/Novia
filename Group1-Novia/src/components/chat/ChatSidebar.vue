<template>
  <aside class="chat-sidebar">
    <div class="title">Messages</div>
    <ul class="conversations">
      <li v-for="item in items" :key="item.id" class="conv">
        <div class="avatar">{{ item.initial }}</div>
        <div class="meta">
          <div class="name">{{ item.name }}</div>
          <div class="preview">{{ item.preview }}</div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Sharad Mishra', preview: 'You: ...', initial: 'S' },
  { id: 2, name: 'Alicia Keys', preview: 'You: Hello', initial: 'A' },
  { id: 3, name: 'Design Team', preview: 'You: Meeting at 3', initial: 'D' },
])
</script>

<style scoped>
.chat-sidebar {
  display: flex;
  flex-direction: column;
}
.title {
  color: #ff66cc;
  font-weight: 700;
  margin-bottom: 12px;
}
.conversations { list-style: none; padding: 0; margin: 0; }
.conv { display:flex; gap:12px; padding:10px; align-items:center; border-radius:6px; margin-bottom:8px; background:#fafafa; }
.avatar { width:42px; height:42px; border-radius:50%; background:#111; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700 }
.name { font-weight:600 }
.preview { color:#888; font-size:13px }
</style>
