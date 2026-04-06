<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = useRouter()
const BASE_URL = 'https://novia2.csm.linkpc.net'

// --- Password Change State ---
const passwordForm = reactive({
    current_password: '',
    new_password: '',
});

const deleteConfirmText = ref('');
const status = reactive({
    loading: false,
    deleting: false,
    error: null,
    success: null,
});

// Computed to validate delete button
const canDelete = computed(() => deleteConfirmText.value === 'DELETE');

// --- Actions ---

/**
 * Handle Password Update
 */
const handleChangePassword = async () => {
    // Basic validation
    if (!passwordForm.current_password || !passwordForm.new_password) {
        status.error = "Please fill in all password fields.";
        return;
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
    errors.current = '' 

    try {
        const response = await fetch(`${BASE_URL}/api/profile/change-pass`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                current_password: passwordForm.current_password,
                new_password: passwordForm.new_password,
            }),
        });

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update password')
        }
        successMessage.value = 'Password updated successfully!'
        passwordForm.current = ''
        passwordForm.new = ''
        passwordForm.confirm = ''

    } catch (err) {
        status.error = err.message;
    } finally {
        status.loading = false;
    }
};

/**
 * Handle Account Deletion
 */
const handleDeleteAccount = async () => {
    if (!canDelete.value) return;

    if (!confirm("Are you absolutely sure? This action cannot be undone.")) {
        return;
    }

    status.deleting = true;
    status.error = null;

    try {
        const response = await fetch(`${BASE_URL}/api/profile/delete-acc`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete account')
        }

        // Success - Clear local storage if you have a token
        localStorage.clear() 
        
        // Redirect to login
        router.push('/login')

        alert("Account deleted successfully.");
        router.push('/login');
    } catch (err) {
        deleteError.value = err.message
    } finally {
        isDeleting.value = false
    }
};
</script>

<template>
    <div class="settings-container">
        <!-- Feedback Messages -->
        <div v-if="status.error" class="alert alert-error">{{ status.error }}</div>
        <div v-if="status.success" class="alert alert-success">{{ status.success }}</div>

        <!-- Change Password Section -->
        <section>
            <h2>Change Password</h2>
            <form @submit.prevent="handleChangePassword">
                <input v-model="passwordForm.current_password" type="password" placeholder="Current Password"
                    :disabled="status.loading" />
                <input v-model="passwordForm.new_password" type="password" placeholder="New Password"
                    :disabled="status.loading" />
                <button type="submit" :disabled="status.loading">
                    {{ status.loading ? 'Updating...' : 'Update Password' }}
                </button>
            </form>
        </section>

        <hr />

        <!-- Delete Account Section -->
        <section class="danger-zone">
            <h2>Delete Account</h2>
            <p>Type <strong>DELETE</strong> to confirm.</p>
            <input v-model="deleteConfirmText" type="text" placeholder="DELETE" :disabled="status.deleting" />
            <button @click="handleDeleteAccount" :disabled="!canDelete || status.deleting" class="btn-danger">
                {{ status.deleting ? 'Deleting...' : 'Delete Permanently' }}
            </button>
        </section>
    </div>
</template>

<style scoped>
/* Minimal styling to demonstrate state */
.alert {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
}

.alert-error {
    background: #fee2e2;
    color: #991b1b;
}

.alert-success {
    background: #dcfce7;
    color: #166534;
}

.btn-danger {
    background: #dc2626;
    color: white;
}

.btn-danger:disabled {
    background: #fca5a5;
    cursor: not-allowed;
}

button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>