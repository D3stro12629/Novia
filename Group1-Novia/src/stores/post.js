import { defineStore } from "pinia"
import axios from "axios"

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],       // list from "Get all post"
    post: null,      // single from "Get post detail by id"
    loading: false,
    error: null,
  }),

  actions: {
    // ── POST  /api/posts ── Add new post ───────────────
    // payload: FormData { text, image?, attachments?, categories[]? }
    // response: { result, code, message, data: { id, text, image, creator, categories, attachments, created_at } }
    async addPost(payload) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.post("/api/posts", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        if (res.data.result) {
          this.posts.unshift(res.data.data)
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── GET   /api/posts ── Get all post ───────────────
    // response: { result, code, message, data: [ { id, text, image, creator, categories, attachments, created_at }, ... ] }
    async getAllPosts(params = {}) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.get("/api/posts", { params })
        if (res.data.result) {
          this.posts = res.data.data
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── GET   /api/posts/:id ── Get post detail by id ──
    // response: { result, code, message, data: { id, text, image, creator, categories, attachments, created_at } }
    async getPostById(id) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.get(`/api/posts/${id}`)
        if (res.data.result) {
          this.post = res.data.data
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── DEL   /api/posts/:id ── Delete post ────────────
    // response: { result, code, message, data: null }
    async deletePost(id) {
      this.loading = true
      this.error   = null
      try {
        const res = await axios.delete(`/api/posts/${id}`)
        if (res.data.result) {
          this.posts = this.posts.filter(p => p.id !== id)
          if (this.post?.id === id) this.post = null
        }
        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    // ── Helpers ────────────────────────────────────────
    clearPost()  { this.post  = null; this.error = null },
    clearPosts() { this.posts = [];   this.error = null },
  },
})