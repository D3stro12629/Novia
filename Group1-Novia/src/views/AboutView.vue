<template>
  <DashboardLayout>
    <div class="about-page">
      <!-- Fixed BG decorations (light-themed) -->
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="grid-overlay"></div>

      <!-- Main Container -->
      <div class="about-container">
        <!-- ── HERO ── -->
        <section id="hero" class="hero-section">
          <div class="hero-inner">
            <div class="hero-grid">
              <!-- Left -->
              <div class="hero-content">
                <span class="badge-tag mb-3 d-inline-block">About NOVIA</span>
                <h1 class="display-heading hero-title mb-4">
                  Revolutionizing<br />
                  <span class="gradient-text">Website</span><br />
                  Communication
                </h1>
                <p class="hero-description">
                  We're reimagining how humans connect through digital surfaces—turning every touchpoint
                  into a moment of genuine understanding.
                </p>
                <div class="hero-stats">
                  <div class="stat-item">
                    <span class="stat-number">12M+</span>
                    <span class="stat-label">Messages Sent</span>
                  </div>
                  <div class="stat-divider"></div>
                  <div class="stat-item">
                    <span class="stat-number">98%</span>
                    <span class="stat-label">Satisfaction</span>
                  </div>
                  <div class="stat-divider"></div>
                  <div class="stat-item">
                    <span class="stat-number">140+</span>
                    <span class="stat-label">Countries</span>
                  </div>
                </div>
              </div>

              <!-- Right: Chat Mockup -->
              <div class="hero-mockup">
                <div class="chat-mockup">
                  <div class="chat-header">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                    <span class="chat-header-label">NOVIA Live</span>
                  </div>
                  <div class="chat-body">
                    <div class="message received">
                      <div class="msg-avatar">A</div>
                      <div class="msg-bubble">Hey! How can we help? 👋</div>
                    </div>
                    <div class="message sent">
                      <div class="msg-bubble msg-bubble-out">I need support with my account</div>
                    </div>
                    <div class="message received">
                      <div class="msg-avatar">A</div>
                      <div class="msg-bubble">Of course! Let me pull that up...</div>
                    </div>
                    <div class="typing-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── MISSION ── -->
        <section id="future" class="mission-section">
          <div class="section-container">
            <span class="badge-tag mb-3 d-inline-block">Our Mission</span>
            <h2 class="display-heading future-title mb-5">
              Building the Future<br />of <em class="gradient-text-em fst-italic">Communication</em>
            </h2>
            <div class="mission-grid">
              <div class="mission-text">
                <p class="mission-description">
                  At NOVIA, we believe that every conversation is an opportunity—to help, to connect,
                  to grow. We're building infrastructure that makes those moments effortless, human, and scalable.
                </p>
                <p class="mission-description mb-0">
                  From solo founders to enterprise teams, our platform adapts to every context,
                  bringing clarity and warmth to digital communication.
                </p>
              </div>
              <div class="mission-pillars">
                <div v-for="pillar in pillars" :key="pillar.title" class="pillar-card">
                  <div class="pillar-icon">{{ pillar.icon }}</div>
                  <h6 class="pillar-title">{{ pillar.title }}</h6>
                  <p class="pillar-desc">{{ pillar.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── INNOVATION ── -->
        <section id="innovation" class="innovation-section">
          <div class="section-container">
            <div class="innovation-grid">
              <div class="innovation-content">
                <span class="badge-tag mb-3 d-inline-block">Under the Hood</span>
                <h2 class="display-heading innovation-title mb-4">
                  Built on<br />Cutting-Edge<br /><span class="gradient-text">Innovation</span>
                </h2>
                <p class="innovation-description">
                  Our architecture combines the latest in distributed systems, machine learning, and
                  real-time computing to deliver an experience that feels like magic—grounded in rigorous engineering.
                </p>
                <div class="tech-list">
                  <div v-for="item in techItems" :key="item" class="tech-item">
                    <span class="tech-dot"></span>{{ item }}
                  </div>
                </div>
              </div>
              <div class="innovation-diagram">
                <div class="diagram-wrap">
                  <div class="diagram-center">
                    <span class="fw-bold font-display">NOVIA</span>
                    <span class="diagram-sub">Core</span>
                  </div>
                  <div class="ring ring-1">
                    <div class="rnode" style="--a:0deg; --r:110px">AI</div>
                    <div class="rnode" style="--a:90deg; --r:110px">Edge</div>
                    <div class="rnode" style="--a:180deg; --r:110px">API</div>
                    <div class="rnode" style="--a:270deg; --r:110px">SDK</div>
                  </div>
                  <div class="ring ring-2">
                    <div class="rnode rnode-sm" style="--a:45deg; --r:165px">ML</div>
                    <div class="rnode rnode-sm" style="--a:135deg; --r:165px">DB</div>
                    <div class="rnode rnode-sm" style="--a:225deg; --r:165px">CDN</div>
                    <div class="rnode rnode-sm" style="--a:315deg; --r:165px">Auth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── TEAM ── -->
        <section id="team" class="team-section">
          <div class="section-container">
            <span class="badge-tag mb-3 d-inline-block">The Humans</span>
            <h2 class="display-heading mb-2">Meet the People<br />Behind NOVIA</h2>
            <p class="team-subtitle">Passionate individuals dedicated to building the future of communication platforms.</p>
            <div class="team-grid">
              <div v-for="(member, index) in team" :key="member.initials" class="team-card">
                <div class="team-avatar-wrap">
                  <img v-if="member.photo" :src="member.photo" class="team-avatar-img" :alt="member.name" />
                  <div v-else class="team-avatar-placeholder" :style="{ background: member.gradient }">
                    <span class="team-avatar-initials">{{ member.initials }}</span>
                  </div>
                  <input :id="'up-' + index" type="file" accept="image/*" class="d-none" @change="onPhotoChange($event, index)" />
                </div>
                <h5 class="team-name">{{ member.name }}</h5>
                <p class="team-bio">{{ member.bio }}</p>
                <a href="#" class="team-school-link">{{ member.school }}</a>
                <div class="team-social">
                  <a :href="member.facebook" class="team-social-icon" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a :href="member.telegram" class="team-social-icon" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.586c-1.178.47-1.172 1.124-.215 1.416l4.231 1.32 1.64 5.028c.21.642.413.896.847.896.34 0 .494-.155.69-.342l2.053-1.998 4.267 3.147c.786.434 1.354.21 1.548-.728l2.804-13.22c.271-1.083-.413-1.577-1.343-1.32z" />
                    </svg>
                  </a>
                  <a :href="member.instagram" class="team-social-icon" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── CTA ── -->
        <section id="cta" class="cta-section">
          <div class="cta-glow"></div>
          <div class="section-container text-center">
            <h2 class="display-heading cta-title mb-5">
              Ready to transform<br />how you communicate?
            </h2>
            <div class="cta-buttons">
              <button class="btn-vetika-primary">Get Started Free</button>
              <button class="btn-vetika-outline">Talk to Sales →</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const pillars = [
  { icon: '◈', title: 'Real-time', desc: 'Zero-latency messaging powered by distributed infrastructure' },
  { icon: '◉', title: 'Intelligent', desc: 'AI-assisted responses that understand context and intent' },
  { icon: '◎', title: 'Human', desc: 'Tools that amplify people, never replacing the human touch' },
]

const techItems = ['WebSocket Mesh', 'Edge Functions', 'Embedded ML', 'Post-Quantum Crypto']

const team = ref([
  {
    initials: 'AC', name: 'Aria Chen', role: 'Co-founder & CEO',
    gradient: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
    bio: 'I am a co-founder of NOVIA, passionate about building tools that help people communicate better online.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
  {
    initials: 'MO', name: 'Marcus Osei', role: 'Co-founder & CTO',
    gradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    bio: 'I am a distributed systems engineer focused on real-time infrastructure and scalable communication platforms.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
  {
    initials: 'LN', name: 'Leila Nazari', role: 'Head of Design',
    gradient: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
    bio: 'I design products used by millions of people and believe every pixel should earn its place.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
  {
    initials: 'JP', name: 'James Park', role: 'Head of AI',
    gradient: 'linear-gradient(135deg,#6d28d9,#4c1d95)',
    bio: 'I hold a PhD in NLP and turn cutting-edge research into products that actually work in the real world.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
])

// Utility functions (removed TypeScript type annotations)
const formatFullDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getAge = (dob) => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const onPhotoChange = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      team.value[index].photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
/* ── CSS VARIABLES (Light Theme) ── */
.about-page {
  --clr-bg: #faf9ff;
  --clr-surface: #ffffff;
  --clr-border: #e9e3ff;
  --clr-primary: #6d28d9;
  --clr-accent: #7c3aed;
  --clr-text: #1e1b4b;
  --clr-muted: #6b7280;
  --ff-display: 'Syne', sans-serif;
  --ff-body: 'DM Sans', sans-serif;

  font-family: var(--ff-body);
  background: var(--clr-bg);
  color: var(--clr-text);
  overflow-x: hidden;
  min-height: 100vh;
}

/* ── MAIN CONTAINER ── */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 1.5rem;
  }
}

/* ── FIXED BG (Light themed) ── */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

.bg-orb-1 {
  width: 600px;
  height: 600px;
  background: #7c3aed;
  top: -180px;
  left: -120px;
  animation: drift 14s ease-in-out infinite alternate;
}

.bg-orb-2 {
  width: 500px;
  height: 500px;
  background: #a78bfa;
  bottom: 0;
  right: -150px;
  animation: drift 18s ease-in-out infinite alternate-reverse;
}

@keyframes drift {
  from { transform: translate(0, 0); }
  to { transform: translate(60px, 40px); }
}

.grid-overlay {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: 
    linear-gradient(rgba(109, 40, 217, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(109, 40, 217, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── TYPOGRAPHY ── */
.display-heading {
  font-family: var(--ff-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.hero-title {
  font-size: clamp(3rem, 5vw, 5.5rem);
}

.future-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.innovation-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
}

.cta-title {
  font-size: clamp(2rem, 5vw, 4rem);
}

.gradient-text {
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-em {
  background: linear-gradient(135deg, var(--clr-accent), #5b21b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── BADGE TAG ── */
.badge-tag {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--clr-primary);
  background: #ede9fe;
  border: 1px solid #ddd6fe;
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
}

/* ── HERO SECTION ── */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0 4rem;
}

.hero-inner {
  width: 100%;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.hero-description {
  color: var(--clr-muted);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: left;
}

.stat-number {
  display: block;
  font-weight: 700;
  font-size: 2rem;
  font-family: var(--ff-display);
  color: var(--clr-text);
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--clr-muted);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--clr-border);
}

@media (max-width: 576px) {
  .stat-divider {
    display: none;
  }
}

/* ── CHAT MOCKUP (Light) ── */
.chat-mockup {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--clr-border);
  box-shadow: 0 20px 40px rgba(109, 40, 217, 0.08);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--clr-border);
  background: #faf9ff;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot-red { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #28c841; }

.chat-header-label {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--clr-muted);
  font-family: var(--ff-display);
  font-weight: 600;
}

.chat-body {
  padding: 1.5rem;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.message.sent {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.msg-bubble {
  background: #f5f3ff;
  border: 1px solid var(--clr-border);
  border-radius: 18px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--clr-text);
  max-width: 80%;
}

.msg-bubble-out {
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  border-color: transparent;
  color: white;
}

.typing-dots {
  display: flex;
  gap: 4px;
  padding: 0.5rem 1rem;
  background: #f5f3ff;
  border: 1px solid var(--clr-border);
  border-radius: 18px;
  width: fit-content;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--clr-muted);
  animation: blink 1.4s infinite;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}

/* ── MISSION SECTION ── */
.mission-section,
.innovation-section,
.team-section {
  padding: 6rem 0;
  border-top: 1px solid var(--clr-border);
}

.section-container {
  width: 100%;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 992px) {
  .mission-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.mission-description {
  color: var(--clr-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.mission-pillars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pillar-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(109, 40, 217, 0.04);
}

.pillar-card:hover {
  border-color: var(--clr-accent);
  background: #faf9ff;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(109, 40, 217, 0.08);
}

.pillar-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--clr-accent);
}

.pillar-title {
  font-weight: 700;
  font-family: var(--ff-display);
  margin-bottom: 0.25rem;
  color: var(--clr-text);
}

.pillar-desc {
  font-size: 0.875rem;
  color: var(--clr-muted);
  margin: 0;
}

/* ── INNOVATION SECTION ── */
.innovation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 992px) {
  .innovation-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.innovation-description {
  color: var(--clr-muted);
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--clr-muted);
}

.tech-dot {
  width: 6px;
  height: 6px;
  background: var(--clr-accent);
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── ORBITAL DIAGRAM (Light) ── */
.diagram-wrap {
  position: relative;
  width: 360px;
  height: 360px;
  margin: 0 auto;
}

@media (max-width: 576px) {
  .diagram-wrap {
    transform: scale(0.8);
  }
}

.diagram-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--ff-display);
  font-size: 1rem;
  color: #fff;
  box-shadow: 0 0 40px rgba(109, 40, 217, 0.3);
  z-index: 2;
}

.diagram-sub {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  opacity: 0.75;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(109, 40, 217, 0.15);
}

.ring-1 {
  width: 220px;
  height: 220px;
  margin: -110px;
  animation: spin 20s linear infinite;
}

.ring-2 {
  width: 330px;
  height: 330px;
  margin: -165px;
  animation: spin 30s linear infinite reverse;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.rnode {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  margin: -22px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #ddd6fe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-family: var(--ff-display);
  font-weight: 700;
  color: var(--clr-accent);
  transform: rotate(var(--a)) translate(0, calc(-1 * var(--r))) rotate(calc(-1 * var(--a)));
  box-shadow: 0 4px 12px rgba(109, 40, 217, 0.06);
}

.rnode-sm {
  width: 36px;
  height: 36px;
  margin: -18px;
  font-size: 0.62rem;
  opacity: 0.85;
}

/* ── TEAM SECTION (Light) ── */
.team-subtitle {
  color: var(--clr-muted);
  font-weight: 400;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 992px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

.team-card {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(109, 40, 217, 0.04);
}

.team-card:hover {
  transform: translateY(-6px);
  border-color: #ddd6fe;
  box-shadow: 0 16px 32px rgba(109, 40, 217, 0.08);
}

.team-avatar-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ddd6fe;
}

.team-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-avatar-initials {
  font-weight: 700;
  font-family: var(--ff-display);
  font-size: 1.8rem;
  color: white;
}

.team-name {
  font-weight: 700;
  font-family: var(--ff-display);
  margin-bottom: 0.5rem;
  color: var(--clr-text);
}

.team-bio {
  font-size: 0.875rem;
  color: var(--clr-muted);
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.team-school-link {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--clr-accent);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1rem;
}

.team-school-link:hover {
  opacity: 0.75;
  text-decoration: underline;
}

.team-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.team-social-icon {
  color: var(--clr-text);
  opacity: 0.5;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.team-social-icon:hover {
  opacity: 1;
  color: var(--clr-accent);
}

/* ── CTA SECTION (Light) ── */
.cta-section {
  padding: 6rem 0;
  border-top: 1px solid var(--clr-border);
  position: relative;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(109, 40, 217, 0.08), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── BUTTONS (Light theme) ── */
.btn-vetika-primary {
  padding: 0.85rem 2.25rem;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  border: none;
  border-radius: 100px;
  color: #fff;
  font-family: var(--ff-display);
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 8px 30px rgba(109, 40, 217, 0.25);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-vetika-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(109, 40, 217, 0.35);
}

.btn-vetika-outline {
  padding: 0.85rem 2rem;
  background: transparent;
  border: 1px solid var(--clr-border);
  border-radius: 100px;
  color: var(--clr-text);
  font-family: var(--ff-display);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-vetika-outline:hover {
  border-color: var(--clr-accent);
  background: #f5f3ff;
  color: var(--clr-accent);
}

/* Utility */
.font-display {
  font-family: var(--ff-display) !important;
}

.d-inline-block {
  display: inline-block;
}

.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }
.mt-auto { margin-top: auto; }

.text-center { text-align: center; }

.fst-italic { font-style: italic; }
.fw-bold { font-weight: 700; }

.d-none { display: none; }
</style>