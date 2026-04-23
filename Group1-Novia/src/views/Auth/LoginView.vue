<template>
  <main class="login-page">
    <div class="blob-wrapper">
      <div class="profile-header">
        <div class="profile-circle">
          <i class="bi bi-person-fill"></i>
        </div>
      </div>

      <h2 class="text-center text-white fw-bold sign-in-title">Login</h2>

      <form @submit.prevent="handleLogin" class="mt-4">
        <div class="custom-input-group mb-2">
          <div class="icon-box">
            <i class="bi bi-person"></i>
          </div>
          <input 
            v-model="email_or_phone" 
            type="text" 
            placeholder="Enter your Email or Phone" 
            class="inner-input"
          />
        </div>
        <p v-if="err.email_or_phone" class="error-msg">{{ err.email_or_phone }}</p>

        <div class="custom-input-group mb-2 mt-3">
          <div class="icon-box">
            <i class="bi bi-lock"></i>
          </div>
          <input 
            v-model="password" 
            :type="password" 
            placeholder="Enter your password" 
            class="inner-input"
          />
          <span class="eye-icon" @click="togglePassword">
            <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
          </span>
        </div>
        <p v-if="err.password" class="error-msg">{{ err.password }}</p>

        <div class="d-flex justify-content-between align-items-center mt-3 mb-4 links-row">
          <label class="checkbox-container">
            <input type="checkbox" v-model="rememberMe">
            <span>Remember me</span>
          </label>
          <router-link to="/forget-password" class="text-link">Forgot password?</router-link>
        </div>

        <div class="text-center">
          <button :disabled="isLoading" type="submit" class="btn-login-gradient">
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            <span v-else>LOGIN</span>
          </button>
        </div>

        <p class="text-center mt-4 footer-text">
          Don't have account? 
          <router-link to="/register" class="text-link fw-bold">Sign up!</router-link>
        </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useAuthStores } from '@/stores/auth'
import { notify } from '@/utils/toast'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router   = useRouter()
const notifier = notify(router)

let email_or_phone = ref('')
let password       = ref('')
let rememberMe     = ref(false)
let isLoading      = ref(false)
let showPassword   = ref(false)

let auth = useAuthStores()

let err = reactive({
  email_or_phone: '',
  password: ''
})

const passwordType = computed(() => showPassword.value ? 'text' : 'password')
const togglePassword = () => { showPassword.value = !showPassword.value }

function validator() {
  err.email_or_phone = !email_or_phone.value.trim() ? 'Email or phone number is required.' : ''
  err.password       = !password.value.trim()       ? 'Password is required.'              : ''
  return !err.email_or_phone && !err.password
}

async function handleLogin() {
  if (!validator()) return
  isLoading.value = true
  try {
    await auth.Login(email_or_phone.value, password.value)
    notifier.success('Login Successfully!', '/')
  } catch {
    notifier.error('Email or password incorrect')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Background and font */
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #cc2be0, #2196f3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
  padding: 20px;
}

/* Organic Blob Container */
.blob-wrapper {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  width: 100%;
  max-width: 420px;
  padding: 60px 45px 45px;
  border-radius: 40% 60% 50% 50% / 40% 40% 60% 60%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Top Profile Circle */
.profile-header {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}
.profile-circle {
  width: 85px;
  height: 85px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: #c729df;
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.sign-in-title {
  font-size: 2rem;
  margin-top: 10px;
}

/* Input Fields Style */
.custom-input-group {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  padding: 6px 15px;
}

.icon-box {
  width: 36px;
  height: 36px;
  background: linear-gradient(to right, #b727d8, #2196f3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
}

.inner-input {
  background: transparent;
 border: none;
  width: 100%;
  color: rgb(26, 23, 23);
  outline: none;
}
.inner-input::placeholder {
  color: rgba(91, 87, 87, 0.8);
}

.eye-icon {
  cursor: pointer;
  color: white;
}

/* Links and labels */
.links-row, .footer-text {
  font-size: 0.85rem;
  color: white;
}
.text-link {
  color: white;
  text-decoration: none;
}
.text-link:hover {
  text-decoration: underline;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

/* Gradient Button */
.btn-login-gradient {
  background: linear-gradient(to right, #d409cd, #b727d8);
  border: none;
  color: white;
  padding: 12px 50px;
  border-radius: 50px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: 0.3s;
}
.btn-login-gradient:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.error-msg {
  color: #ffbaba;
  font-size: 0.75rem;
  margin: 5px 0 0 15px;
 }
</style>