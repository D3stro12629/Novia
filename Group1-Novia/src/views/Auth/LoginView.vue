<template>
  <main class="login-page">
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <!-- Login Form Column -->
        <div class="col-12 col-lg-5 mx-auto">
          <div class="card login-card border-0">
            <div class="card-body p-5">
              <h2 class="text-center fw-bold mb-1 card-title">Login</h2>
              <p class="text-center card-subtitle mb-4">Welcome back</p>

              <form @submit.prevent="handleLogin">
                <!-- Email or Phone -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-envelope me-1"></i> Email or phone number
                  </label>
                  <input 
                    v-model="email_or_phone" 
                    type="text" 
                    class="form-control custom-input"
                    placeholder="Enter your Email or phone number"
                  >
                  <p v-if="err.email_or_phone" class="field-error pt-2">
                    {{ err.email_or_phone }}
                  </p>
                </div>

                <!-- Password -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-lock me-1"></i> Password
                  </label>
                  <div class="input-group position-relative">
                    <input 
                      v-model="password" 
                      :type="passwordType" 
                      class="form-control custom-input pe-5"
                      placeholder="Enter your password" 
                    />
                    <span class="password-eye" @click="togglePassword">
                      <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                    </span>
                  </div>
                  <p v-if="err.password" class="field-error pt-2">
                    {{ err.password }}
                  </p>
                </div>

                <!-- Remember Me & Forgot PW -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check d-flex align-items-center gap-2">
                    <input class="form-check-input custom-check" type="checkbox" v-model="rememberMe" id="remMe">
                    <label class="form-check-label remember-label text-white" for="remMe">Remember me</label>
                  </div>
                  <router-link to="/forget-password" class="forgot-link text-decoration-none">
                    Forgot password?
                  </router-link>
                </div>

                <!-- Submit Button -->
                <div class="d-grid">
                  <button :disabled="isLoading" type="submit" class="btn login-btn">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    <span>{{ isLoading ? 'Signing In...' : 'Sign In' }}</span>
                  </button>
                </div>

                <p class="text-center mt-4 redirect-text">
                  Don't have an account?
                  <router-link to="/register" class="register-link">Register</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>

        <!-- Image Column -->
        <div class="col-lg-6 d-none d-lg-block text-center">
          <img src="@/assets/img/2.png" class="login-image img-fluid" alt="Login Illustration">
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useAuthStores } from '@/stores/auth'
import { notify } from '@/utils/toast'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const notifier = notify(router)
const auth = useAuthStores()

const email_or_phone = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)

const err = reactive({
  email_or_phone: '',
  password: ''
})

const passwordType = computed(() => showPassword.value ? 'text' : 'password')
const togglePassword = () => { showPassword.value = !showPassword.value }

function validator() {
  err.email_or_phone = !email_or_phone.value.trim() ? 'Email or phone number is required.' : ''
  err.password = !password.value.trim() ? 'Password is required.' : ''
  return !err.email_or_phone && !err.password
}

async function handleLogin() {
  if (!validator()) return
  isLoading.value = true
  try {
    await auth.login(email_or_phone.value, password.value)
    notifier.success('Login Successfully!', '/home')
  } catch (error) {
    notifier.error('Email or password incorrect')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

.login-page {
  background: linear-gradient(135deg, #2d0060, #6a0dad, #9b30ff);
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
}

.login-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  box-shadow: 0 10px 40px rgba(80, 0, 160, 0.35);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-title { color: #ffffff; font-size: 1.8rem; }
.card-subtitle { color: rgba(255, 255, 255, 0.65); font-size: 0.85rem; }
.custom-label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px; color: #ffffff; }

.custom-input {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 12px !important;
  padding: 12px 14px !important;
  color: #ffffff !important;
}

.custom-input::placeholder { color: rgba(255, 255, 255, 0.4); }

.password-eye { 
  position: absolute; 
  right: 15px; 
  top: 50%; 
  transform: translateY(-50%); 
  cursor: pointer; 
  color: rgba(255, 255, 255, 0.7); 
  z-index: 10; 
}

.field-error { font-size: 0.75rem; color: #ffaaaa; }

.login-btn {
  background: linear-gradient(135deg, #9b30ff, #c77dff);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 13px;
  font-weight: 600;
  transition: opacity 0.3s;
}

.login-btn:hover { color: #fff; opacity: 0.9; }
.forgot-link { color: #c77dff; font-size: 0.85rem; }
.redirect-text { color: rgba(255, 255, 255, 0.75); }
.register-link { color: #c77dff; font-weight: 600; text-decoration: none; }
.login-image { width: 100%; border-radius: 20px; }
</style>