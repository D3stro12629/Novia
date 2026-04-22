<template>
  <div class="message-panel">
    <!-- Header -->
    <div class="message-header">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h2 class="message-title">Messages</h2>
          <p class="message-subtitle">Stay connected with your network</p>
        </div>
        <button class="btn btn-close-panel" @click="closePanel">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="message-content">
      <!-- Conversations List -->
      <div class="conversations-sidebar">
        <!-- Search -->
        <div class="search-section">
          <div class="search-input-wrapper">
            <i class="bi bi-search search-icon"></i>
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search messages..."
              v-model="searchQuery"
            >
          </div>
        </div>

        <!-- Conversations -->
        <div class="conversations-list">
          <div
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            class="conversation-item"
            :class="{ active: selectedConversation?.id === conversation.id }"
            @click="selectConversation(conversation)"
          >
            <div class="conversation-avatar">
              <img :src="conversation.avatar" :alt="conversation.name" class="avatar-img">
              <div v-if="conversation.online" class="online-indicator"></div>
            </div>
            <div class="conversation-info">
              <div class="conversation-header">
                <h6 class="conversation-name">{{ conversation.name }}</h6>
                <span class="conversation-time">{{ conversation.timestamp }}</span>
              </div>
              <p class="conversation-message">{{ conversation.lastMessage }}</p>
            </div>
            <div v-if="conversation.unread > 0" class="unread-badge">
              {{ conversation.unread }}
            </div>
          </div>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="messages-area">
        <div v-if="selectedConversation" class="messages-container">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="chat-avatar">
                  <img :src="selectedConversation.avatar" :alt="selectedConversation.name" class="avatar-img">
                  <div v-if="selectedConversation.online" class="online-indicator"></div>
                </div>
                <div class="chat-info">
                  <h6 class="chat-name">{{ selectedConversation.name }}</h6>
                  <span class="chat-status">
                    {{ selectedConversation.online ? 'Active now' : 'Offline' }}
                  </span>
                </div>
              </div>
              <div class="chat-actions">
                <button class="btn btn-action">
                  <i class="bi bi-telephone"></i>
                </button>
                <button class="btn btn-action">
                  <i class="bi bi-camera-video"></i>
                </button>
                <button class="btn btn-action">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div class="messages-list" ref="messagesContainer">
            <div
              v-for="message in messages"
              :key="message.id"
              class="message-item"
              :class="{ 'message-own': message.isOwn }"
            >
              <div class="message-avatar">
                <img :src="message.senderAvatar" :alt="message.sender" class="avatar-img">
              </div>
              <div class="message-content-wrapper">
                <div class="message-bubble" :class="{ 'message-own-bubble': message.isOwn }">
                  <p class="message-text">{{ message.content }}</p>
                </div>
                <span class="message-time">{{ message.timestamp }}</span>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="message-input-section">
            <div class="input-wrapper">
              <button class="btn btn-attachment">
                <i class="bi bi-paperclip"></i>
              </button>
              <textarea
                class="form-control message-textarea"
                placeholder="Type your message..."
                v-model="newMessage"
                @keydown="handleKeyPress"
                rows="1"
              ></textarea>
              <button class="btn btn-emoji">
                <i class="bi bi-emoji-smile"></i>
              </button>
              <button class="btn btn-send" @click="sendMessage" :disabled="!newMessage.trim()">
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-chat-dots"></i>
          </div>
          <h5>Select a conversation</h5>
          <p>Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Reactive data
const searchQuery = ref('')
const selectedConversation = ref(null)
const newMessage = ref('')
const messagesContainer = ref(null)

// Conversations data
const conversations = ref([
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    lastMessage: 'That sounds great! When can we schedule a call?',
    timestamp: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastMessage: 'I\'ve reviewed the project proposal',
    timestamp: '1h ago',
    unread: 1,
    online: true,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    lastMessage: 'Thanks for the feedback!',
    timestamp: '3h ago',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    lastMessage: 'Let\'s collaborate on this',
    timestamp: '1d ago',
    unread: 0,
    online: false,
  },
])

// Messages data
const messages = ref([
  {
    id: 1,
    sender: 'Sarah Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'Hi! I saw your portfolio and I\'m really impressed with your work.',
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: 2,
    sender: 'You',
    senderAvatar: 'https://ui-avatars.com/api/?name=You&background=6366f1&color=fff',
    content: 'Thank you so much! I really appreciate that.',
    timestamp: '10:32 AM',
    isOwn: true,
  },
  {
    id: 3,
    sender: 'Sarah Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'I have a project that might be a great fit for your skills. Would you be interested in discussing it?',
    timestamp: '10:33 AM',
    isOwn: false,
  },
  {
    id: 4,
    sender: 'You',
    senderAvatar: 'https://ui-avatars.com/api/?name=You&background=6366f1&color=fff',
    content: 'Absolutely! I\'d love to hear more about it.',
    timestamp: '10:35 AM',
    isOwn: true,
  },
  {
    id: 5,
    sender: 'Sarah Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content: 'That sounds great! When can we schedule a call?',
    timestamp: '10:36 AM',
    isOwn: false,
  },
])

// Computed
const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value
  return conversations.value.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Functions
const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  // Mark as read
  conversation.unread = 0
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const message = {
    id: messages.value.length + 1,
    sender: 'You',
    senderAvatar: 'https://ui-avatars.com/api/?name=You&background=6366f1&color=fff',
    content: newMessage.value,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isOwn: true,
  }

  messages.value.push(message)
  newMessage.value = ''

  // Scroll to bottom
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const closePanel = () => {
  router.push('/')
}

// Lifecycle
onMounted(() => {
  // Select first conversation by default
  if (conversations.value.length > 0) {
    selectedConversation.value = conversations.value[0]
  }

  // Scroll to bottom
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})
</script>

<style scoped>
.message-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1050;
  display: flex;
  flex-direction: column;
}

.message-header {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.message-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
}

.message-subtitle {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.btn-close-panel {
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-close-panel:hover {
  background: rgba(255, 255, 255, 0.2);
}

.message-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Conversations Sidebar */
.conversations-sidebar {
  width: 320px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.search-section {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  z-index: 1;
}

.search-input {
  padding-left: 2.5rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.search-input:focus {
  background: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.25rem;
}

.conversation-item:hover {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.conversation-item.active {
  background: white;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.conversation-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.conversation-name {
  margin: 0;
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
}

.conversation-time {
  font-size: 0.75rem;
  color: #94a3b8;
}

.conversation-message {
  margin: 0;
  font-size: 0.85rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
}

/* Messages Area */
.messages-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.messages-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
}

.chat-avatar {
  position: relative;
  margin-right: 0.75rem;
}

.chat-avatar .avatar-img {
  width: 40px;
  height: 40px;
}

.chat-info h6 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.chat-status {
  font-size: 0.8rem;
  color: #64748b;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  background: none;
  border: none;
  color: #64748b;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.btn-action:hover {
  background: #f1f5f9;
  color: #6366f1;
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.message-item.message-own {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.message-avatar .avatar-img {
  width: 32px;
  height: 32px;
}

.message-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 70%;
}

.message-item.message-own .message-content-wrapper {
  align-items: flex-end;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 18px;
  max-width: 100%;
  word-wrap: break-word;
}

.message-bubble:not(.message-own-bubble) {
  background: #f1f5f9;
  color: #1e293b;
  border-bottom-left-radius: 4px;
}

.message-own-bubble {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.message-time {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.25rem;
  padding: 0 0.5rem;
}

/* Message Input */
.message-input-section {
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  background: white;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}

.btn-attachment,
.btn-emoji {
  background: none;
  border: none;
  color: #64748b;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-attachment:hover,
.btn-emoji:hover {
  background: #f1f5f9;
  color: #6366f1;
}

.message-textarea {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.75rem 1rem;
  resize: none;
  background: #f8fafc;
  font-size: 0.9rem;
  line-height: 1.4;
  max-height: 120px;
  overflow-y: auto;
}

.message-textarea:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.btn-send {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-send:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
}

.btn-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Empty State */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #64748b;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h5 {
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .conversations-sidebar {
    width: 280px;
  }

  .message-title {
    font-size: 1.5rem;
  }

  .message-header {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 576px) {
  .conversations-sidebar {
    display: none;
  }

  .message-content {
    flex-direction: column;
  }

  .messages-area {
    flex: 1;
  }
}
</style>