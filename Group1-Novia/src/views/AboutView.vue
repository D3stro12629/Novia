<template>
  <DashboardLayout>
    <div class="about-page">
      <!-- Fixed BG decorations -->
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="grid-overlay"></div>
  
      <!-- ── HERO ── -->
      <section id="hero" class="min-vh-100 d-flex align-items-center position-relative z-1 pt-hero">
        <div class="container py-5">
          <div class="row align-items-center g-5">
  
            <!-- Left -->
            <div class="col-lg-6">
              <span class="badge-tag mb-3 d-inline-block">About Vetika</span>
              <h1 class="display-heading hero-title mb-4">
                Revolutionizing<br />
                <span class="gradient-text">Website</span><br />
                Communication
              </h1>
              <p class="text-white-50 fs-5 fw-light lh-lg mb-5">
                We're reimagining how humans connect through digital surfaces—turning every touchpoint
                into a moment of genuine understanding.
              </p>
              <div class="d-flex align-items-center gap-4 flex-wrap">
                <div>
                  <span class="d-block fw-bold fs-2 font-display">12M+</span>
                  <span class="text-white-25 small text-uppercase ls-wide">Messages Sent</span>
                </div>
                <div class="vr opacity-25 d-none d-sm-block" style="height:40px"></div>
                <div>
                  <span class="d-block fw-bold fs-2 font-display">98%</span>
                  <span class="text-white-25 small text-uppercase ls-wide">Satisfaction</span>
                </div>
                <div class="vr opacity-25 d-none d-sm-block" style="height:40px"></div>
                <div>
                  <span class="d-block fw-bold fs-2 font-display">140+</span>
                  <span class="text-white-25 small text-uppercase ls-wide">Countries</span>
                </div>
              </div>
            </div>
  
            <!-- Right: Chat Mockup -->
            <div class="col-lg-6">
              <div class="chat-mockup rounded-4 overflow-hidden border border-subtle shadow-lg">
                <div class="d-flex align-items-center gap-2 px-3 py-3 border-bottom border-subtle bg-white bg-opacity-10">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                  <span class="ms-auto small text-white-50 font-display fw-semibold">Vetika Live</span>
                </div>
                <div class="p-4">
                  <div class="d-flex align-items-end gap-2 mb-3">
                    <div class="msg-avatar rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">A</div>
                    <div class="msg-bubble rounded-4 px-3 py-2 small">Hey! How can we help? 👋</div>
                  </div>
                  <div class="d-flex flex-row-reverse align-items-end gap-2 mb-3">
                    <div class="msg-bubble msg-bubble-out rounded-4 px-3 py-2 small text-white">I need support with my account</div>
                  </div>
                  <div class="d-flex align-items-end gap-2 mb-3">
                    <div class="msg-avatar rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">A</div>
                    <div class="msg-bubble rounded-4 px-3 py-2 small">Of course! Let me pull that up...</div>
                  </div>
                  <div class="typing-dots d-flex gap-1 px-3 py-2 rounded-4 border border-subtle" style="width:fit-content">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
  
      <!-- ── MISSION ── -->
      <section id="future" class="py-section border-top border-subtle position-relative z-1">
        <div class="container py-5">
          <span class="badge-tag mb-3 d-inline-block">Our Mission</span>
          <h2 class="display-heading future-title mb-5">
            Building the Future<br />of <em class="gradient-text-em fst-italic">Communication</em>
          </h2>
          <div class="row g-5 align-items-start">
            <div class="col-lg-5">
              <p class="text-white-50 lh-lg mb-4">
                At Vetika, we believe that every conversation is an opportunity—to help, to connect,
                to grow. We're building infrastructure that makes those moments effortless, human, and scalable.
              </p>
              <p class="text-white-50 lh-lg mb-0">
                From solo founders to enterprise teams, our platform adapts to every context,
                bringing clarity and warmth to digital communication.
              </p>
            </div>
            <div class="col-lg-7">
              <div class="d-flex flex-column gap-3">
                <div v-for="pillar in pillars" :key="pillar.title"
                     class="pillar-card p-3 rounded-3 border border-subtle">
                  <div class="fs-4 mb-1 accent-text">{{ pillar.icon }}</div>
                  <h6 class="fw-bold font-display mb-1">{{ pillar.title }}</h6>
                  <p class="mb-0 small text-white-50">{{ pillar.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- ── INNOVATION ── -->
      <section id="innovation" class="py-section border-top border-subtle position-relative z-1">
        <div class="container py-5">
          <div class="row align-items-center g-5">
            <div class="col-lg-6">
              <span class="badge-tag mb-3 d-inline-block">Under the Hood</span>
              <h2 class="display-heading innovation-title mb-4">
                Built on<br />Cutting-Edge<br /><span class="gradient-text">Innovation</span>
              </h2>
              <p class="text-white-50 fw-light lh-lg mb-4">
                Our architecture combines the latest in distributed systems, machine learning, and
                real-time computing to deliver an experience that feels like magic—grounded in rigorous engineering.
              </p>
              <div class="d-flex flex-column gap-3 mt-3">
                <div v-for="item in techItems" :key="item" class="d-flex align-items-center gap-3 small text-white-50">
                  <span class="tech-dot flex-shrink-0 rounded-circle"></span>{{ item }}
                </div>
              </div>
            </div>
            <div class="col-lg-6 d-none d-lg-flex justify-content-center">
              <div class="diagram-wrap">
                <div class="diagram-center rounded-circle d-flex flex-column align-items-center justify-content-center position-absolute">
                  <span class="fw-bold font-display">Vetika</span>
                  <span class="diagram-sub opacity-75">Core</span>
                </div>
                <div class="ring ring-1">
                  <div class="rnode" style="--a:0deg;   --r:110px">AI</div>
                  <div class="rnode" style="--a:90deg;  --r:110px">Edge</div>
                  <div class="rnode" style="--a:180deg; --r:110px">API</div>
                  <div class="rnode" style="--a:270deg; --r:110px">SDK</div>
                </div>
                <div class="ring ring-2">
                  <div class="rnode rnode-sm" style="--a:45deg;  --r:165px">ML</div>
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
      <section id="team" class="py-section border-top border-subtle position-relative z-1">
        <div class="container py-5">
          <span class="badge-tag mb-3 d-inline-block">The Humans</span>
          <h2 class="display-heading mb-2">Meet the People<br />Behind Vetika</h2>
          <p class="text-white-50 fw-light mb-5">Passionate individuals dedicated to building the future of communication platforms.</p>
          <div class="row g-4 justify-content-center">
            <div v-for="(member, index) in team" :key="member.initials" class="col-12 col-sm-6 col-lg-3">
              <div class="team-card d-flex flex-column align-items-center text-center p-4 rounded-4 border border-subtle h-100">
                <div class="team-circle-wrap mb-4">
                  <img v-if="member.photo" :src="member.photo" class="team-circle-img" :alt="member.name" />
                  <div v-else class="team-circle-placeholder d-flex align-items-center justify-content-center"
                       :style="{ background: member.gradient }">
                    <span class="fw-bold font-display text-white" style="font-size:1.8rem">{{ member.initials }}</span>
                  </div>
                  <!-- <label :for="'up-' + index" class="team-circle-upload d-flex flex-column align-items-center justify-content-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span style="font-size:.65rem;margin-top:.25rem">Upload</span>
                  </label> -->
                  <input :id="'up-' + index" type="file" accept="image/*" class="d-none" @change="onPhotoChange($event, index)" />
                </div>
                <h5 class="fw-bold font-display text-white mb-2">{{ member.name }}</h5>
                <p class="small text-white-50 fw-light lh-lg mb-3">{{ member.bio }}</p>
                <a href="#" class="team-school-link small fw-bold mb-4">{{ member.school }}</a>
                <div class="d-flex align-items-center justify-content-center gap-3 mt-auto">
                  <a :href="member.facebook" class="team-social-icon" target="_blank">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a :href="member.telegram" class="team-social-icon" target="_blank">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.586c-1.178.47-1.172 1.124-.215 1.416l4.231 1.32 1.64 5.028c.21.642.413.896.847.896.34 0 .494-.155.69-.342l2.053-1.998 4.267 3.147c.786.434 1.354.21 1.548-.728l2.804-13.22c.271-1.083-.413-1.577-1.343-1.32z"/>
                    </svg>
                  </a>
                  <a :href="member.instagram" class="team-social-icon" target="_blank">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- ── CTA ── -->
      <section id="cta" class="py-section border-top border-subtle text-center position-relative z-1 overflow-hidden">
        <div class="cta-glow"></div>
        <div class="container py-5 position-relative" style="z-index:1">
          <h2 class="display-heading cta-title mb-5">
            Ready to transform<br />how you communicate?
          </h2>
          <div class="d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <button class="btn-vetika-primary">Get Started Free</button>
            <button class="btn-vetika-outline">Talk to Sales →</button>
          </div>
        </div>
      </section>
  
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const pillars = [
  { icon: '◈', title: 'Real-time',   desc: 'Zero-latency messaging powered by distributed infrastructure' },
  { icon: '◉', title: 'Intelligent', desc: 'AI-assisted responses that understand context and intent' },
  { icon: '◎', title: 'Human',       desc: 'Tools that amplify people, never replacing the human touch' },
]

const techItems = [
  'WebSocket mesh network',
  'Fine-tuned LLMs on domain-specific data',
  'Edge-first global delivery (< 50ms worldwide)',
  'GDPR & CCPA compliant by design',
]

const team = ref([
  {
    initials: 'AC', name: 'Aria Chen', role: 'Co-founder & CEO',
    gradient: 'linear-gradient(135deg,#4040d0,#2a2aaa)',
    bio: 'I am a co-founder of Vetika, passionate about building tools that help people communicate better online.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
  {
    initials: 'MO', name: 'Marcus Osei', role: 'Co-founder & CTO',
    gradient: 'linear-gradient(135deg,#1a8fff,#0066cc)',
    bio: 'I am a distributed systems engineer focused on real-time infrastructure and scalable communication platforms.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
  {
    initials: 'LN', name: 'Leila Nazari', role: 'Head of Design',
    gradient: 'linear-gradient(135deg,#2255cc,#1a8fff)',
    bio: 'I design products used by millions of people and believe every pixel should earn its place.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
  {
    initials: 'JP', name: 'James Park', role: 'Head of AI',
    gradient: 'linear-gradient(135deg,#0a0a30,#4040d0)',
    bio: 'I hold a PhD in NLP and turn cutting-edge research into products that actually work in the real world.',
    school: 'ANT Technology Training Center',
    photo: null, facebook: '#', telegram: '#', instagram: '#'
  },
])

function onPhotoChange(event, index) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => { team.value[index].photo = e.target.result }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
/* ── CSS VARIABLES ── */
.about-page {
  --clr-bg:      #000000;
  --clr-surface: rgba(255,255,255,0.04);
  --clr-border:  rgba(255,255,255,0.08);
  --clr-primary: #4040d0;
  --clr-accent:  #1a8fff;
  --clr-text:    #ffffff;
  --clr-muted:   rgba(255,255,255,0.5);
  --ff-display:  'Syne', sans-serif;
  --ff-body:     'DM Sans', sans-serif;

  font-family: var(--ff-body);
  background: var(--clr-bg);
  color: var(--clr-text);
  overflow-x: hidden;
  min-height: 100vh;
}

/* ── BOOTSTRAP OVERRIDES / HELPERS ── */
.border-subtle   { border-color: var(--clr-border) !important; }
.text-white-25   { color: rgba(255,255,255,.25) !important; }
.text-white-50   { color: rgba(255,255,255,.5)  !important; }
.font-display    { font-family: var(--ff-display) !important; }
.accent-text     { color: var(--clr-accent); }
.ls-wide         { letter-spacing: .05em; }
.x-small         { font-size: .72rem; }
.bg-subtle       { background: rgba(255,255,255,.01) !important; }
.py-section      { padding-top: 7rem; padding-bottom: 7rem; }
.pt-hero         { padding-top: 9rem; }
.backdrop-blur   { backdrop-filter: blur(20px); background: rgba(0,0,0,.8) !important; }

/* ── FIXED BG ── */
.bg-orb {
  position: fixed; border-radius: 50%;
  filter: blur(100px); opacity: .16;
  pointer-events: none; z-index: 0;
}
.bg-orb-1 { width:600px; height:600px; background:#4040d0; top:-180px; left:-120px; animation:drift 14s ease-in-out infinite alternate; }
.bg-orb-2 { width:500px; height:500px; background:#1a8fff; bottom:0; right:-150px; animation:drift 18s ease-in-out infinite alternate-reverse; }
@keyframes drift { from{transform:translate(0,0)} to{transform:translate(60px,40px)} }

.grid-overlay {
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image: linear-gradient(rgba(64,64,208,.04) 1px,transparent 1px),
                    linear-gradient(90deg,rgba(64,64,208,.04) 1px,transparent 1px);
  background-size: 60px 60px;
}

/* ── TYPOGRAPHY ── */
.display-heading  { font-family:var(--ff-display); font-weight:800; letter-spacing:-.03em; line-height:1.05; }
.hero-title       { font-size: clamp(3rem,5vw,5.5rem); }
.future-title     { font-size: clamp(2.5rem,5vw,4rem); }
.innovation-title { font-size: clamp(2rem,4vw,3.5rem); }
.cta-title        { font-size: clamp(2rem,5vw,4rem); }

.gradient-text {
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-primary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.gradient-text-em {
  background: linear-gradient(135deg, var(--clr-accent), #1a5fff);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* ── BADGE TAG ── */
.badge-tag {
  font-size:.72rem; font-weight:500; letter-spacing:.15em; text-transform:uppercase;
  color: var(--clr-accent);
  background: rgba(26,143,255,.1);
  border: 1px solid rgba(26,143,255,.25);
  padding: .3rem .9rem; border-radius:100px;
}

/* ── CHAT MOCKUP ── */
.chat-mockup { background: rgba(255,255,255,.04); animation: float 6s ease-in-out infinite; }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

.dot { width:10px; height:10px; border-radius:50%; display:inline-block; flex-shrink:0; }
.dot-red    { background:#ff5f57; }
.dot-yellow { background:#ffbd2e; }
.dot-green  { background:#28c841; }

.msg-avatar {
  width:30px; height:30px; flex-shrink:0;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  font-size:.7rem; font-weight:700; color:#fff;
}
.msg-bubble {
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.08);
  color: rgba(255,255,255,.85); max-width:80%;
}
.msg-bubble-out {
  background: linear-gradient(135deg, var(--clr-primary), #5577ff);
  border-color: transparent;
}
.typing-dots span {
  width:6px; height:6px; border-radius:50%; display:inline-block;
  background: var(--clr-muted); animation:blink 1.4s infinite;
}
.typing-dots span:nth-child(2) { animation-delay:.2s; }
.typing-dots span:nth-child(3) { animation-delay:.4s; }
@keyframes blink { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }

/* ── PILLAR CARDS ── */
.pillar-card { background:var(--clr-surface); transition:border-color .3s, background .3s, transform .3s; }
.pillar-card:hover { border-color:rgba(64,64,208,.4) !important; background:rgba(64,64,208,.08); transform:translateY(-4px); }

.speed-bar  { height:4px; background:rgba(255,255,255,.1); border-radius:2px; overflow:hidden; margin:.75rem 0 .25rem; }
.speed-fill {
  height:100%; width:82%;
  background: linear-gradient(90deg, var(--clr-primary), var(--clr-accent));
  border-radius:2px; animation:fillBar 2s ease-in-out infinite alternate;
}
@keyframes fillBar { from{width:70%} to{width:92%} }

/* ── TECH DOTS ── */
.tech-dot { width:6px; height:6px; background:var(--clr-accent); }

/* ── ORBITAL DIAGRAM ── */
.diagram-wrap { position:relative; width:360px; height:360px; margin:0 auto; }
.diagram-center {
  top:50%; left:50%; transform:translate(-50%,-50%);
  width:100px; height:100px;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  font-family:var(--ff-display); font-size:1rem; color:#fff;
  box-shadow:0 0 40px rgba(64,64,208,.5); z-index:2;
}
.diagram-sub { font-size:.6rem; letter-spacing:.1em; }
.ring { position:absolute; top:50%; left:50%; border-radius:50%; border:1px solid rgba(64,64,208,.2); }
.ring-1 { width:220px; height:220px; margin:-110px; animation:spin 20s linear infinite; }
.ring-2 { width:330px; height:330px; margin:-165px; animation:spin 30s linear infinite reverse; }
@keyframes spin { to{transform:rotate(360deg)} }
.rnode {
  position:absolute; top:50%; left:50%;
  width:44px; height:44px; margin:-22px; border-radius:50%;
  background:rgba(64,64,208,.15); border:1px solid rgba(64,64,208,.35);
  display:flex; align-items:center; justify-content:center;
  font-size:.7rem; font-family:var(--ff-display); font-weight:700; color:var(--clr-accent);
  transform: rotate(var(--a)) translate(0, calc(-1 * var(--r))) rotate(calc(-1 * var(--a)));
}
.rnode-sm { width:36px; height:36px; margin:-18px; font-size:.62rem; opacity:.7; }

/* ── TEAM ── */
.team-card {
  background: var(--clr-surface);
  transition: transform .3s, border-color .3s;
}
.team-card:hover { transform: translateY(-6px); border-color: rgba(26,143,255,.3) !important; }

.team-circle-wrap {
  position: relative;
  width: 130px; height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(26,143,255,.3);
  flex-shrink: 0;
}
.team-circle-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.team-circle-placeholder {
  width: 100%; height: 100%;
}
.team-circle-upload {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.6);
  color: #fff; cursor: pointer;
  opacity: 0; transition: opacity .25s;
}
.team-circle-wrap:hover .team-circle-upload { opacity: 1; }

.team-school-link {
  color: var(--clr-accent);
  text-decoration: none;
  transition: opacity .2s;
}
.team-school-link:hover { opacity: .75; }

.team-social-icon {
  color: var(--clr-text);
  opacity: .6;
  transition: opacity .2s, color .2s;
  text-decoration: none;
}
.team-social-icon:hover { opacity: 1; color: var(--clr-accent); }

/* ── CTA ── */
.cta-glow {
  position:absolute; width:700px; height:700px; border-radius:50%;
  background:radial-gradient(circle, rgba(64,64,208,.2), transparent 70%);
  top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;
}

/* ── BUTTONS ── */
.btn-vetika-primary {
  padding:.85rem 2.25rem;
  background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
  border:none; border-radius:100px;
  color:#fff; font-family:var(--ff-display); font-size:.95rem; font-weight:700;
  box-shadow:0 8px 30px rgba(64,64,208,.4);
  cursor:pointer; transition:transform .2s, box-shadow .2s;
}
.btn-vetika-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(64,64,208,.5); }

.btn-vetika-outline {
  padding:.85rem 2rem;
  background:transparent; border:1px solid rgba(255,255,255,.2); border-radius:100px;
  color:rgba(255,255,255,.5); font-family:var(--ff-display); font-size:.95rem; font-weight:600;
  cursor:pointer; transition:border-color .2s, color .2s;
}
.btn-vetika-outline:hover { border-color:rgba(255,255,255,.5); color:#fff; }
</style>