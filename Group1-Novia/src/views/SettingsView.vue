<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- API Configuration ---
const BASE_URL = 'https://novia2.csm.linkpc.net';

/**
 * Reusable fetch wrapper for API calls
 */
async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if your API requires auth
        },
        ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
}

// --- State Management ---
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

    status.loading = true;
    status.error = null;
    status.success = null;

    try {
        await apiRequest('/api/profile/change-pass', {
            body: JSON.stringify({
                current_password: passwordForm.current_password,
                new_password: passwordForm.new_password,
            }),
        });

        status.success = "Password updated successfully!";

        // Reset Form
        passwordForm.current_password = '';
        passwordForm.new_password = '';

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
        await apiRequest('/api/profile/delete-acc');

        // Success: Clear session/token if necessary
        // localStorage.removeItem('token'); 

        alert("Account deleted successfully.");
        router.push('/login');
    } catch (err) {
        status.error = err.message;
        status.deleting = false;
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