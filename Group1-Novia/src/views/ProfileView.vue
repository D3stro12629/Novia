<template>
    <div class="container">
        <div class="cozmeet-dashboard">
            <!-- LEFT SIDEBAR -->
            <aside class="sidebar left-sidebar">
                <div class="profile-card">
                    <div class="avatar-wrapper">
                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop"
                        alt="Profile" class="avatar" />
                </div>
                <h2>Reinhard Van Zry</h2>
                <p class="username">@Reinhard_</p>

                <div class="stats">
                    <div>
                        <strong>250</strong>
                        <span>Posts</span>
                    </div>
                    <div>
                        <strong>2022</strong>
                        <span>Followers</span>
                    </div>
                    <div>
                        <strong>590</strong>
                        <span>Following</span>
                    </div>
                </div>

                <button class="btn-primary">My Profile</button>
            </div>

            <div class="shortcuts">
                <h3>Your shortcuts <span>See all</span></h3>
                <ul>
                    <li>Art and drawing</li>
                    <li>Dribbble Pro</li>
                    <li>Behance Creative</li>
                    <li>One Piece Fan</li>
                </ul>
            </div>
        </aside>

        <!-- MAIN FEED -->
        <main class="feed">
            <!-- Composer -->
            <div class="composer card">
                <div class="composer-header">
                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=48&h=48&fit=crop" alt="You"
                        class="tiny-avatar" />
                    <input type="text" placeholder="Share something..." />
                </div>
                <div class="composer-actions">
                    <button>📷 Image</button>
                    <button>🎥 Video</button>
                    <button>📊 Poll</button>
                    <select>
                        <option>Public</option>
                        <option>Friends</option>
                    </select>
                </div>
            </div>

            <!-- Sample Post -->
            <div class="post card">
                <div class="post-header">
                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=48&h=48&fit=crop"
                        alt="Briansky" class="tiny-avatar" />
                    <div>
                        <strong>Briansky</strong>
                        <span>12 minutes ago</span>
                    </div>
                    <button class="more">⋯</button>
                </div>

                <p class="post-text">
                    Beautiful art! #art #aesthetics #wallstreet #wallpaper #photography
                </p>

                <img src="https://images.unsplash.com/photo-1547891654-e66ed7eb9688?w=600&auto=format&fit=crop&q=80"
                    alt="Surreal face art" class="post-image" />

                <div class="post-stats">
                    <span>❤️ 320k</span>
                    <span>💬 120</span>
                    <span>📑 148</span>
                </div>

                <div class="comment-box">
                    <input type="text" placeholder="Write your comment" />
                </div>
            </div>
        </main>

        <!-- RIGHT SIDEBAR -->
        <aside class="sidebar right-sidebar">
            <div class="activity card">
                <div class="section-header">
                    <h3>Activity</h3>
                    <span>See all</span>
                </div>
                <ul>
                    <li>Deraa Started following you 5m ago</li>
                    <li>Edilwp liked your photo</li>
                    <li>Praha_id liked your photo ID</li>
                    <li>Praha liked your photo</li>
                </ul>
            </div>

            <div class="suggested card">
                <div class="section-header">
                    <h3>Suggested For you</h3>
                    <span>See all</span>
                </div>
                <ul>
                    <li>Najid • Follow</li>
                    <li>Sheila Dara • Followed by Dims</li>
                    <li>Divaaurey • Follow</li>
                    <li>Jhonson Andrea • Followed by Andrea</li>
                </ul>
            </div>
        </aside>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
.cozmeet-dashboard {
    --bg: #0f0f0f;
    --card: #161616;
    --border: #222;
    --text: #e0e0e0;
    --primary: #0066ff;
    --primary-dark: #0055dd;

    display: grid;
    grid-template-columns: 280px 1fr 300px;
    gap: 20px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: system-ui, -apple-system, sans-serif;
}

.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
}

.profile-card {
    text-align: center;
}

.avatar-wrapper {
    margin-bottom: 12px;
}

.avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary);
}

.username {
    color: #aaa;
    margin: 4px 0 12px;
}

.stats {
    display: flex;
    justify-content: space-around;
    margin: 16px 0;
}

.stats div {
    text-align: center;
}

.stats strong {
    display: block;
    font-size: 1.4rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    margin-top: 8px;
}

.btn-primary:hover {
    background: var(--primary-dark);
}

.shortcuts h3 {
    margin: 0 0 12px;
    font-size: 1.1rem;
}

.shortcuts span {
    float: right;
    color: #888;
    font-size: 0.9rem;
}

.shortcuts ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.shortcuts li {
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
}

.shortcuts li:last-child {
    border-bottom: none;
}

.feed {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.composer-header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
}

.tiny-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.composer input {
    flex: 1;
    background: #1e1e1e;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 10px 16px;
    color: white;
}

.composer-actions {
    display: flex;
    gap: 16px;
    color: #aaa;
}

.composer-actions button,
.composer-actions select {
    background: transparent;
    border: none;
    color: #aaa;
    cursor: pointer;
}

.post-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.post-header strong {
    display: block;
}

.post-header span {
    font-size: 0.85rem;
    color: #888;
}

.more {
    margin-left: auto;
    background: none;
    border: none;
    color: #aaa;
    font-size: 1.4rem;
    cursor: pointer;
}

.post-text {
    margin: 0 0 12px;
}

.post-image {
    width: 100%;
    border-radius: 10px;
    display: block;
    margin-bottom: 12px;
}

.post-stats {
    display: flex;
    gap: 24px;
    color: #aaa;
    margin-bottom: 12px;
}

.comment-box input {
    width: 100%;
    background: #1e1e1e;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 10px 16px;
    color: white;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.section-header span {
    color: #888;
    font-size: 0.9rem;
}

.right-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.right-sidebar li {
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.95rem;
}

.right-sidebar li:last-child {
    border-bottom: none;
}

/* Responsive – stack on mobile */
@media (max-width: 1024px) {
    .cozmeet-dashboard {
        grid-template-columns: 1fr;
    }

    .left-sidebar,
    .right-sidebar {
        order: 2;
    }

    .feed {
        order: 1;
    }
}
</style>