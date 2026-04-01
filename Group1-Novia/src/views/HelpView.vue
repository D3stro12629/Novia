<template>
  <div class="help-page min-vh-100 bg-light pb-5">

    <div class="bg-dark text-white text-center py-5 px-3">
      <div class="container py-4">
        <h1 class="fw-bold display-5 mb-2">How can we help you?</h1>
        <p class="text-secondary mb-4 opacity-75 small">
          Search our knowledge base or browse categories below
        </p>
        <div class="input-group input-group-lg mx-auto shadow-sm rounded-pill overflow-hidden bg-white" style="max-width:520px">
          <span class="input-group-text bg-white border-0 ps-4">
            <svg class="text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control border-0 shadow-none py-3"
            placeholder="Search for answers..."
          />
        </div>
      </div>
    </div>

    <div class="bg-red border-top border-bottom mb-5">
      <div class="container-fluid p-0">
        <div class="row g-0">
          <!-- // Category Cards bg-red border non-->
          <div v-for="(cat, i) in categories" :key="i" 
               class="col-4 p-5 text-center bg-hover-light transition-base" 
               style="cursor:pointer">
            <div class="rounded-3 d-inline-flex align-items-center justify-content-center mb-3  "
                 :style="{ backgroundColor: cat.color, width: '64px', height: '64px' }">
              <span v-html="cat.icon"></span>
            </div>
            <h3 class="fw-bold h6 mb-2 text-dark">{{ cat.title }}</h3>
            <p class="text-muted small mb-0 px-xl-4">{{ cat.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-5">
      <div class="text-center mb-5">
        <h2 class="fw-bold h3 mb-1 text-dark">Frequently Asked Questions</h2>
        <p class="text-muted small">Quick answers to common questions</p>
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <div class="accordion accordion-flush d-flex flex-column gap-2" id="faqLeft">
            <div v-for="(item, i) in leftFaqs" :key="'l-'+i" class="accordion-item border rounded-3 overflow-hidden shadow-sm">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold text-dark py-3 px-4 shadow-none bg-white" 
                        type="button" data-bs-toggle="collapse" :data-bs-target="'#l-content-'+i">
                  {{ item.question }}
                </button>
              </h2>
              <div :id="'l-content-'+i" class="accordion-collapse collapse" data-bs-parent="#faqLeft">
                <div class="accordion-body px-4 pt-0 pb-3 text-secondary small">{{ item.answer }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="accordion accordion-flush d-flex flex-column gap-2" id="faqRight">
            <div v-for="(item, i) in rightFaqs" :key="'r-'+i" class="accordion-item border rounded-3 overflow-hidden shadow-sm">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold text-dark py-3 px-4 shadow-none bg-white" 
                        type="button" data-bs-toggle="collapse" :data-bs-target="'#r-content-'+i">
                  {{ item.question }}
                </button>
              </h2>
              <div :id="'r-content-'+i" class="accordion-collapse collapse" data-bs-parent="#faqRight">
                <div class="accordion-body px-4 pt-0 pb-3 text-secondary small">{{ item.answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white text-center border-top py-5">
      <div class="container py-2">
        <h2 class="fw-bold h4 mb-2 text-dark">Still have questions?</h2>
        <p class="text-muted small mb-4">Can't find the answer you're looking for? Please seek further assistance.</p>
        <RouterLink to="/contact" class="btn btn-dark btn-lg px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 rounded-2 shadow-sm border-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          Contact Support
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const categories = [
  { title: 'Getting Started', desc: 'Everything you need to know to get started with Vetika.', color: '#3b82f6', icon: `<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 2.5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1 14.5V13H7l5-9v5h4l-5 9V17z"/></svg>` },
  { title: 'Account & Security', desc: 'Manage your profile, password, and security settings.', color: '#10b981', icon: `<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5zm-1 3v4h2V8h-2zm0 6v2h2v-2h-2z"/></svg>` },
  { title: 'Billing & Subscriptions', desc: 'Payment methods, invoices, and subscription plans.', color: '#f59e0b', icon: `<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>` }
]

const leftFaqs = [
  { question: 'How do I reset my password?', answer: "Go to the login page and click 'Forgot password'. Enter your email and follow the instructions." },
  { question: 'Where can I find my invoices?', answer: 'Invoices are available under Settings → Billing. You can download them as PDF files.' },
  { question: 'How do I delete my account?', answer: 'To delete your account, go to Settings → Account → Danger Zone. This is permanent.' }
]

const rightFaqs = [
  { question: 'Can I change my username?', answer: 'Yes, you can change your username at any time from your Profile Settings.' },
  { question: 'Is my data secure?', answer: 'Absolutely. We use industry-standard encryption for data at rest and in transit.' }
]
</script>

<style scoped>
/* Essential overrides that Bootstrap utilities don't cover */
.accordion-button:not(.collapsed) { background-color: #fff !important; color: #111 !important; box-shadow: none !important; }
.bg-hover-light:hover { background-color: #f9fafb !important; }
.transition-base { transition: all 0.2s ease-in-out; }
</style>