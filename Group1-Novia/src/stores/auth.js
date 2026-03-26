<<<<<<< HEAD
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api/https";

export const useAuthStore = defineStore("auth", () => {
  let user = ref(null);
  let token = ref(localStorage.getItem("token"));
  let isLoggedIn = computed(() => !!token.value);

  async function login(email_or_phone, password) {
    const res = await api.post("/api/login", { email_or_phone, password });
    console.log(res);
    user.value = res.data.data.name;
    token.value = res.data.data.token;
    localStorage.setItem("token", token.value);
    if (!res.data.result) {
      throw new Error(res.data.message || "Invalid email or password");
    }
  }

  async function logout() {
    const res = await api.delete("/api/logout");
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
  }

  async function register(name, email, password, password_confirmation) {
    await api.post("/api/register", {
      name,
      email,
      password,
      password_confirmation,
    });
  }

  return { user, token, isLoggedIn, login, logout, register, forgotPassword, verifyOtp, resetPassword };
});
=======
import api from "@/api/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStores = defineStore('auth', () => {
    const user  = ref(null);
    const token = ref(localStorage.getItem('token'));
    const isLoggedIn = computed(() => !!token.value)

    // ─── Login ─────────────────────────────────────────────────────────────────
    async function Login(email_or_phone, password) {
        try {
            const form = new FormData();
            form.append('email_or_phone', email_or_phone);
            form.append('password', password);

            const res = await api.post('/api/login', form);
            if (!res.data.result) {
                throw new Error(res.data.message || 'Login failed')
            }

            user.value  = res.data.data.user;
            token.value = res.data.data.token;
            localStorage.setItem('token', token.value);

        } catch (error) {
            throw error.response
        }
    }

    // ─── Logout ────────────────────────────────────────────────────────────────
    async function Logout() {
        await api.delete('/api/logout');
        token.value = null;
        user.value  = null;
        localStorage.removeItem('token')
    }

    // ─── Register ──────────────────────────────────────────────────────────────
  async function Register({ full_name, email, phone, password, password_confirmation }) {
    try {
        let form = {
            full_name,
            email,
            phone,
            password,
            password_confirmation
        };
        console.log(form);
        let res = await api.post('/api/register', form);
        console.log(res);

        
        if (!res.data.result) {
            throw new Error(res.data.message || 'Register failed');
        }

        return res.data;

    } catch (error) {
        
        if (error.response?.status === 422) {
            console.log(error.response.data);
            throw {
                
                message: error.response.data.message,

                errors: error.response.data.data
            };
        }
        throw new Error(error.response?.data?.message || error.message || 'Something went wrong');
    }
}

    // ─── Forgot Password ───────────────────────────────────────────────────────
    async function ForgotPassword(email) {
        try {
            const form = new FormData();
            form.append('email', email);

            const res = await api.post('/api/forgot/pass', form);
            if (!res.data.result) {
                throw new Error(res.data.message || 'Failed to send OTP')
            }
            return res.data;

        } catch (error) {
            throw error.response
        }
    }

    // ─── Verify OTP ────────────────────────────────────────────────────────────
    async function VerifyOtp(email, otp) {
        try {
            const form = new FormData();
            form.append('email', email);
            form.append('otp', otp);

            const res = await api.post('/api/forgot/verify-otp', form);
            if (!res.data.result) {
                throw new Error(res.data.message || 'Invalid OTP')
            }
            return res.data;

        } catch (error) {
            throw error.response
        }
    }

    // ─── Profile ───────────────────────────────────────────────────────────────
    async function Profile() {
        const res = await api.get('/api/profile');
        console.log(res);
    }

    return { user, token, isLoggedIn, Login, Logout, Register, ForgotPassword, VerifyOtp, Profile }

})
>>>>>>> 8095933eb0b8806bab3616198206a7e90866e0df
