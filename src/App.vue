<!-- src/App.vue -->
<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <!-- Global application background set on wrapper container element -->
  <div class="app-layout">
    <Navbar />
    
    <!-- Dynamic viewports switch automatically based on the browser URL path -->
    <main class="page-body">
      <router-view />
    </main>
    
    <Footer id="shop-footer"/>
  </div>
</template>

<style>
/* Global style block (no scoped attribute here ensures body/layout changes propagate) */
body {
  margin: 0;
  padding: 0;
  background-color: #EEF8F3; /* Moves your soft green global backdrop rule into the canvas safely */
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-body {
  flex: 1;
}
</style>