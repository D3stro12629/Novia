<script setup lang="ts">
import PostCard from '../components/PostCard.vue';
import { usePostStore } from '../stores/post';
import { computed, onMounted } from 'vue';
import State from '../components/State.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import CreatePostView from '../views/CreatePostView.vue'; 

interface Post {
    id: number;
    [key: string]: unknown;
}

const postStore = usePostStore();
const posts = computed<Post[]>(() => postStore.posts as Post[]);

onMounted(() => {
    postStore.fetchPosts();
});
</script>

<template>
    <DashboardLayout>
        <div class="container">
            <div class="row">

                <div class="d-flex align-items-center mb-3 col-8">
                    <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        class="rounded-circle me-3"
                        style="width: 40px; height: 40px; object-fit: cover;"
                    />
                    <button 
                        type="button"
                        class="form-control border-0 shadow-none cursor-pointer text-muted text-start"
                        data-bs-toggle="modal"
                        data-bs-target="#createPostModal"
                    >
                        what's on your mind?
                    </button>
                </div>


                <!-- CREATE POST MODAL -->
                <div 
                    class="modal fade" 
                    id="createPostModal" 
                    tabindex="-1" 
                    aria-labelledby="createPostModal" 
                    aria-hidden="true"
                >
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            
                            <div class="modal-header">
                                <h5 class="modal-title" id="createPostModal">Create Post</h5>
                                <button 
                                    type="button" 
                                    class="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div class="modal-body">
                                <CreatePostView />
                            </div>

                        </div>
                    </div>
                </div>


                <!-- LEFT COLUMN — POSTS -->
                <div class="col-8">
                    <div class="row g-3">
                        <div 
                            class="col-12" 
                            v-for="item in posts" 
                            :key="item.id"
                        >
                            <PostCard :post="item" />
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN -->
                <div class="col-4">
                    <State />
                </div>

            </div>
        </div>
    </DashboardLayout>
</template>
