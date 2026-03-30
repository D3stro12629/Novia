<template>
    <DashboardLayout>
    <div class="container">
        <div class="settings-page-wrapper">
            <div class="settings-page">
                <!-- Page Header -->
                <header class="page-header mb-5">
                    <div class="d-flex align-items-center gap-3">
                        <div class="header-icon">
                            <i class="bi bi-gear-wide-connected"></i>
                        </div>
                        <div>
                            <h1 class="page-title">Settings</h1>
                            <p class="page-subtitle">Manage your account security and preferences</p>
                        </div>
                    </div>
                </header>

                <!-- Change Password Section -->
                <section class="settings-section mb-5">
                    <div class="glass-card">
                        <div class="section-header">
                            <div class="d-flex align-items-center gap-3">
                                <div class="icon-box primary">
                                    <i class="bi bi-shield-lock-fill"></i>
                                </div>
                                <div>
                                    <h2 class="section-title">Security</h2>
                                    <p class="section-desc">Update your password to keep your account secure</p>
                                </div>
                            </div>
                        </div>

                        <form @submit.prevent="handlePasswordChange" class="settings-form">
                            <!-- Current Password -->
                            <div class="form-group">
                                <label class="form-label">Current Password</label>
                                <div class="input-group">
                                    <span class="input-icon"><i class="bi bi-key-fill"></i></span>
                                    <input :type="showCurrent ? 'text' : 'password'" v-model="passwordForm.current"
                                        class="form-control" :class="{ 'is-invalid': errors.current }"
                                        placeholder="Enter current password" />
                                    <button type="button" class="toggle-btn" @click="showCurrent = !showCurrent">
                                        <i :class="showCurrent ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                    </button>
                                </div>
                                <span v-if="errors.current" class="error-text">{{ errors.current }}</span>
                            </div>

                            <hr class="divider" />

                            <!-- New Password -->
                            <div class="form-group">
                                <label class="form-label">New Password</label>
                                <div class="input-group">
                                    <span class="input-icon"><i class="bi bi-lock-fill"></i></span>
                                    <input :type="showNew ? 'text' : 'password'" v-model="passwordForm.new"
                                        class="form-control" :class="{ 'is-invalid': errors.new }"
                                        placeholder="Enter new password" />
                                    <button type="button" class="toggle-btn" @click="showNew = !showNew">
                                        <i :class="showNew ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                    </button>
                                </div>
                                <span v-if="errors.new" class="error-text">{{ errors.new }}</span>
                                <small class="form-hint">
                                    <i class="bi bi-info-circle"></i>
                                    Must be at least 6 characters
                                </small>
                            </div>

                            <!-- Confirm Password -->
                            <div class="form-group">
                                <label class="form-label">Confirm New Password</label>
                                <div class="input-group">
                                    <span class="input-icon"><i class="bi bi-check-circle-fill"></i></span>
                                    <input :type="showConfirm ? 'text' : 'password'" v-model="passwordForm.confirm"
                                        class="form-control" :class="{ 'is-invalid': errors.confirm }"
                                        placeholder="Confirm new password" />
                                    <button type="button" class="toggle-btn" @click="showConfirm = !showConfirm">
                                        <i :class="showConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                    </button>
                                </div>
                                <span v-if="errors.confirm" class="error-text">{{ errors.confirm }}</span>
                            </div>

                            <!-- Success Message -->
                            <Transition name="slide-fade">
                                <div v-if="successMessage" class="alert-success">
                                    <i class="bi bi-check-circle-fill"></i>
                                    {{ successMessage }}
                                </div>
                            </Transition>

                            <!-- Submit -->
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-glow" :disabled="isLoading">
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                    <i v-else class="bi bi-arrow-repeat me-2"></i>
                                    {{ isLoading ? 'Updating...' : 'Update Password' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <!-- Danger Zone Section -->
                <section class="settings-section danger-zone">
                    <div class="glass-card border-danger">
                        <div class="section-header">
                            <div class="d-flex align-items-center gap-3">
                                <div class="icon-box danger">
                                    <i class="bi bi-exclamation-triangle-fill"></i>
                                </div>
                                <div>
                                    <h2 class="section-title text-danger">Danger Zone</h2>
                                    <p class="section-desc">Irreversible and destructive actions</p>
                                </div>
                            </div>
                        </div>

                        <div class="danger-content">
                            <div class="danger-notice">
                                <h3>Delete Account</h3>
                                <p>
                                    Once you delete your account, there is no going back. This action permanently
                                    removes
                                    all
                                    your data,
                                    including your profile, posts, and activity history.
                                </p>
                            </div>

                            <button class="btn btn-outline-danger btn-glow-danger" @click="showDeleteModal = true">
                                <i class="bi bi-trash-fill me-2"></i>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Delete Account Modal -->
                <Teleport to="body">
                    <Transition name="modal">
                        <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeModal">
                            <div class="modal-content glass-modal">
                                <div class="modal-header border-danger">
                                    <h3 class="modal-title text-danger">
                                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                        Confirm Account Deletion
                                    </h3>
                                    <button class="btn-close" @click="closeModal">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>

                                <div class="modal-body">
                                    <p class="warning-text">
                                        This action <strong class="text-danger">cannot be undone</strong>.
                                        This will permanently delete your account and remove all associated data from
                                        our
                                        servers.
                                    </p>

                                    <div class="confirmation-input">
                                        <label>
                                            Please type <code class="text-danger fw-bold">DELETE</code> to confirm:
                                        </label>
                                        <input v-model="deleteConfirmText" type="text" class="form-control"
                                            placeholder="DELETE" :disabled="isDeleting" />
                                    </div>

                                    <Transition name="slide-fade">
                                        <div v-if="deleteError" class="alert-error">
                                            <i class="bi bi-x-circle-fill me-2"></i>
                                            {{ deleteError }}
                                        </div>
                                    </Transition>
                                </div>

                                <div class="modal-footer">
                                    <button class="btn btn-secondary" @click="closeModal" :disabled="isDeleting">
                                        Cancel
                                    </button>
                                    <button class="btn btn-danger"
                                        :disabled="deleteConfirmText !== 'DELETE' || isDeleting"
                                        @click="handleDeleteAccount">
                                        <span v-if="isDeleting" class="spinner-border spinner-border-sm me-2"></span>
                                        {{ isDeleting ? 'Deleting...' : 'Delete Account' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Teleport>
            </div>
        </div>
    </div>
    </DashboardLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// --- Password Change State ---
const passwordForm = reactive({
    current: '',
    new: '',
    confirm: ''
})

const errors = reactive({
    current: '',
    new: '',
    confirm: ''
})

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)
const successMessage = ref('')

// --- Delete Account State ---
const showDeleteModal = ref(false)
const deleteConfirmText = ref('')
const isDeleting = ref(false)
const deleteError = ref('')

// --- Methods ---

const validatePassword = () => {
    let valid = true
    errors.current = ''
    errors.new = ''
    errors.confirm = ''

    if (!passwordForm.current) {
        errors.current = 'Current password is required'
        valid = false
    }

    if (!passwordForm.new) {
        errors.new = 'New password is required'
        valid = false
    } else if (passwordForm.new.length < 6) {
        errors.new = 'Password must be at least 6 characters'
        valid = false
    }

    if (!passwordForm.confirm) {
        errors.confirm = 'Please confirm your password'
        valid = false
    } else if (passwordForm.new !== passwordForm.confirm) {
        errors.confirm = 'Passwords do not match'
        valid = false
    }

    return valid
}

const handlePasswordChange = async () => {
    if (!validatePassword()) return

    isLoading.value = true
    successMessage.value = ''

    try {
        const response = await fetch('http://novia2.csm.linkpc.net/api/profile/change-pass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_password: passwordForm.current,
                new_password: passwordForm.new
            })
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Failed to update password')

        successMessage.value = 'Password updated successfully!'
        passwordForm.current = ''
        passwordForm.new = ''
        passwordForm.confirm = ''

    } catch (err) {
        errors.current = err.message
    } finally {
        isLoading.value = false
    }
}

const closeModal = () => {
    if (isDeleting.value) return
    showDeleteModal.value = false
    deleteConfirmText.value = ''
    deleteError.value = ''
}

const handleDeleteAccount = async () => {
    if (deleteConfirmText.value !== 'DELETE') return

    isDeleting.value = true
    deleteError.value = ''

    try {
        const response = await fetch('http://novia2.csm.linkpc.net/api/profile/delete-acc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Failed to delete account')

        // Success - redirect to login
        window.location.href = '/login'

    } catch (err) {
        deleteError.value = err.message || 'Failed to delete account. Please try again.'
    } finally {
        isDeleting.value = false
    }
}
</script>

<style scoped>
/* --- Page Layout --- */
.settings-page-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: radial-gradient(circle at top left, #1a1d29, #0f1016);
}

.settings-page {
    width: 100%;
    width: 600px;
    animation: fadeIn 0.5s ease-out;
}


.page-header {
    display: flex;
    align-items: center;
}

.header-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: white;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
}

.page-title {
    font-size: 2rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
    letter-spacing: -0.02em;
}

.page-subtitle {
    color: #94a3b8;
    margin: 0;
    font-size: 1rem;
}

/* --- Glass Cards --- */
.glass-card {
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 2rem;
    transition: all 0.3s ease;
}

.glass-card:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.glass-card.border-danger {
    border-color: rgba(239, 68, 68, 0.3);
}

.glass-card.border-danger:hover {
    border-color: rgba(239, 68, 68, 0.5);
    box-shadow: 0 8px 32px rgba(239, 68, 68, 0.1);
}

/* --- Section Headers --- */
.section-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.icon-box.primary {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.icon-box.danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0;
}

.section-desc {
    color: #64748b;
    font-size: 0.875rem;
    margin: 0.25rem 0 0;
}

/* --- Forms --- */
.settings-form {
    max-width: 600px;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    color: #cbd5e1;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.input-group {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 1rem;
    color: #64748b;
    z-index: 10;
}

.form-control {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #f1f5f9;
    font-size: 0.9375rem;
    transition: all 0.2s ease;
}

.form-control:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-control.is-invalid {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
}

.toggle-btn {
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;
}

.toggle-btn:hover {
    color: #94a3b8;
}

.error-text {
    display: block;
    color: #f87171;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

.form-hint {
    display: block;
    color: #64748b;
    font-size: 0.8125rem;
    margin-top: 0.5rem;
}

.form-hint i {
    margin-right: 0.25rem;
}

.divider {
    border: none;
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 1.5rem 0;
}

/* --- Buttons --- */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 1.75rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9375rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.btn-glow {
    position: relative;
}

.btn-glow::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    border-radius: 14px;
    opacity: 0;
    z-index: -1;
    filter: blur(12px);
    transition: opacity 0.3s;
}

.btn-glow:hover::after {
    opacity: 0.4;
}

.btn-outline-danger {
    background: transparent;
    border: 1px solid rgba(239, 68, 68, 0.5);
    color: #f87171;
}

.btn-outline-danger:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
    color: #ef4444;
}

.btn-glow-danger:hover {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
}

.btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
}

.btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
}

.btn-danger:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
}

.form-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
}

/* --- Danger Zone --- */
.danger-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.danger-notice {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 12px;
    padding: 1.25rem;
}

.danger-notice h3 {
    color: #f87171;
    font-size: 1rem;
    margin: 0 0 0.5rem;
}

.danger-notice p {
    color: #94a3b8;
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
}

/* --- Alerts --- */
.alert-success {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #4ade80;
    padding: 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.alert-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    padding: 0.875rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    margin-top: 1rem;
}

/* --- Modal --- */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
}

.modal-content {
    width: 100%;
    max-width: 480px;
    animation: modalSlide 0.3s ease-out;
}

@keyframes modalSlide {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
}

.btn-close {
    background: none;
    border: none;
    color: #64748b;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;
}

.btn-close:hover {
    color: #f1f5f9;
}

.modal-body {
    padding: 1.5rem;
}

.warning-text {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.confirmation-input label {
    display: block;
    color: #94a3b8;
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
}

.confirmation-input input {
    width: 100%;
    padding: 0.875rem 1rem;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #f1f5f9;
    font-size: 0.9375rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.confirmation-input input:focus {
    outline: none;
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.modal-footer {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    padding: 1rem 1.5rem 1.5rem;
}

/* --- Transitions --- */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>