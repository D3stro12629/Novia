<template>
  <DashboardLayout>
    <div class="help-page pb-5">

      <!-- Hero Search -->
      <div class="bg-dark text-white text-center py-5 px-3">
        <div class="container py-4">
          <h1 class="fw-bold display-5 mb-2">How can we help you?</h1>
          <p class="text-secondary mb-4 small">
            Search our knowledge base or browse categories below
          </p>
          <div
            class="input-group input-group-lg mx-auto shadow-sm rounded-pill overflow-hidden bg-white"
            style="max-width: 520px;"
          >
            <span class="input-group-text bg-white border-0 ps-4">
              <svg class="text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              class="form-control border-0 shadow-none py-3 text-dark"
              placeholder="Search for answers..."
            />
          </div>
        </div>
      </div>

      <!-- Category Cards -->
      <div class="border-top border-bottom mb-5 bg-white">
        <div class="container-fluid p-0">
          <div class="row g-0">
            <div
              v-for="(cat, i) in filteredCategories"
              :key="i"
              class="col-md-4 p-5 text-center category-card"
              :class="{ 'border-start': i > 0 }"
              style="cursor: pointer;"
              @click="activeCategory = activeCategory === i ? null : i"
            >
              <div
                class="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                :style="{ backgroundColor: cat.color, width: '64px', height: '64px' }"
              >
                <span v-html="cat.icon"></span>
              </div>
              <h3 class="fw-bold h6 mb-2 text-dark">{{ cat.title }}</h3>
              <p class="text-muted small mb-0 px-xl-4">{{ cat.desc }}</p>
            </div>

            <!-- Empty search state -->
            <div v-if="filteredCategories.length === 0" class="col-12 text-center py-5 text-muted">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mb-3 opacity-50">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p class="mb-0">No results for "<strong>{{ searchQuery }}</strong>"</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="container mb-5">
        <div class="text-center mb-5">
          <h2 class="fw-bold h3 mb-1 text-dark">Frequently Asked Questions</h2>
          <p class="text-muted small">Quick answers to common questions</p>
        </div>

        <div class="row g-3">
          <!-- Left FAQs -->
          <div class="col-md-6">
            <div class="d-flex flex-column gap-2">
              <div
                v-for="(item, i) in filteredLeftFaqs"
                :key="'l-' + i"
                class="border rounded-3 overflow-hidden shadow-sm bg-white"
              >
                <button
                  class="w-100 text-start fw-semibold text-dark py-3 px-4 d-flex justify-content-between align-items-center faq-btn"
                  @click="toggleFaq('l', i)"
                >
                  <span>{{ item.question }}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    class="faq-chevron flex-shrink-0 ms-2"
                    :class="{ 'rotated': openFaq === 'l-' + i }"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <Transition name="faq-slide">
                  <div v-if="openFaq === 'l-' + i" class="px-4 pb-3 text-secondary small">
                    {{ item.answer }}
                  </div>
                </Transition>
              </div>
            </div>
          </div>

          <!-- Right FAQs -->
          <div class="col-md-6">
            <div class="d-flex flex-column gap-2">
              <div
                v-for="(item, i) in filteredRightFaqs"
                :key="'r-' + i"
                class="border rounded-3 overflow-hidden shadow-sm bg-white"
              >
                <button
                  class="w-100 text-start fw-semibold text-dark py-3 px-4 d-flex justify-content-between align-items-center faq-btn"
                  @click="toggleFaq('r', i)"
                >
                  <span>{{ item.question }}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2"
                    class="faq-chevron flex-shrink-0 ms-2"
                    :class="{ 'rotated': openFaq === 'r-' + i }"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <Transition name="faq-slide">
                  <div v-if="openFaq === 'r-' + i" class="px-4 pb-3 text-secondary small">
                    {{ item.answer }}
                  </div>
                </Transition>
              </div>

              <!-- No FAQ results -->
              <div
                v-if="filteredLeftFaqs.length === 0 && filteredRightFaqs.length === 0"
                class="col-12 text-center py-4 text-muted"
              >
                <p class="mb-0">No FAQs match your search.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Footer -->
      <div class="bg-white text-center border-top py-5">
        <div class="container py-2">
          <h2 class="fw-bold h4 mb-2 text-dark">Still have questions?</h2>
          <p class="text-muted small mb-4">Can't find the answer you're looking for? Please seek further assistance.</p>
          <RouterLink
            to="/contact"
            class="btn btn-dark btn-lg px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 rounded-2 shadow-sm border-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            Contact Support
          </RouterLink>
        </div>
      </div>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const searchQuery = ref('')
const openFaq = ref(null)
const activeCategory = ref(null)

function toggleFaq(side, index) {
  const key = `${side}-${index}`
  openFaq.value = openFaq.value === key ? null : key
}

const categories = [
  {
    title: 'Getting Started',
    desc: 'Everything you need to know to get started with Vetika.',
    color: '#3b82f6',
    icon: `<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 2.5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1 14.5V13H7l5-9v5h4l-5 9V17z"/></svg>`,
  },
  {
    title: 'Account & Security',
    desc: 'Manage your profile, password, and security settings.',
    color: '#10b981',
    icon: `<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5zm-1 3v4h2V8h-2zm0 6v2h2v-2h-2z"/></svg>`,
  },
  {
    title: 'Billing & Subscriptions',
    desc: 'Payment methods, invoices, and subscription plans.',
    color: '#f59e0b',
    icon: `<svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`,
  },
]

const leftFaqs = [
  { question: 'How do I reset my password?', answer: "Go to the login page and click 'Forgot password'. Enter your email and follow the instructions sent to your inbox." },
  { question: 'Where can I find my invoices?', answer: 'Invoices are available under Settings → Billing. You can download them as PDF files at any time.' },
  { question: 'How do I delete my account?', answer: 'To delete your account, go to Settings → Account → Danger Zone. Please note this action is permanent and cannot be undone.' },
]

const rightFaqs = [
  { question: 'Can I change my username?', answer: 'Yes, you can change your username at any time from your Profile Settings page.' },
  { question: 'Is my data secure?', answer: 'Absolutely. We use industry-standard encryption for all data at rest and in transit.' },
  { question: 'How do I upgrade my plan?', answer: 'Visit Settings → Billing → Subscription to view available plans and upgrade at any time.' },
]

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) return categories
  const q = searchQuery.value.toLowerCase()
  return categories.filter(c =>
    c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
  )
})

const filteredLeftFaqs = computed(() => {
  if (!searchQuery.value.trim()) return leftFaqs
  const q = searchQuery.value.toLowerCase()
  return leftFaqs.filter(f =>
    f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
  )
})

const filteredRightFaqs = computed(() => {
  if (!searchQuery.value.trim()) return rightFaqs
  const q = searchQuery.value.toLowerCase()
  return rightFaqs.filter(f =>
    f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.help-page {
  background-color: #f8f9fa;
}

/* Hero flush with layout — pulls out of content-wrapper padding */
.bg-dark.py-5 {
  margin: -2rem -2rem 0 -2rem;
}

/* Category cards */
.category-card {
  transition: background-color 0.2s ease;
}
.category-card:hover {
  background-color: #f9fafb;
}

/* FAQ button — clean, no Bootstrap accordion dependency */
.faq-btn {
  background: white;
  border: none;
  outline: none;
  transition: background 0.15s;
  font-size: 0.9rem;
}
.faq-btn:hover {
  background-color: #f9fafb;
}

.faq-chevron {
  transition: transform 0.25s ease;
}
.faq-chevron.rotated {
  transform: rotate(180deg);
}

/* FAQ slide transition */
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.faq-slide-enter-from,
.faq-slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.faq-slide-enter-to,
.faq-slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>