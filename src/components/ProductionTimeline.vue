<script setup>
import { ref } from 'vue'

// Import your 6 process snapshots here
import step1Img from '/public/image/photo_2026-07-10_15-25-28.jpg'
import step2Img from '/public/image/photo_5_2026-07-10_15-19-50.jpg'
import step3Img from '/public/image/photo_4_2026-07-10_15-19-50.jpg'
import step4Img from '/public/image/photo_3_2026-07-10_15-19-50.jpg'
import step5Img from '/public/image/photo_1_2026-07-10_15-19-50.jpg'
import step6Img from '/public/image/photo_2_2026-07-10_15-19-50.jpg'

const steps = ref([
  {
    id: '១',
    title: 'កសិករប្រមូលផលផ្លែទៀបបារាំង',
    description: 'ដោយក្រុមហ៊ុនបានប្រមូលទិញផ្លែទៀបបារាំងតាមចម្ការរបស់ប្រជាពលរដ្ឋខ្មែរយើងដោយយើងមិនទិញពីក្រៅប្រទេស',
    image: step1Img,
    side: 'right'
  },
  {
    id: '២',
    title: 'លាងសម្អាតផ្លែទៀបបារាំង',
    description: 'យើងលាងសម្អាតផ្លែទៀបបារាំងដែលបានប្រមូលទិញមកដើម្បីអនាម័យដល់អ្នកពិសា',
    image: step2Img,
    side: 'left'
  },
  {
    id: '៣',
    title: 'កាត់ផ្លែទៀបបារាំង',
    description: 'យើងបានយកផ្លែទៀបបារាំងដែលលាងរួចមកកាត់ជាកង់ៗ',
    image: step3Img,
    side: 'right'
  },
  {
    id: '៤',
    title: 'ការចាក់គ្រាប់ផ្លែទៀបបារាំងចេញ',
    description: 'យើងយកផ្លែទៀបបារាំងដែលកាត់រួចមកចាក់គ្រាប់ចេញដោយដៃ',
    image: step4Img,
    side: 'left'
  },
  {
    id: '៥',
    title: 'ការសម្ងួតសាច់ផ្លែទៀបបារាំង',
    description: 'យើងយកផ្លែទៀបបារាំងដែលបានចាក់គ្រាប់រួចមកដាក់ចូលម៉ាស៊ីនកម្ដៅ សម្ងួតអោយទៅជាសាច់តែនៅក្រោមសីតុណ្ហភាព ១០០ អង្សារ',
    image: step5Img,
    side: 'right'
  },
  {
    id: '៦',
    title: 'ការវិចខ្ចប់',
    description: 'យើងយកផ្លែទៀបបារាំងដែលសម្ងួតរួចរាល់មកចាក់ចូលតែការវិចខ្ចប់ទៅតាមទំហំកញ្ចប់',
    image: step6Img,
    side: 'left'
  }
])
</script>

<template>
  <section class="timeline-section">
    
    <div class="timeline-header">
      <p class="header">៦ ជំហានរបស់តែទៀបបារាំង</p>
      <p class="company-sub">ផលិតផលរបស់ក្រុមហ៊ុន rakimlong co., ltd. ( elephant brand )</p>
      <p class="heritage-tag">គឺជាផលិតផលខ្មែរពិតៗនិងផលិតឡើងដោយស្នាដៃកូនខ្មែរ</p>
    </div>

    <div class="timeline-wrapper">
      <div class="center-line"></div>

      <div 
        v-for="step in steps" 
        :key="step.id" 
        :class="['timeline-item', step.side === 'left' ? 'image-left' : 'image-right']"
      >
        
        <div class="content-block">
          <div class="card-interactive">
            <div class="title-row">
              <div class="badge-number">{{ step.id }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
            </div>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>

        <div class="timeline-node"></div>

        <div class="image-block">
          <div class="img-frame">
            <img :src="step.image" :alt="step.title" class="zoom-image" />
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<style scoped>
/* Base Theme Canvas Setup */
.timeline-section {
  width: 100%;
  background-color: #EEF8F3;
  padding: 80px 20px;
  box-sizing: border-box;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
  overflow-x: hidden; /* Avoids minor layout breaking animations on tiny devices */
}

.timeline-header {
  text-align: center;
  margin-bottom: 80px;
}

.timeline-header h2 {
  font-size: 2.4rem;
  color: #111;
  margin: 0 0 12px 0;
  font-weight: 700;
}

.company-sub {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 0 0 8px 0;
}

.heritage-tag {
  font-size: 1rem;
  color: #166534;
  font-weight: 600;
  margin: 0;
}

/* Timeline Base Tracks */
.timeline-wrapper {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
}

.center-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e2e8f0;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  position: relative;
  z-index: 2;
  width: 100%;
}

.content-block, .image-block {
  width: 50%;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* --- ✨ HOVER ANIMATION LOGIC --- */

/* 1. Content block slide-and-glow card hover */
.card-interactive {
  padding: 20px;
  border-radius: 16px;
  background-color: transparent;
  transition: all 0.3s ease;
}

.timeline-item:hover .card-interactive {
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(22, 163, 74, 0.08);
}

.image-right:hover .card-interactive {
  transform: translateX(-8px); /* Subtle shift towards the center line */
}

.image-left:hover .card-interactive {
  transform: translateX(8px);
}

/* 2. Image scale-zoom on row hover */
.img-frame {
  width: 100%;
  max-width: 440px;
  height: 280px;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
  display: inline-block;
  background-color: #e2e8f0;
}

.zoom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item:hover .zoom-image {
  transform: scale(1.06); /* Clean image magnifying zoom effect */
}

/* 3. Pulsing Center tracking nodes on hover */
.timeline-node {
  position: absolute;
  left: 50%;
  width: 14px;
  height: 14px;
  background-color: #16a34a;
  border-radius: 50%;
  transform: translateX(-50%);
  border: 4px solid #fcf9f6;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-node {
  background-color: #15803d;
  width: 18px;
  height: 18px;
  box-shadow: 0 0 0 6px rgba(22, 163, 74, 0.2); /* Soft green radar glow ring */
}

/* Left / Right Structural Positions */
.image-right .content-block {
  padding-right: 60px;
  text-align: right;
}
.image-right .title-row {
  justify-content: flex-end;
}
.image-right .image-block {
  padding-left: 60px;
}

.image-left .content-block {
  padding-left: 60px;
  order: 2;
  text-align: left;
}
.image-left .title-row {
  justify-content: flex-start;
}
.image-left .image-block {
  padding-right: 60px;
  order: 1;
}

/* Text Element Design */
.title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.badge-number {
  width: 36px;
  height: 36px;
  background-color: #16a34a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.step-description {
  font-size: 0.98rem;
  color: #4b5563;
  line-height: 1.6;
  max-width: 460px;
  display: inline-block;
}

/* --- 📱 RESPONSIVE BREAKPOINTS ENGINE --- */

/* Tablet Optimization Layout (under 1024px) */
@media (max-width: 1024px) {
  .image-right .content-block { padding-right: 30px; }
  .image-right .image-block { padding-left: 30px; }
  .image-left .content-block { padding-left: 30px; }
  .image-left .image-block { padding-right: 30px; }
  
  .img-frame {
    height: 240px;
    border-radius: 30px;
  }
}

/* Complete Mobile Adaptation (under 768px) */
@media (max-width: 768px) {
  .timeline-section {
    padding: 50px 16px;
  }

  .timeline-header h2 {
    font-size: 1.8rem;
  }

  .center-line {
    left: 18px; /* Shifts tracking guide line seamlessly to the left side margins */
    transform: none;
  }

  .timeline-item {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 45px;
    margin-bottom: 45px;
    gap: 12px;
  }

  .content-block, .image-block {
    width: 100% !important;
    text-align: left !important;
    padding: 0 !important;
    order: unset !important;
  }

  .card-interactive {
    padding: 0;
  }

  .image-right:hover .card-interactive,
  .image-left:hover .card-interactive {
    transform: translateY(-2px); /* Swaps side animation shifts to upward drift on mobile screens */
  }

  .image-right .title-row {
    justify-content: flex-start;
  }

  .timeline-node {
    left: 18px;
    top: 18px;
    transform: translateX(-50%);
  }

  .img-frame {
    max-width: 100%;
    height: 210px;
    border-radius: 20px;
  }
}
</style>