<template>
  <DashboardLayout>
    <div class="chat-app pt-4 pb-5 bg-gradient-light">
      <div class="container-fluid">
        <div class="row g-3">
          <div class="col-lg-4 col-md-5">
            <div class="card shadow-sm border-0 rounded-4">
              <div class="card-body p-3">
                <h2 class="h5 fw-bold mb-3 text-purple">
                  <i class="bi bi-envelope-paper-heart me-2"></i>Messages
                </h2>
                <ul class="list-unstyled mb-0">
                  <li v-for="conv in conversations" :key="conv.id" class="conversation-item d-flex align-items-center p-2 mb-1 rounded-3"
                    :class="{ 'bg-pink-light border-start border-3 border-purple': activeConversation === conv.id }"
                    @click="selectConversation(conv.id)" style="cursor: pointer; transition: all 0.15s;">
                    <div class="position-relative me-2">
                      <img :src="conv.avatar" :alt="conv.name" class="rounded-circle" width="44" height="44" style="object-fit: cover;">
                      <span 
                        v-if="conv.online" class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style="width: 12px; height: 12px;" ></span>
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-semibold small text-truncate" style="max-width: 120px;">{{ conv.name }}</span>
                        <span class="small text-muted">{{ conv.time }}</span>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="small text-muted text-truncate" style="max-width: 140px;">{{ conv.lastMessage }}</span>
                        <span v-if="conv.unread" class="badge rounded-pill bg-purple ms-2">{{ conv.unread }}</span>
                      </div>
                    </div>
                    <button class="btn btn-link text-secondary p-0 ms-1 opacity-0-hover" @click.stop>
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-lg-8 col-md-7" v-if="currentConversation">
            <div class="card shadow-sm border-0 rounded-4 d-flex flex-column" style="height: calc(100vh - 140px);">
              <div class="card-header bg-white border-0 pt-3 pb-2 px-4 flex-shrink-0">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center gap-3">
                    <div class="position-relative">
                      <img :src="currentConversation.avatar" class="rounded-circle" width="48" height="48" :alt="currentConversation.name">
                      <span v-if="currentConversation.online" class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style="width: 12px; height: 12px;"></span>
                    </div>
                    <div>
                      <h6 class="mb-0 fw-semibold">{{ currentConversation.name }}</h6>
                      <!-- <small :class="currentConversation.online ? 'text-success' : 'text-muted'">
                        <i class="bi bi-circle-fill small me-1"></i>
                        {{ currentConversation.online ? 'Online' : 'Offline' }}
                      </small> -->
                    </div>
                  </div>
                  <div class="d-flex gap-1">
                    <button class="btn btn-link text-secondary p-2 rounded-3">
                      <i class="bi bi-search"></i>
                    </button>
                    <button class="btn btn-link text-secondary p-2 rounded-3">
                      <i class="bi bi-telephone"></i>
                    </button>
                    <button class="btn btn-link text-secondary p-2 rounded-3">
                      <i class="bi bi-emoji-smile"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex-grow-1 p-4 bg-light bg-opacity-50" ref="messagesArea" style="overflow-y: auto;">
                <div v-for="msg in currentMessages" :key="msg.id" class="d-flex align-items-end mb-3" :class="msg.sent ? 'justify-content-end' : 'justify-content-start'">
                  <img v-if="!msg.sent" :src="currentConversation.avatar" class="rounded-circle me-2" width="32" height="32">
                  <div class="p-2 px-3 rounded-3 shadow-sm" :class="msg.sent ? 'bg-dark text-white' : 'bg-white'" style="max-width: 70%; word-wrap: break-word;">
                    <p class="mb-0 small">{{ msg.text }}</p>
                    <span class="small opacity-50 d-block text-end mt-1">{{ msg.time }}</span>
                  </div>
                  <button v-if="msg.sent" class="btn btn-link p-0 ms-1" @click="toggleLike(msg)">
                  </button>
                  <img v-if="msg.sent" src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" class="rounded-circle ms-2" width="32" height="32">
                </div>
              </div>
              <div class="card-footer bg-white border-0 pt-2 pb-3 px-4 flex-shrink-0">
                <div class="d-flex align-items-center bg-light rounded-4 p-1 px-2 border">
                  <button class="btn btn-link text-secondary p-2" title="Attach file">
                    <i class="bi bi-paperclip"></i>
                  </button>
                  <input v-model="newMessage" type="text" class="form-control border-0 bg-transparent shadow-none" placeholder="Type a message..." @keyup.enter="sendMessage">
                  <button class="btn btn-link text-secondary p-2" title="Emoji">
                    <i class="bi bi-emoji-smile"></i>
                  </button>
                  <button class="btn rounded-4 px-3 py-2 ms-2 bg-purple text-white" :disabled="!newMessage.trim()" @click="sendMessage">
                    <i class="bi bi-send-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-7" v-else>
            <div class="card shadow-sm border-0 rounded-4 text-center py-5">
              <div class="card-body">
                <i class="bi bi-chat-dots fs-1 text-purple"></i>
                <p class="text-muted mt-3 mb-0">Select a conversation to start chatting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue"
import axios from "axios"
import DashboardLayout from '../layouts/DashboardLayout.vue'
import api from "../api/http"

const API_URL = "http://novia2.csm.linkpc.net" + "/api/messages"
const conversations = ref([])
const messages = ref([])
const activeConversation = ref(null)
const newMessage = ref("")
const messagesArea = ref(null)

const sender_id = 159 // <-- change to logged-in user

// Select conversation
const selectConversation = (id) => {
  activeConversation.value = id
  fetchMessages(id)
}

// Get current conversation object
const currentConversation = computed(() =>
  conversations.value.find(c => c.id === activeConversation.value)
)

// Messages for UI
const currentMessages = computed(() =>
  messages.value.map(m => ({
    id: m.id,
    text: m.message,
    time: new Date().toLocaleTimeString(),
    sent: m.sender.id === sender_id
  }))
)

// 📥 Fetch messages (you NEED this endpoint)
const fetchMessages = async (receiver_id) => {
  try {
    const res = await axios.get(`${API_URL}?receiver_id=${receiver_id}`)
    messages.value = res.data.data || []
    scrollToBottom()
  } catch (err) {
    console.error("Fetch error:", err)
  }
}

// 📤 Send message*---you need to implement this endpoint (http://novia2.csm.linkpc.net/api/messages)
const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  try {
    const formData = new FormData()
    formData.append("receiver_id", activeConversation.value)
    formData.append("message", newMessage.value)

    const res = await axios.post(API_URL, formData)

    if (res.data.result) {
      messages.value.push(res.data.data)
      newMessage.value = ""
      scrollToBottom()
    }
  } catch (err) {
    console.error("Send error:", err)
  }
}

// Auto scroll
const scrollToBottom = async () => {
  await nextTick()
  if (messagesArea.value) {
    messagesArea.value.scrollTop = messagesArea.value.scrollHeight
  }
}
const messages1 = ref([])

const showMessage = async () => {
  try {
    let result = await api.get('/api/profile/sent-messages')

    console.log('API RESPONSE:', result.data)

    // adjust depending on backend
    messages1.value = result.data.data || result.data

    console.log('MESSAGES:', messages1.value)
  } catch (error) {
    console.error('Error:', error.response?.data || error)
  }
}

onMounted(() => {
  showMessage()
})

// 🔥 Fake conversations (replace with API later)
// onMounted(() => {
//   showMessage
//   conversations.value = [
//     {
//       id: 2,
//       name: "SA",
//       avatar: "http://novia2.csm.linkpc.net/storage/avatars/no_photo.jpg",
//       online: true,
//       lastMessage: "Hello",
//       time: "Now"
//     }
//   ]
// })
</script>

<style scoped>
.bg-gradient-light {
  background: linear-gradient(135deg, #f5f3ff 0%, #f0eff4 100%);
}
.text-purple { color: #e879f9 !important; }
.bg-purple { background-color: #e879f9 !important; }
.bg-pink-light { background-color: #fdf2ff !important; }
.border-purple { border-color: #e879f9 !important; }

.opacity-0-hover {
  opacity: 0;
  transition: opacity 0.2s;
}
.conversation-item:hover .opacity-0-hover { opacity: 1; }
.conversation-item:hover { transform: translateX(2px); }

.btn-link:hover { color: #e879f9 !important; }

.card { transition: transform 0.2s, box-shadow 0.2s; }
.card:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.08) !important; }

.form-control:focus {
  outline: none;
  box-shadow: none;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #e9ecef; border-radius: 10px; }
::-webkit-scrollbar-thumb { background: #c5c0e0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #e879f9; }

/* Message animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.d-flex.mb-3 { animation: fadeIn 0.3s ease-out; }

@media (max-width: 768px) {
  .card { height: auto !important; }
}
</style>