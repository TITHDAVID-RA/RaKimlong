<script setup>
// Pure presentation component, no extra logic needed!
</script>

<template>
  <div class="feature-banner">
    <div class="feature-container">
      
      <div class="feature-item">
        <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"></path>
          <path d="M19 2c-2.26 4.33-5.27 7.14-8 10"></path>
        </svg>
        <span class="feature-text">ទៀបបារាំងធម្មជាតិ</span>
      </div>

      <div class="feature-item">
        <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z"></path>
          <path d="M13 7l-4 5h3l-1 5l4-5h-3z"></path>
        </svg>
        <div class="feature-text-group">
          <span>គ្មានផ្ទុកសារធាតុដែល</span>
          <span>ប៉ះពាល់សុខភាព</span>
        </div>
      </div>

      <div class="feature-item">
        <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 12l-1 1.01M13 10l-1 1M16 8l-1 1"></path>
          <path d="M18 10a5.5 5.5 0 0 0-8-7.58L4.42 8.05a5.5 5.5 0 0 0 7.78 7.78l1.5-1.5"></path>
          <path d="M6 14.74a5.5 5.5 0 0 0 7.78 7.78l5.59-5.59a5.5 5.5 0 0 0-7.78-7.78l-1.5 1.5"></path>
        </svg>
        <span class="feature-text">១០០% ផលិតផលខ្មែរ</span>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Main Banner Wrapper */
.feature-banner {
  width: 100%;
  margin: 20px auto;
  /* Top-left and bottom-right have severe rounding to mimic your graphic perfectly */
  border-radius: 24px 0px 24px 0px; 
  background-color: #fcf113; /* Bright golden yellow hue */
  padding: 24px 40px;
  box-sizing: border-box;
}

/* Flex Container Layout */
.feature-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

/* Individual Feature Segments */
.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1a1a1a; /* Very dark charcoal gray/black for crisp contrast */
}

/* Vector Graphics Sizing */
.feature-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

/* Text Element Styling (With Khmer Font support) */
.feature-text {
  font-size: 1.15rem;
  font-weight: 600;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
  white-space: nowrap;
}

/* Special Stacked Layout for the center item */
.feature-text-group {
  display: flex;
  flex-direction: column;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.25;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
  text-align: left;
}

/* Responsive Scaling for Tablets and Mobile Screens */
@media (max-width: 768px) {
  .feature-banner {
    border-radius: 16px; /* Uniform curves look cleaner on smaller displays */
    padding: 20px;
  }
  
  .feature-container {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 15%; /* Centers the stacked items nicely on phone columns */
    gap: 20px;
  }
}
</style>