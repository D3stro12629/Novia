<template>
    <div class="container">
        <!-- Top Navbar -->
        <Navbar />
        <Sidebar />
        <div class="content-wrapper">
            <!-- Left Sidebar -->
            <!-- Main Content -->
            <main class="main-content">
                <div class="page-header">
                    <h1>Personal Information</h1>
                    <p class="breadcrumb">Home / Account / Personal Information</p>
                </div>

                <div class="form-card">
                    <div class="form-grid">
                        <div class="gender-group">
                            <label>Gender</label>
                            <div class="gender-options">
                                <label class="radio-label">
                                    <input type="radio" name="gender" value="male" v-model="form.gender" />
                                    <span class="radio-custom"></span>
                                    <span class="radio-text">Male</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="gender" value="female" v-model="form.gender" />
                                    <span class="radio-custom"></span>
                                    <span class="radio-text">Female</span>
                                </label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-field">
                                <label>First Name</label>
                                <input type="text" v-model="form.firstName" placeholder="First Name" />
                            </div>
                            <div class="form-field">
                                <label>Last Name</label>
                                <input type="text" v-model="form.lastName" placeholder="Last Name" />
                            </div>
                        </div>

                        <div class="form-field">
                            <label>Email</label>
                            <div class="email-wrapper">
                                <input type="email" v-model="form.email" placeholder="Email" />
                                <span class="verified">✔ Verified</span>
                            </div>
                        </div>

                        <div class="form-field full-width">
                            <label>Address</label>
                            <input type="text" v-model="form.address" placeholder="Address" />
                        </div>

                        <div class="form-row">
                            <div class="form-field">
                                <label>Phone Number</label>
                                <input type="tel" v-model="form.phone" placeholder="(405) 555-0128" />
                            </div>
                            <div class="form-field">
                                <label>Date of Birth</label>
                                <input type="text" v-model="form.dob" placeholder="1 Feb, 1995" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-field">
                                <label>Location</label>
                                <select v-model="form.location">
                                    <option>Atlanta, USA</option>
                                    <option>New York, USA</option>
                                    <option>Los Angeles, USA</option>
                                </select>
                            </div>
                            <div class="form-field">
                                <label>Postal Code</label>
                                <input type="text" v-model="form.postalCode" placeholder="30301" />
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button class="btn discard" @click="discardChanges">Discard Changes</button>
                        <button class="btn save" @click="saveChanges">Save Changes</button>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

const form = reactive({
    gender: 'male',
    firstName: 'Roland',
    lastName: 'Donald',
    email: 'rolandDonald@mail.com',
    address: '3605 Parker Rd.',
    phone: '(405) 555-0128',
    dob: '1 Feb, 1995',
    location: 'Atlanta, USA',
    postalCode: '30301'
})

const initialForm = { ...form }

const saveChanges = () => {
    console.log('Saving:', form)
    alert('Changes saved successfully!')
}

const discardChanges = () => {
    Object.assign(form, initialForm)
    console.log('Form reset to initial values')
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.page-wrapper {
    min-height: 100vh;
    background: #f5f6fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}



/* ==================== CONTENT WRAPPER ==================== */
.content-wrapper {
    display: flex;
    padding-top: 64px;
    min-height: 100vh;
}

/* ==================== SIDEBAR ==================== */
.sidebar {
    width: 260px;
    background: white;
    border-right: 1px solid #e9ecef;
    padding: 20px 0;
    position: fixed;
    left: 0;
    top: 64px;
    bottom: 0;
    overflow-y: auto;
}

.sidebar-header {
    text-align: center;
    padding: 0 20px 20px;
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 16px;
}

.avatar-wrapper {
    position: relative;
    width: 90px;
    height: 90px;
    margin: 0 auto 12px;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.edit-badge {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 26px;
    height: 26px;
    background: #ff6b00;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s;
}

.edit-badge:hover {
    background: #e65c00;
    transform: scale(1.05);
}

.sidebar-header h3 {
    font-size: 1rem;
    color: #212529;
    margin-bottom: 4px;
    font-weight: 600;
}

.role {
    color: #6c757d;
    font-size: 0.8rem;
}

/* Sidebar Menu */
.sidebar-menu {
    padding: 0 12px;
}

.menu-section {
    margin-bottom: 20px;
}

.section-title {
    display: block;
    font-size: 0.65rem;
    font-weight: 700;
    color: #adb5bd;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0 12px;
    margin-bottom: 8px;
}

.sidebar-menu ul {
    list-style: none;
}

.sidebar-menu li {
    margin: 2px 0;
}

.sidebar-menu a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    color: #495057;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s;
    font-size: 0.9rem;
}

.sidebar-menu a:hover {
    background: #fff3e6;
    color: #ff6b00;
}

.sidebar-menu li.active a {
    background: #fff3e6;
    color: #ff6b00;
    font-weight: 500;
}

.menu-icon {
    font-size: 1rem;
    width: 22px;
    text-align: center;
}

.menu-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.logout {
    color: #dc3545 !important;
}

.logout:hover {
    background: #fff5f5 !important;
}

/* ==================== MAIN CONTENT ==================== */
.main-content {
    flex: 1;
    margin-left: 260px;
    padding: 28px 32px;
}

.page-header {
    margin-bottom: 24px;
}

.page-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 6px;
}

.breadcrumb {
    color: #6c757d;
    font-size: 0.8rem;
}

/* ==================== FORM CARD ==================== */
.form-card {
    background: white;
    border-radius: 12px;
    padding: 28px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-grid {
    display: grid;
    gap: 20px;
}

.gender-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
    color: #495057;
    font-size: 0.85rem;
}

.gender-options {
    display: flex;
    gap: 24px;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: #495057;
}

.radio-label input {
    display: none;
}

.radio-custom {
    width: 18px;
    height: 18px;
    border: 2px solid #ced4da;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
}

.radio-custom::after {
    content: '';
    width: 8px;
    height: 8px;
    background: #ff6b00;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
}

.radio-label input:checked+.radio-custom {
    border-color: #ff6b00;
}

.radio-label input:checked+.radio-custom::after {
    opacity: 1;
}

.radio-text {
    font-size: 0.9rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-field label {
    font-weight: 500;
    color: #495057;
    font-size: 0.85rem;
}

.form-field input,
.form-field select {
    padding: 11px 14px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 0.9rem;
    background: white;
    transition: all 0.2s;
    color: #212529;
}

.form-field input::placeholder {
    color: #adb5bd;
}

.form-field input:focus,
.form-field select:focus {
    outline: none;
    border-color: #ff6b00;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
}

.form-field select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236c757d' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
}

.email-wrapper {
    position: relative;
}

.email-wrapper input {
    width: 100%;
    padding-right: 85px;
}

.verified {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #28a745;
    font-size: 0.8rem;
    font-weight: 500;
}

.full-width {
    grid-column: 1 / -1;
}

.form-actions {
    margin-top: 28px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 20px;
    border-top: 1px solid #e9ecef;
}

.btn {
    padding: 11px 24px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.btn.discard {
    background: #f5f6fa;
    color: #495057;
}

.btn.discard:hover {
    background: #e9ecef;
}

.btn.save {
    background: #ff6b00;
    color: white;
}

.btn.save:hover {
    background: #e65c00;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1024px) {
    .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }

    .main-content {
        margin-left: 0;
    }
}

@media (max-width: 768px) {
    .navbar-center {
        display: none;
    }

    .profile-name {
        display: none;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .main-content {
        padding: 20px;
    }

    .form-card {
        padding: 20px;
    }

    .form-actions {
        flex-direction: column-reverse;
    }

    .btn {
        width: 100%;
    }
}
</style>
