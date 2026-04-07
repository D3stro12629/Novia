<template>
  <DashboardLayout>
    <div class="contact-page pb-5">

      <!-- Hero Header -->
      <div class="bg-dark text-white text-center py-5 mb-5 px-3">
        <h1 class="display-4 fw-bold">Get in Touch</h1>
        <p class="lead text-secondary mb-0">We'd love to hear from you. Please fill out this form or shoot us an email.</p>
      </div>

      <div class="container">
        <div class="row g-4 justify-content-center">

          <!-- Contact Form -->
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm p-4 p-md-5">
              <h2 class="h4 fw-bold mb-1 text-dark">Send us a Message</h2>
              <div class="bg-dark mb-4" style="width: 40px; height: 3px; border-radius: 2px;"></div>

              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold text-muted text-uppercase">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="form-control form-control-lg bg-light border-0 shadow-none"
                    placeholder="Jane"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold text-muted text-uppercase">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="form-control form-control-lg bg-light border-0 shadow-none"
                    placeholder="Doe"
                  />
                </div>

                <div class="col-12">
                  <label class="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-lg bg-light border-0 shadow-none"
                    placeholder="jane@example.com"
                  />
                </div>

                <div class="col-12">
                  <label class="form-label small fw-bold text-muted text-uppercase">Subject</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    class="form-control form-control-lg bg-light border-0 shadow-none"
                    placeholder="How can we help?"
                  />
                </div>

                <div class="col-12">
                  <label class="form-label small fw-bold text-muted text-uppercase">Message</label>
                  <textarea
                    v-model="form.message"
                    class="form-control bg-light border-0 shadow-none"
                    rows="5"
                    placeholder="Tell us more..."
                  ></textarea>
                </div>

                <div class="col-12 text-end mt-2">
                  <button
                    type="button"
                    class="btn btn-dark btn-lg px-4 d-inline-flex align-items-center gap-2 rounded-3 shadow-sm"
                    :disabled="isSubmitting"
                    @click="handleSubmit"
                  >
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm"></span>
                    <span v-else>Send Message</span>
                    <svg v-if="!isSubmitting" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>

                <!-- Success Toast -->
                <div v-if="submitted" class="col-12">
                  <div class="alert alert-success d-flex align-items-center gap-2 mb-0 rounded-3" role="alert">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>Your message has been sent! We'll get back to you soon.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="col-lg-4">
            <div class="d-flex flex-column gap-3">

              <!-- Address -->
              <div class="card border-0 shadow-sm p-3">
                <div class="d-flex align-items-start gap-3">
                  <div class="contact-icon bg-dark text-white rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 42px; height: 42px;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="h6 fw-bold mb-1">Visit Us</h3>
                    <p class="small text-muted mb-0">123 Innovation Drive</p>
                    <p class="small text-muted mb-0">Tech City, TC 90210</p>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="card border-0 shadow-sm p-3">
                <div class="d-flex align-items-start gap-3">
                  <div class="contact-icon bg-dark text-white rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 42px; height: 42px;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="h6 fw-bold mb-1">Email Us</h3>
                    <a href="mailto:hello@vetika.com" class="small text-muted d-block text-decoration-none link-hover">hello@vetika.com</a>
                    <a href="mailto:support@vetika.com" class="small text-muted d-block text-decoration-none link-hover">support@vetika.com</a>
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="card border-0 shadow-sm p-3">
                <div class="d-flex align-items-start gap-3">
                  <div class="contact-icon bg-dark text-white rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 42px; height: 42px;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="h6 fw-bold mb-1">Call Us</h3>
                    <a href="tel:09642071930" class="small text-muted d-block text-decoration-none link-hover">096 4207 193</a>
                    <p class="small text-muted mb-0">Mon–Fri, 8am to 5pm</p>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="card border-0 shadow-sm p-3">
                <h3 class="h6 fw-bold mb-3">Follow Us</h3>
                <div class="d-flex gap-2 flex-wrap">
                  <!-- X / Twitter -->
                  <a href="#" class="social-btn btn border shadow-sm d-flex align-items-center justify-content-center p-0 rounded-3" style="width: 45px; height: 45px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#374151">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <!-- LinkedIn -->
                  <a href="#" class="social-btn btn border shadow-sm d-flex align-items-center justify-content-center p-0 rounded-3" style="width: 45px; height: 45px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#374151">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <!-- Facebook -->
                  <a href="#" class="social-btn btn border shadow-sm d-flex align-items-center justify-content-center p-0 rounded-3" style="width: 45px; height: 45px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#374151">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <!-- Instagram -->
                  <a href="#" class="social-btn btn border shadow-sm d-flex align-items-center justify-content-center p-0 rounded-3" style="width: 45px; height: 45px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#374151">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const isSubmitting = ref(false)
const submitted = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const handleSubmit = async () => {
  if (!form.firstName || !form.email || !form.message) return
  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1200))
  isSubmitting.value = false
  submitted.value = true
  // Reset form
  Object.assign(form, { firstName: '', lastName: '', email: '', subject: '', message: '' })
  // Hide success after 4s
  setTimeout(() => { submitted.value = false }, 4000)
}
</script>

<style scoped>
.contact-page {
  background-color: #f8f9fa;
}

/* Hero sits flush — negative margin pulls it out of content-wrapper padding */
.bg-dark.text-white.py-5 {
  margin: -2rem -2rem 2rem -2rem;
}

.form-control:focus {
  background-color: #ffffff !important;
  border: 1px solid #111111 !important;
  box-shadow: 0 0 0 0.2rem rgba(17, 17, 17, 0.05) !important;
}

.contact-icon {
  transition: transform 0.2s ease;
}
.card:hover .contact-icon {
  transform: scale(1.08);
}

.link-hover:hover {
  color: #111111 !important;
}

.social-btn {
  background: white;
  transition: background 0.2s, border-color 0.2s;
}
.social-btn:hover {
  background-color: #111111 !important;
  border-color: #111111 !important;
}
.social-btn:hover svg {
  fill: #ffffff !important;
}

.card {
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08) !important;
}
</style>