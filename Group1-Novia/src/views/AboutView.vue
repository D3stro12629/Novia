<template>
  <div>
    <h1>About</h1>
    <p>This is the about page.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
