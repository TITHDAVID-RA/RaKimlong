<script setup lang="ts">
import { ref } from 'vue'

// Form State Management
const rating = ref<number>(0)
const hoverRating = ref<number>(0)
const name = ref<string>('')
const phoneNumber = ref<string>('')
const reviewText = ref<string>('')

// Handle rating click selection
const setRating = (starValue: number) => {
  rating.value = starValue
}

// Handle form submission
const handleSubmit = () => {
  if (rating.value === 0) {
    alert('សូមជ្រើសរើសផ្កាយវាយតម្លៃ! (Please select a star rating!)')
    return
  }
  
  const payload = {
    rating: rating.value,
    name: name.value,
    phoneNumber: phoneNumber.value,
    review: reviewText.value
  }
  
  console.log('Submitting Review Data:', payload)
  alert('សូមអរគុណសម្រាប់ការចែករំលែកបទពិសោធន៍របស់អ្នក! (Thank you for your review!)')
  
  // Reset form inputs after success
  rating.value = 0
  name.value = ''
  phoneNumber.value = ''
  reviewText.value = ''
}
</script>

<template>
  <section class="review-section">
    <!-- Header Block -->
    <div class="review-header">
      <p class="header">ចែករំលែកបទពិសោធន៍របស់អ្នក</p>
      <p class="sub-text">
        ប្រាប់យើងនូវអ្វីដែលយើងគួរកែលម្អនិង<br />
        គុណភាពរបស់ផលិតផលរបស់យើង
      </p>
    </div>

    <!-- Form Main Content Box -->
    <div class="form-card">
      <form @submit.prevent="handleSubmit">
        
        <!-- Interactive Star Rating Block -->
        <div class="rating-group">
          <label class="group-label">ការវាយតម្លៃ (STAR RATING)</label>
          <div class="star-container">
            <span 
              v-for="star in 5" 
              :key="star"
              class="star-icon"
              :class="{ 'filled': star <= (hoverRating || rating) }"
              @click="setRating(star)"
              @mouseenter="hoverRating = star"
              @mouseleave="hoverRating = 0"
            >
              ★
            </span>
          </div>
        </div>

        <!-- Dynamic User Identity Fields (Responsive Grid) -->
        <div class="form-row">
          <div class="input-group">
            <label class="group-label">ឈ្មោះ(Name)</label>
            <input 
              v-model="name"
              type="text" 
              placeholder="ឈ្មោះរបស់អ្នក" 
              required
            />
          </div>
          
          <div class="input-group">
            <label class="group-label">លេខទូរស័ព្ទ(Phone Number)</label>
            <input 
              v-model="phoneNumber"
              type="tel" 
              placeholder="លេខទូរស័ព្ទ" 
              required
            />
          </div>
        </div>

        <!-- Long Text Area Review Block -->
        <div class="input-group full-width">
          <label class="group-label">មតិរបស់អ្នក (Your Review)</label>
          <textarea 
            v-model="reviewText"
            placeholder="ពិពណ៌នាអំពីបទពិសោធន៍របស់អ្នក.............." 
            rows="6"
            required
          ></textarea>
        </div>

        <!-- Submission Trigger Action -->
        <button type="submit" class="submit-btn">
          ការវាយតម្លៃ (Submit Review)
        </button>

      </form>
    </div>
  </section>
</template>

<style scoped>
/* Main Background Alignment to match your site layout theme */
.review-section {
  width: 100%;
  background-color: #fcf9f6; /* Matching cream background */
  padding: 80px 20px;
  box-sizing: border-box;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header Text Layout */
.review-header {
  text-align: center;
  margin-bottom: 40px;
}

.review-header h2 {
  font-size: 2.2rem;
  color: #000000;
  margin: 0 0 15px 0;
  font-weight: 700;
}

.sub-text {
  font-size: 1.1rem;
  color: #111111;
  line-height: 1.6;
  font-weight: 500;
}

/* Form Container Floating Layer */
.form-card {
  width: 100%;
  max-width: 760px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 45px;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}

/* Labels */
.group-label {
  display: block;
  font-size: 1.05rem;
  font-weight: 600;
  color: #111111;
  margin-bottom: 10px;
  text-align: left;
}

/* --- 🌟 STAR RATING LOGIC & STYLES --- */
.rating-group {
  margin-bottom: 25px;
  text-align: left;
}

.star-container {
  display: flex;
  gap: 4px;
}

.star-icon {
  font-size: 2rem;
  cursor: pointer;
  color: #ffffff; /* Base internal color (empty) */
  -webkit-text-stroke: 1.5px #111111; /* Clean precise black strokes matching graphic */
  text-stroke: 1.5px gold;
  user-select: none;
  transition: transform 0.15s ease, color 0.15s ease;
}

.star-icon:hover {
  transform: scale(1.15);
}

/* Active Highlight Filling States */
.star-icon.filled {
  color: gold; /* Completely fills with charcoal black when active or hovered */
}

/* --- 📝 GRID FIELDS SYSTEM --- */
.form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 25px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.full-width {
  width: 100%;
  margin-bottom: 35px;
}

/* Form Controls Formatting */
input[type="text"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 12px 18px;
  background-color: #fdfaf7; /* Warm internal field colors */
  border: 1px solid #e0dacb;
  border-radius: 12px; /* Smooth curved corner lines */
  font-size: 0.95rem;
  color: #222222;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
}

/* Match the soft placeholder text formatting from image */
::placeholder {
  color: #aaa49a;
  font-size: 0.85rem;
}

textarea {
  resize: vertical;
}

/* --- 🟢 SUBMIT ACTION HOVER BUTTON --- */
.submit-btn {
  background-color: #278e47; /* Saturated organic green shade from the banner specifications */
  color: #ffffff;
  border: none;
  border-radius: 30px; /* Fully pill-curved execution matches image button exactly */
  padding: 14px 40px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 440px;
  display: block;
  margin: 0 auto;
  transition: background-color 0.2s transform 0.2s;
}

.submit-btn:hover {
  background-color: #1e7236;
}

.submit-btn:active {
  transform: scale(0.99);
}

/* --- 📱 HIGH FIDELITY RESPONSIVE GRAPHICS ENGINE --- */
@media (max-width: 768px) {
  .review-section {
    padding: 50px 16px;
  }

  .review-header h2 {
    font-size: 1.7rem;
  }

  .form-card {
    padding: 24px 20px;
  }

  .form-row {
    flex-direction: column; /* Collapses adjacent side-by-side fields onto mobile stacking grids */
    gap: 20px;
  }
  
  .submit-btn {
    max-width: 100%; /* Spans full widths across telephone panels safely */
  }
}
</style>