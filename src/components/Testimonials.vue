<script setup lang="ts">
import { ref } from 'vue'

interface Testimonial {
  id: number
  rating: number
  quote: string
  author: string
  role: string
}

// Mock database matching your layout text exactly
const testimonials = ref<Testimonial[]>([
  {
    id: 1,
    rating: 3,
    quote: '"ការដឹងច្បាស់ពីប្រភពតែរបស់យើងខ្ញុំគឺសំខាន់សម្រាប់ខ្ញុំកម្អាតភាពនៃដំណើរពីកសិដ្ឋានទៅលែងគិតជាអ្វីដែលនាំខ្ញុំមកទីនេះប៉ុន្តែគុណភាពនៃស្លឹកតែទាំងមូលគីជាអ្វីដែលធ្វើឲ្យខ្ញុំត្រលប់មកវិញ។"',
    author: 'ឆាយជេន សៀវលី',
    role: 'អតិថិជន'
  },
  {
    id: 2,
    rating: 5,
    quote: '"ការដឹងច្បាស់ពីប្រភពតែរបស់យើងខ្ញុំគឺសំខាន់សម្រាប់ខ្ញុំកម្អាតភាពនៃដំណើរពីកសិដ្ឋានទៅលែងគិតជាអ្វីដែលនាំខ្ញុំមកទីនេះប៉ុន្តែគុណភាពនៃស្លឹកតែទាំងមូលគីជាអ្វីដែលធ្វើឲ្យខ្ញុំត្រលប់មកវិញ។"',
    author: 'ផាន់ ពួយសេង',
    role: 'អតិថិជន'
  },
  {
    id: 3,
    rating: 4,
    quote: '"ការដឹងច្បាស់ពីប្រភពតែរបស់យើងខ្ញុំគឺសំខាន់សម្រាប់ខ្ញុំកម្អាតភាពនៃដំណើរពីកសិដ្ឋានទៅលែងគិតជាអ្វីដែលនាំខ្ញុំមកទីនេះប៉ុន្តែគុណភាពនៃស្លឹកតែទាំងមូលគីជាអ្វីដែលធ្វើឲ្យខ្ញុំត្រលប់មកវិញ។"',
    author: 'ម៉ៅ សៅរ៍សភាទ័យ',
    role: 'អតិថិជន'
  }
])
</script>

<template>
  <section class="testimonials-section">
    <p class="section-title">មតិយោបល់ពីអតិថិជនដែលបានប្រើប្រាស់</p>

    <div class="cards-grid">
      <div 
        v-for="item in testimonials" 
        :key="item.id" 
        class="testimonial-card"
      >
        <div class="star-rating">
          <span v-for="star in item.rating" :key="star" class="star">★</span>
        </div>

        <p class="quote-text">{{ item.quote }}</p>

        <div class="card-footer">
          <div class="author-details">
            <h4 class="author-name">{{ item.author }}</h4>
            <span class="author-role">{{ item.role }}</span>
          </div>
          
          <div class="verified-badge" title="Verified Customer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Main Block Canvas - Forest Green Background Environment */
.testimonials-section {
  width: 100%;
  background-color: #278e47; /* Saturated brand container green matching the picture exactly */
  padding: 80px 24px;
  box-sizing: border-box;
  text-align: center;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
}

/* Master Title Text Format */
.section-title {
  color: black;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 50px 0;
}

/* Fluid Flex/Grid Matrix for Three Columns Layout tracking */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* --- ✨ HOVER CARD LOGIC --- */
.testimonial-card {
  background-color: #dbe213; /* Signature lime-yellow token paint layout */
  border-radius: 16px;
  padding: 35px 30px;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Acceleration easing tracking formulas for state transforms */
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-8px); /* Smooth floating lift up */
  background-color: #e2eb15; /* Saturated highlight glowing lift */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); /* Deep soft depth expansion */
}

/* Micro Elements Styling */
.star-rating {
  color: red; /* Clean black outlined star clusters matching layout specification */
  font-size: 1.3rem;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.quote-text {
  font-size: 0.98rem;
  color: #111111;
  line-height: 1.7;
  font-weight: 500;
  margin: 0 0 30px 0;
  text-align: left;
}

/* Footer Section Grid layout */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid rgba(17, 17, 17, 0.08); /* Clean interior separating boundary line */
  padding-top: 15px;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111111;
  margin: 0 0 2px 0;
}

.author-role {
  font-size: 0.8rem;
  color: #444444;
  font-weight: 600;
}

/* Verified Badge Scale-Spin Trigger Mechanics */
.verified-badge {
  color: #278e47; /* Contrasting background green vector tracking color matching badge context */
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.testimonial-card:hover .verified-badge {
  transform: scale(1.2) rotate(5deg); /* Slight overshoot pop and rotate upon card active state */
}

.check-icon {
  width: 100%;
  height: 100%;
}

/* --- 📱 RESPONSIVE MEDIA SCALE BREAKPOINTS --- */
@media (max-width: 768px) {
  .testimonials-section {
    padding: 60px 16px;
  }

  .section-title {
    font-size: 1.7rem;
    margin-bottom: 35px;
  }

  .cards-grid {
    grid-template-columns: 1fr; /* Force stack onto a streamlined grid line channel column */
    gap: 20px;
  }

  .testimonial-card {
    padding: 25px 20px;
  }
}
</style>