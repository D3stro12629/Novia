<template>
  <main class="login-page">
    <div class="container">
      <div class="row align-items-center min-vh-100">

        <!-- Login Card -->
        <div class="col-12 col-lg-5 mx-auto">
          <div class="card login-card border-0">
            <div class="card-body p-5">
              <h2 class="text-center fw-bold mb-1 card-title">Login</h2>
              <p class="text-center card-subtitle mb-4">Welcome back</p>

              <form @submit.prevent="handleLogin">

                <!-- Email or Phone -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-envelope"></i> Email or phone number
                  </label>
                  <input v-model="email_or_phone" type="text" class="form-control custom-input"
                    placeholder="Enter your Email or phone number">
                  <p v-if="err.email_or_phone" class="field-error pt-2">
                    {{ err.email_or_phone }}
                  </p>
                </div>

                <!-- Password -->
                <div class="mb-3">
                  <label class="custom-label">
                    <i class="bi bi-lock"></i> Password
                  </label>
                  <div class="input-group position-relative">
                    <input v-model="password" :type="passwordType"
                      class="form-control custom-input pe-5 rounded-3"
                      placeholder="Enter your password" />
                    <span class="password-eye" @click="togglePassword">
                      <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                    </span>
                  </div>
                  <p v-if="err.password" class="field-error pt-2">
                    {{ err.password }}
                  </p>
                </div>

                <!-- Remember + Forgot -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check d-flex align-items-center gap-2">
                    <input class="form-check-input custom-check" type="checkbox" v-model="rememberMe">
                    <label class="form-check-label remember-label">Remember me</label>
                  </div>
                  <router-link to="/forget-password" class="forgot-link">
                    Forgot password?
                  </router-link>
                </div>

                <!-- Button -->
                <div class="d-grid">
                  <button :disabled="isLoading" type="submit" class="btn login-btn">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    <span v-else>Sign In</span>
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

        <!-- Image -->
        <div class="col-lg-6 d-none d-lg-block">
          <img src="../../assets/img/2.png" class="login-image" alt="Login Image">
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

.login-page {
  background: linear-gradient(135deg, #2d0060, #6a0dad, #9b30ff);
  font-family: "Poppins", sans-serif;
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
  to   { opacity: 1; transform: translateY(0); }
}

.card-title {
  color: #ffffff;
  font-size: 1.8rem;
}

.card-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.85rem;
}

.custom-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #ffffff;
}

.custom-input {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 12px !important;
  padding: 12px 14px !important;
  color: #ffffff !important;
  font-family: "Poppins", sans-serif;
  transition: 0.3s;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.custom-input:focus {
  border-color: rgba(200, 150, 255, 0.8) !important;
  box-shadow: 0 0 0 3px rgba(155, 48, 255, 0.2) !important;
  background: rgba(255, 255, 255, 0.18) !important;
  outline: none;
}

.password-eye {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  z-index: 5;
  transition: color 0.2s;
}

.password-eye:hover { color: #ffffff; }

.field-error {
  font-size: 0.75rem;
  color: #ffaaaa;
  margin-top: 2px;
  padding-left: 2px;
}

.custom-check {
  width: 16px;
  height: 16px;
  accent-color: #9b30ff;
  cursor: pointer;
}

.remember-label {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  margin: 0;
}

.forgot-link {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.82rem;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover { color: #ffffff; }

.login-btn {
  background: linear-gradient(135deg, #9b30ff, #c77dff);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 13px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 18px rgba(155, 48, 255, 0.45);
  transition: 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(155, 48, 255, 0.55);
  background: linear-gradient(135deg, #a94dff, #d18bff);
  color: #ffffff;
}

.login-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.redirect-text {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
}

.register-link {
  color: #c77dff;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.register-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

.login-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  filter: drop-shadow(0 8px 32px rgba(80, 0, 160, 0.3));
}
</style>