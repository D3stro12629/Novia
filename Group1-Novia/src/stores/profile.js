import { defineStore } from "pinia"
import axios from "axios"

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile:  null,   // loaded via "Get profile detail"
    loading:  false,
    error:    null,
  }),

  actions: {
    async getProfile() {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.get("/api/profile")
        if (res.data.result) {
          this.profile = res.data.data
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── GET  /api/profile/:userId ── Get profile detail by user id ──────
    // response: same shape as getProfile()
    async getProfileByUserId(userId) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.get(`/api/profile/${userId}`)
        if (res.data.result) {
          this.profile = res.data.data
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── PUT  /api/profile/personal ── Update profile - personal info ─────
    // payload: { full_name, dob, gender, current_city, home_town, phone, portfolio_link }
    // response: { result, code, message, data: { ...updated profile } }
    async updatePersonalInfo(payload) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.put("/api/profile/personal", payload)
        if (res.data.result) {
          this.profile = { ...this.profile, ...res.data.data }
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateProfessional(payload) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.put("/api/profile/professional", payload)
        if (res.data.result) {
          this.profile = { ...this.profile, ...res.data.data }
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    async updateAvatar(file) {
      this.loading = true
      this.error   = null
      try {
        const form = new FormData()
        form.append("avatar", file)
        const res = await axios.post("/api/profile/avatar", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        if (res.data.result && this.profile) {
          this.profile.avatar = res.data.data.avatar
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── DEL  /api/profile/avatar ── Delete profile - avatar ─────────────
    // response: { result, code, message, data: null }
    async deleteAvatar() {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.delete("/api/profile/avatar")
        if (res.data.result && this.profile) {
          this.profile.avatar = null
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── PUT  /api/profile/skill ── Update profile - skill ───────────────
    // payload: { skills: [{ name }] }  or  { skill_ids: [1,2,3] }
    // response: { result, code, message, data: { skills: [] } }
    async updateSkill(payload) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.put("/api/profile/skill", payload)
        if (res.data.result && this.profile) {
          this.profile.skills = res.data.data.skills ?? res.data.data
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── POST /api/profile/cv ── Update profile - cv ──────────────────────
    // payload: FormData { cv: File }
    // response: { result, code, message, data: { cv: "url" } }
    async updateCV(file) {
      this.loading = true
      this.error   = null
      try {
        const form = new FormData()
        form.append("cv", file)
        const res = await axios.post("/api/profile/cv", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        if (res.data.result && this.profile) {
          this.profile.cv = res.data.data.cv
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── POST /api/profile/collaboration ── Update profile - collaboration ─
    // payload: FormData { company_logo?: File, company_link?: string }
    // response: { result, code, message, data: { collaboration: { company_logo, company_link } } }
    async updateCollaboration(payload) {
      this.loading = true
      this.error   = null
      try {
        // payload can be a plain object or FormData (if uploading logo file)
        const isFormData = payload instanceof FormData
        const res = await axios.post("/api/profile/collaboration", payload, {
          headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
        })
        if (res.data.result && this.profile) {
          this.profile.collaboration = res.data.data.collaboration ?? res.data.data
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── PUT  /api/profile/password ── Change password ────────────────────
    // payload: { current_password, password, password_confirmation }
    // response: { result, code, message, data: null }
    async changePassword(payload) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.put("/api/profile/password", payload)
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── DEL  /api/profile ── Delete account ──────────────────────────────
    // response: { result, code, message, data: null }
    async deleteAccount() {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.delete("/api/profile")
        if (res.data.result) {
          this.profile = null
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── POST /api/profile/cover ── Update profile - cover ────────────────
    // payload: FormData { cover: File }
    // response: { result, code, message, data: { cover: "url" } }
    async updateCover(file) {
      this.loading = true
      this.error   = null
      try {
        const form = new FormData()
        form.append("cover", file)
        const res = await axios.post("/api/profile/cover", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        if (res.data.result && this.profile) {
          this.profile.cover = res.data.data.cover
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── DEL  /api/profile/cover ── Reset profile - cover ─────────────────
    // response: { result, code, message, data: null }
    async deleteCover() {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.delete("/api/profile/cover")
        if (res.data.result && this.profile) {
          this.profile.cover = null
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── Helpers ────────────────────────────────────────────────────────────
    clearProfile() {
      this.profile = null
      this.error   = null
    },
  },
})