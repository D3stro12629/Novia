<template>
  <main class="login-page">
    <div class="blob-wrapper">
      <div class="profile-header">
        <div class="profile-circle">
          <i class="bi bi-person-plus-fill"></i>
        </div>
      </div>

      <h2 class="text-center text-white fw-bold sign-in-title">Register</h2>
      <p class="text-center subtitle">Create new account</p>

      <form @submit.prevent="handleRegister" novalidate class="mt-4">
        
        <div class="custom-input-group mb-1">
          <div class="icon-box">
            <i class="bi bi-person-fill"></i>
          </div>
          <input 
            v-model="form.full_name" 
            type="text" 
            placeholder="Full Name" 
            class="inner-input"
          />
        </div>
        <p v-if="errors.full_name" class="error-msg mb-2">{{ errors.full_name }}</p>

        <div class="custom-input-group mb-1 mt-3">
          <div class="icon-box">
            <i class="bi bi-envelope-fill"></i>
          </div>
          <input 
            v-model="form.email" 
            type="text" 
            placeholder="Email" 
            class="inner-input"
          />
        </div>
        <p v-if="errors.email" class="error-msg mb-2">{{ errors.email }}</p>

        <div class="custom-input-group mb-1 mt-3">
          <div class="icon-box">
            <i class="bi bi-telephone-fill"></i>
          </div>
          <input 
            v-model="form.phone" 
            type="text" 
            placeholder="Phone Number" 
            class="inner-input"
          />
        </div>
        <p v-if="errors.phone" class="error-msg mb-2">{{ errors.phone }}</p>

        <div class="custom-input-group mb-1 mt-3">
          <div class="icon-box">
            <i class="bi bi-lock-fill"></i>
          </div>
          <input 
            v-model="form.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            class="inner-input"
          />
          <span class="eye-icon" @click="togglePassword">
            <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
          </span>
        </div>
        <p v-if="errors.password" class="error-msg mb-2">{{ errors.password }}</p>

        <div class="custom-input-group mb-1 mt-3">
          <div class="icon-box">
            <i class="bi bi-lock-fill"></i>
          </div>
          <input 
            v-model="form.confirmPassword" 
            :type="showConfirmPassword ? 'text' : 'password'" 
            placeholder="Confirm Password" 
            class="inner-input"
          />
          <span class="eye-icon" @click="toggleConfirmPassword">
            <i :class="showConfirmPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
          </span>
        </div>
        <p v-if="errors.confirmPassword" class="error-msg mb-2">{{ errors.confirmPassword }}</p>

        <div class="d-flex justify-content-between align-items-center mt-3 mb-4 links-row">
          <label class="checkbox-container">
            <input type="checkbox" v-model="rememberMe" class="purple-check" style="margin-left: 20px;">
            <span style="margin-left: 10px;">Remember me</span>
          </label>
          <router-link to="/forget-password" class="text-link" style="margin-right: 10px;">Forgot password?</router-link>
        </div>

        <div class="text-center">
          <button :disabled="isLoading" type="submit" class="btn-login-gradient">
            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
            <span v-else>Submite</span>
          </button>
        </div>

        <p class="text-center mt-4 footer-text">
          Already have an account? 
          <router-link to="/login" class="text-link fw-bold">Login</router-link>
        </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useAuthStores } from "@/stores/auth";
import { notify } from "@/utils/toast";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router   = useRouter();
const notifier = notify(router);
const auth     = useAuthStores();

const isLoading           = ref(false);
const rememberMe          = ref(false);
const showPassword        = ref(false);
const showConfirmPassword = ref(false);
let error = ref('');

const form = ref({
  full_name:       "",
  email:           "",
  phone:           "",
  password:        "",
  confirmPassword: "",
});

const errors = ref({});

const togglePassword        = () => { showPassword.value        = !showPassword.value; };
const toggleConfirmPassword = () => { showConfirmPassword.value = !showConfirmPassword.value; };

function validateForm() {
  errors.value = {};
  if (!form.value.full_name.trim()) {
    errors.value.full_name = "Full name is required.";
  } else if (form.value.full_name.trim().length < 2) {
    errors.value.full_name = "Full name must be at least 2 characters.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim()) {
    errors.value.email = "Email is required.";
  } else if (!emailRegex.test(form.value.email.trim())) {
    errors.value.email = "Please enter a valid email.";
  }
  const phoneRegex = /^[0-9]{9,15}$/;
  if (!form.value.phone.trim()) {
    errors.value.phone = "Phone number is required.";
  } else if (!phoneRegex.test(form.value.phone.trim())) {
    errors.value.phone = "Phone must be 9–15 digits.";
  }
  if (!form.value.password.trim()) {
    errors.value.password = "Password is required.";
  } else if (form.value.password.length < 4) {
    errors.value.password = "Password must be at least 4 characters.";
  }
  if (!form.value.confirmPassword.trim()) {
    errors.value.confirmPassword = "Confirm password is required.";
  } else if (form.value.confirmPassword !== form.value.password) {
    errors.value.confirmPassword = "Passwords do not match.";
  }
  return Object.keys(errors.value).length === 0;
}

async function handleRegister() {
  if (!validateForm()) return;
  isLoading.value = true;
  try {
    await auth.Register({
      full_name:             form.value.full_name.trim(),
      email:                 form.value.email.trim(),
      phone:                 form.value.phone.trim(),
      password:              form.value.password,
      password_confirmation: form.value.confirmPassword,
    });
    notifier.success("Register Successfully!", "/");
  } catch (err) {
    console.log(err);
    if (err.errors?.email) {
      error.value = err.errors.email[0];
    } else if (err.errors?.phone) {
      error.value = err.errors.phone[0];
    }
    notifier.error(error.value);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #2d0060 0%, #6a11cb 50%, #8e2de2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
}

.blob-wrapper {
  background: rgba(142, 45, 226, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100%;
  max-width: 500px;
  padding: 70px 45px 45px;
  border-radius: 42% 58% 50% 50% / 35% 35% 65% 65%; /* Register needs a taller blob */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-header {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
}
.profile-circle {
  width: 90px;
  height: 90px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #8e2de2;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.sign-in-title {
  font-size: 2.2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  margin-bottom: 0;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.custom-input-group {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 8px 18px;
  transition: 0.3s;
}

.icon-box {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #b727d8, #6a11cb);
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
  color: white;
  outline: none;
}
.inner-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.eye-icon {
  cursor: pointer;
  color: white;
  opacity: 0.8;
}

.links-row, .footer-text {
  font-size: 0.85rem;
  color: white;
}

.text-link {
  color: #e0aaff;
  text-decoration: none;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.purple-check {
  accent-color: #b727d8;
}

.btn-login-gradient {
  background: linear-gradient(to right, #8e2de2, #b727d8);
  border: none;
  color: white;
  padding: 14px 60px;
  border-radius: 50px;
  font-weight: 700;
  letter-spacing: 1.5px;
  box-shadow: 0 8px 25px rgba(142, 45, 226, 0.4);
  transition: 0.3s;
  width: 70%;
}

.btn-login-gradient:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.error-msg {
  color: #ff9999;
  font-size: 0.75rem;
  margin-left: 20px;
  font-weight: 500;
}
</style>