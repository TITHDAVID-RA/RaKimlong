<!-- src/views/HomeView.vue -->
<script setup lang="ts">
import Shop from '../components/shop.vue'
import Banner from '../components/Banner.vue'
import ProductionTimeline from '../components/ProductionTimeline.vue'
import reviewForm from '../components/ReviewForm.vue'
import testimonials from '../components/Testimonials.vue'
import backgroundImage from '../assets/image/photo_2026-07-10_15-37-58.jpg'
import backgroundPic from '../assets/image/photo_2026-07-10_13-43-41.jpg' // your main image
import logoPic from '../assets/image/LOGO.jpg' 

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
  }
}
</script>

<template>
 <section 
    class="hero-section" 
    :style="{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.45)), url(${backgroundPic})` }"
  >
    <div class="hero-container">
      
      <div class="hero-content">
        <span class="badge">CAMBODIAN ORIGIN PREMIUM</span>
        
        <h1 class="hero-title">
          Steeped in Cambodian Heritage. Powered by Innovation.
        </h1>
        
        <p class="hero-description">
          Rakimlong Co., Ltd. transforms the rich biodiversity of Kampot and 
          Kampong Speu into world-class superfood infusions. Discover the 
          vibrant essence of Khmer agriculture.
        </p>
        
        <div class="hero-buttons">
          <!-- 🟢 Click triggers scroll down to the bottom footer -->
          <button class="btn btn-green" @click="scrollToSection('shop-footer')">
            ស្វែងរកទីតាំងហាង
          </button>
          <!-- 🟢 Click triggers scroll down to production section -->
          <button class="btn btn-gray" @click="scrollToSection('production-timeline')">
            របៀបផលិត
          </button>
        </div>
      </div>

      <div class="hero-brand-card">
        <div class="logo-wrapper">
          <img :src="logoPic" alt="Elephant Brand Logo" class="brand-logo-img" />
        </div>
      </div>

    </div>
  </section>
   <Shop />
  <Banner />
  <ProductionTimeline id="production-timeline" />
  <img :src="backgroundImage" alt="Background" class="poster" />
  <reviewForm />
  <testimonials />
</template>

<style scoped>
.poster {
  width: 100%;
  height: auto;
  display: block;
}

.hero-section {
  width: 100%;
  height: 500px; /* Rigidly locks section height */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 20px; /* Removed vertical padding to prevent sizing expansion past 500px */
  box-sizing: border-box;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 40px;
  align-items: center;
  width: 100%;
}

/* Typography Styles */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.badge {
  background-color: rgba(162, 210, 183, 0.6);
  color: #2e6046;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0b0b0b;
  line-height: 1.25;
  margin: 0 0 16px 0;
}

.hero-description {
  font-size: 1rem;
  color: #333333;
  line-height: 1.6;
  max-width: 520px;
  margin: 0 0 28px 0;
}

/* Action Buttons */
.hero-buttons {
  display: flex;
  gap: 14px;
}

.btn {
  padding: 12px 28px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', sans-serif;
  transition: transform 0.1s ease, filter 0.2s ease;
}

.btn:active {
  transform: scale(0.98);
}

.btn-green {
  background-color: #1e8343;
  color: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

.btn-green:hover {
  filter: brightness(1.1);
}

.btn-gray {
  background-color: #d1d5db;
  color: #23272e;
  border: 1px solid #b5b9c0;
}

.btn-gray:hover {
  background-color: #c4c8cf;
}

/* Card Branding Box Settings */
.hero-brand-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-wrapper {
  background: white;
  padding: 16px;
  border-radius: 40px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: 380px; /* Restricts wrapper card expansion size */
}

.brand-logo-img {
  width: 100%;
  height: auto;
  object-fit: contain; /* Keeps the ratio layout clean and un-stretched */
  border-radius: 28px; /* Smooth card curves for the image border overlay */
}

/* Responsive Breakpoint */
@media (max-width: 850px) {
  .hero-section {
    height: auto; /* Fallback for mobile views to prevent text overlap */
    padding: 60px 20px;
  }
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  .hero-content {
    align-items: center;
    text-align: center;
  }
  .hero-title {
    font-size: 2rem;
  }
}
</style>