<template>
  <div class="chat-input-root">
    <input v-model="text" @keyup.enter="send" placeholder="Type message" />
    <button @click="send">➤</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
function send() {
  if (!text.value.trim()) return
  // temporary: just clear and log — integrate with store/backend later
  console.log('send message:', text.value)
  text.value = ''
}
</script>

<style scoped>
.chat-input-root { display:flex; gap:8px; align-items:center }
.chat-input-root input { flex:1; padding:12px 16px; border-radius:24px; border:1px solid #eee; outline:none }
.chat-input-root button { width:44px; height:44px; border-radius:50%; background:#ff66cc; color:#fff; border:none }
</style>
