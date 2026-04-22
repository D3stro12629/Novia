<script setup lang="ts">
import { ref } from 'vue'

// Profile data from Figma design
const profileData = ref({
  id: 120,
  full_name: "Senkropum Nhoem",
  dob: "1999-01-01",
  gender: 1,
  current_city: "Phnom Penh",
  home_town: "Kandal",
  phone: "0125566778",
  email: "senkropum1010@gmail.com",
  avatar: "http://novia2.csm.linkpc.net/storage/avatars/59gIELaghwIuvHxHf0ni6vuJgTGmfnXIAxXeH4k5.jpg",
  cover: null,
  cv: "http://novia2.csm.linkpc.net/storage/resumes/AbtgLpNOOuCIShIJrTMTQVVwuV3sk9wroCg6E5xi.pdf",
  portfolio_link: "https://chandalen.dev",
  created_at: "2026-03-05 08:16:50",
  roles: [
    {
      id: 1,
      name: "Normal User"
    }
  ],
  types: [
    {
      id: 1,
      name: "Freelancer"
    },
    {
      id: 2,
      name: "Student"
    }
  ],
  positions: [
    {
      id: 1,
      name: "Frontend"
    },
    {
      id: 2,
      name: "Backend"
    }
  ],
  professional: {
    user_id: 120,
    job_title: "Web Developer",
    company_name: "MPTC",
    responsibility: "This is testing"
  },
  educations: [
    {
      id: 62,
      school: {
        id: 2,
        name: "Royal University of Phnom Penh"
      },
      degree: {
        id: 2,
        name: "Master"
      },
      subject: {
        id: 2,
        name: "Computer Graphic"
      },
      description: "This test",
      start_date: "2023-01",
      end_date: null
    }
  ],
  projects: [
    {
      id: 47,
      title: "DCC",
      link: "https://dcc.gov.kh"
    },
    {
      id: 48,
      title: "DCC",
      link: "https://dcc.gov.kh"
    },
    {
      id: 49,
      title: "DCC",
      link: "https://dcc.gov.kh"
    }
  ],
  collaboration: {
    user_id: 120,
    company_logo: "http://novia2.csm.linkpc.net/storage/collaborations/A970A8aDeHVz7kHHs20G6snGv0apZSqnEeV9KG0d.jpg",
    company_link: "https://chandalen.dev"
  }
})

const defaultCover = ref("https://images.unsplash.com/photo-1765366417030-16d9765d920a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzc2NDA1NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080")

// Helper functions
const formatDate = (dateString: string) => {
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getAge = (dob: string) => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
</script>

<template>
  <DashboardLayout>
    <div class="about-page">
    <!-- Profile Header -->
    <div class="profile-header">
      <!-- Cover Photo -->
      <div class="cover-photo">
        <img :src="profileData.cover || defaultCover" alt="Cover" class="cover-img">
      </div>

      <!-- Profile Content -->
      <div class="container">
        <div class="profile-content">
          <!-- Avatar -->
          <div class="profile-avatar">
            <img :src="profileData.avatar" :alt="profileData.full_name" class="avatar-img">
          </div>

          <!-- Name and Actions -->
          <div class="profile-info">
            <div class="info-section">
              <h1 class="profile-name">{{ profileData.full_name }}</h1>
              <p v-if="profileData.professional" class="profile-title">
                {{ profileData.professional.job_title }} at {{ profileData.professional.company_name }}
              </p>

              <!-- Badges -->
              <div class="badges-section">
                <span v-for="type in profileData.types" :key="type.id" class="badge bg-secondary">
                  {{ type.name }}
                </span>
                <span v-for="position in profileData.positions" :key="position.id" class="badge bg-outline">
                  {{ position.name }}
                </span>
              </div>

              <!-- Quick Info -->
              <div class="quick-info">
                <div class="info-item">
                  <i class="bi bi-geo-alt"></i>
                  <span>{{ profileData.current_city }}</span>
                </div>
                <div class="info-item">
                  <i class="bi bi-envelope"></i>
                  <span>{{ profileData.email }}</span>
                </div>
                <div class="info-item">
                  <i class="bi bi-telephone"></i>
                  <span>{{ profileData.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <a :href="profileData.cv" target="_blank" class="btn btn-outline-primary">
                <i class="bi bi-file-earmark-text"></i>
                Download CV
              </a>
              <a :href="profileData.portfolio_link" target="_blank" class="btn btn-primary">
                <i class="bi bi-box-arrow-up-right"></i>
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container my-5">
      <div class="row">
        <!-- Left Column - Main Content -->
        <div class="col-lg-8">
          <!-- Professional Info -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="bi bi-briefcase"></i>
                Professional Experience
              </h5>
            </div>
            <div class="card-body">
              <div class="professional-item">
                <div class="item-label">
                  <i class="bi bi-briefcase text-muted"></i>
                  <span class="text-muted small">Position</span>
                </div>
                <p class="item-value">{{ profileData.professional.job_title }}</p>
              </div>

              <div class="professional-item">
                <div class="item-label">
                  <i class="bi bi-building text-muted"></i>
                  <span class="text-muted small">Company</span>
                </div>
                <p class="item-value">{{ profileData.professional.company_name }}</p>
              </div>

              <div class="professional-item">
                <p class="text-muted small mb-2">Responsibilities</p>
                <p class="responsibilities">{{ profileData.professional.responsibility }}</p>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="bi bi-mortarboard"></i>
                Education
              </h5>
            </div>
            <div class="card-body">
              <div class="education-timeline">
                <div v-for="edu in profileData.educations" :key="edu.id" class="education-item">
                  <div class="timeline-marker"></div>
                  <div class="education-content">
                    <h6 class="education-school">{{ edu.school.name }}</h6>
                    <div class="education-badges">
                      <span class="badge bg-primary">{{ edu.degree.name }}</span>
                      <span class="badge bg-outline">{{ edu.subject.name }}</span>
                    </div>
                    <div class="education-date">
                      <i class="bi bi-calendar-event"></i>
                      <span>{{ formatDate(edu.start_date) }} - {{ edu.end_date ? formatDate(edu.end_date) : 'Present' }}</span>
                    </div>
                    <p v-if="edu.description" class="education-description">{{ edu.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="bi bi-folder"></i>
                Projects
              </h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div v-for="project in profileData.projects" :key="project.id" class="col-md-6 mb-3">
                  <div class="project-card">
                    <div class="project-header">
                      <h6 class="project-title">{{ project.title }}</h6>
                      <a :href="project.link" target="_blank" class="btn btn-sm btn-outline-primary">
                        <i class="bi bi-box-arrow-up-right"></i>
                      </a>
                    </div>
                    <p class="project-link text-break">{{ project.link }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="col-lg-4">
          <!-- Personal Info -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="bi bi-person"></i>
                Personal Information
              </h5>
            </div>
            <div class="card-body">
              <div class="personal-item">
                <div class="item-icon">
                  <i class="bi bi-calendar-event text-muted"></i>
                </div>
                <div class="item-content">
                  <p class="item-label text-muted small">Date of Birth</p>
                  <p class="item-value">{{ formatFullDate(profileData.dob) }} ({{ getAge(profileData.dob) }} years old)</p>
                </div>
              </div>

              <div class="personal-item">
                <div class="item-icon">
                  <i class="bi bi-gender-ambiguous text-muted"></i>
                </div>
                <div class="item-content">
                  <p class="item-label text-muted small">Gender</p>
                  <p class="item-value">{{ profileData.gender === 1 ? 'Male' : 'Female' }}</p>
                </div>
              </div>

              <div class="personal-item">
                <div class="item-icon">
                  <i class="bi bi-geo-alt text-muted"></i>
                </div>
                <div class="item-content">
                  <p class="item-label text-muted small">Current City</p>
                  <p class="item-value">{{ profileData.current_city }}</p>
                </div>
              </div>

              <div class="personal-item">
                <div class="item-icon">
                  <i class="bi bi-house text-muted"></i>
                </div>
                <div class="item-content">
                  <p class="item-label text-muted small">Hometown</p>
                  <p class="item-value">{{ profileData.home_town }}</p>
                </div>
              </div>

              <div class="personal-item">
                <div class="item-icon">
                  <i class="bi bi-people text-muted"></i>
                </div>
                <div class="item-content">
                  <p class="item-label text-muted small">Role</p>
                  <p class="item-value">{{ profileData.roles.map(r => r.name).join(', ') }}</p>
                </div>
              </div>

              <div class="personal-item">
                <div class="item-icon">
                  <i class="bi bi-calendar-check text-muted"></i>
                </div>
                <div class="item-content">
                  <p class="item-label text-muted small">Member Since</p>
                  <p class="item-value">{{ formatFullDate(profileData.created_at) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Collaboration -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="bi bi-handshake"></i>
                Collaboration
              </h5>
            </div>
            <div class="card-body">
              <div class="collaboration-logo">
                <img :src="profileData.collaboration.company_logo" alt="Company Logo" class="company-logo">
              </div>
              <a :href="profileData.collaboration.company_link" target="_blank" class="btn btn-outline-primary w-100">
                <i class="bi bi-box-arrow-up-right"></i>
                Visit Partner Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </DashboardLayout>
</template>
<style scoped>
.about-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Profile Header */
.profile-header {
  position: relative;
  background: white;
  border-bottom: 1px solid #e9ecef;
}

.cover-photo {
  height: 300px;
  overflow: hidden;
  background-color: #e9ecef;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-content {
  position: relative;
  padding-bottom: 2rem;
}

.profile-avatar {
  position: absolute;
  top: -80px;
  left: 2rem;
}

.avatar-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-info {
  padding-top: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.info-section {
  flex: 1;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
}

.profile-title {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.badges-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
}

.bg-secondary {
  background-color: #e9ecef !important;
  color: #495057 !important;
}

.bg-outline {
  background-color: transparent !important;
  color: #6c757d !important;
  border: 1px solid #dee2e6;
}

.quick-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Cards */
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background: white;
}

.card-header {
  background: transparent;
  border-bottom: 1px solid #f8f9fa;
  padding: 1.5rem;
}

.card-title {
  color: #212529;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  padding: 1.5rem;
}

/* Professional Info */
.professional-item {
  margin-bottom: 1.5rem;
}

.professional-item:last-child {
  margin-bottom: 0;
}

.item-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.item-value {
  margin-left: 1.75rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: #212529;
}

.responsibilities {
  margin-left: 1.75rem;
  color: #495057;
  line-height: 1.6;
}

/* Education Timeline */
.education-timeline {
  position: relative;
}

.education-item {
  position: relative;
  padding-left: 2rem;
  border-left: 2px solid #e9ecef;
  padding-bottom: 2rem;
}

.education-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -6px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0d6efd;
  border: 2px solid white;
}

.education-content {
  margin-left: 1rem;
}

.education-school {
  font-size: 1.125rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
}

.education-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.education-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.education-description {
  color: #495057;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-left: 1.25rem;
}

/* Projects */
.project-card {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
  transition: box-shadow 0.2s;
}

.project-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.project-title {
  font-weight: 600;
  color: #212529;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.project-link {
  font-size: 0.875rem;
  color: #6c757d;
  word-break: break-all;
}

/* Personal Info */
.personal-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.personal-item:last-child {
  margin-bottom: 0;
}

.item-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.item-content {
  flex: 1;
}

.item-label {
  margin-bottom: 0.125rem;
}

.item-value {
  color: #212529;
  font-size: 0.875rem;
}

/* Collaboration */
.collaboration-logo {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.company-logo {
  max-width: 100%;
  height: 6rem;
  object-fit: contain;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-name {
    font-size: 2rem;
  }

  .profile-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-buttons {
    margin-top: 1rem;
    width: 100%;
  }

  .action-buttons .btn {
    flex: 1;
  }

  .quick-info {
    gap: 1rem;
  }

  .info-item {
    font-size: 0.8rem;
  }

  .profile-avatar {
    top: -60px;
    left: 1rem;
  }

  .avatar-img {
    width: 120px;
    height: 120px;
  }

  .info-section {
    padding-top: 3rem;
  }
}

@media (max-width: 576px) {
  .cover-photo {
    height: 200px;
  }

  .profile-avatar {
    top: -50px;
  }

  .avatar-img {
    width: 100px;
    height: 100px;
  }

  .info-section {
    padding-top: 2rem;
  }

  .profile-name {
    font-size: 1.75rem;
  }

  .quick-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>