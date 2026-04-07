<script setup>
import { RouterLink } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />

    <p class="home-nav">
      <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/contact">Contact</RouterLink> |
      <RouterLink to="/help">Help</RouterLink>
    </p>
  </main>
</template>

<style scoped>
.home-nav {
  text-align: center;
  margin: 2rem 0 0;
}

.home-nav a {
  color: #0066ff;
  font-weight: 600;
}
</style>
