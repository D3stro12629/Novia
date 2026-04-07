<template>
  <div class="chat-messages-root">
    <div class="message other">
      <div class="bubble">Hello — welcome to the new chat page!</div>
    </div>
    <div class="message me">
      <div class="bubble">Hi! Nice layout 👋</div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.chat-messages-root { display:flex; flex-direction:column; gap:12px }
.message { display:flex }
.message.other { justify-content:flex-start }
.message.me { justify-content:flex-end }
.bubble { max-width:60%; padding:10px 14px; border-radius:14px; background:#ffffff; box-shadow:0 1px 0 rgba(0,0,0,0.03); }
.message.me .bubble { background:#e9f7ff }
</style>
