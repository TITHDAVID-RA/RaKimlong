<script setup lang="ts">
// Import the main brand logo asset
import logoPic from '../assets/image/LOGO.jpg'

// Import compliance logos (Place your extracted files into assets)
import cert1 from '../assets/image/photo_1_2026-07-10_16-37-17.jpg'
import cert2 from '../assets/image/photo_2_2026-07-10_16-37-17.jpg'
import cert3 from '../assets/image/photo_3_2026-07-10_16-37-17.jpg'
import cert4 from '../assets/image/photo_4_2026-07-10_16-37-17.jpg'
import cert5 from '../assets/image/photo_5_2026-07-10_16-37-17.jpg'
import cert6 from '../assets/image/photo_6_2026-07-10_16-37-17.jpg'
import cert7 from '../assets/image/photo_7_2026-07-10_16-37-17.jpg'

// Import payment gateways
import visa from '../assets/image/visa-1.jpg'
import mastercard from '../assets/image/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg'
import unionpay from '../assets/image/UnionPay_logo.svg.webp'
import wing from '../assets/image/oW42OTEcgNgP2WDuDnO38N1bnVQcAeYm7TnLJlxF0OE.avif'
import aba from '../assets/image/unnamed.png'
import khqr from '../assets/image/KHQR-available-here-logo-with-bg.webp'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToStock(locationName: any) {
  router.push({ name: 'StockStatus', query: { store: locationName } })
}
</script>

<template>
  <footer class="main-footer">
    <!-- Top Block: Brand Directory (Yellow Base) -->
    <div class="footer-top">
      <div class="footer-container">
        
        <!-- Column 1: Brand Identifier Logo -->
        <div class="footer-col brand-col">
          <div class="brand-logo-card">
            <img :src="logoPic" alt="Elephant Brand" class="brand-logo-img" />
          </div>
        </div>

        <!-- Column 2: Retailer Outlets Directory -->
<div class="footer-col partners-col">
  <h3 class="directory-title">អ្នកទាំងអស់គ្នាអាចស្វែងរកទិញនៅតាម</h3>
  <div class="bullet-grid">
    <ul class="bullet-list">
      <!-- 🟢 Added click handlers passing the location name -->
      <li class="clickable-location" @click="goToStock('ម៉ាតមីនីម៉ាត')">ម៉ាតមីនីម៉ាត</li>
      <li class="clickable-location" @click="goToStock('Cambodia Super Store')">Cambodia Super Store</li>
      <li class="clickable-location" @click="goToStock('ព្រលានយន្តហោះ')">ព្រលានយន្តហោះ</li>
    </ul>
    <ul class="bullet-list">
      <li class="clickable-location" @click="goToStock('ជីបម៉ុង')">ជីបម៉ុង</li>
      <li class="clickable-location" @click="goToStock('តេឡា ខេមបូឌា')">តេឡា ខេមបូឌា</li>
      <li class="clickable-location" @click="goToStock('Super Store Phnom Penh')">Super Store Phnom Penh</li>
    </ul>
  </div>
  
  <!-- Certification Badges Sub-row remains unchanged -->
  <div class="certifications-row">
    <img :src="cert1" alt="Certification 1" />
    <img :src="cert2" alt="Certification 2" />
    <img :src="cert3" alt="Certification 3" />
    <img :src="cert4" alt="Certification 4" />
    <img :src="cert5" alt="Certification 5" />
    <img :src="cert6" alt="Halal Certification" />
    <img :src="cert7" alt="Buy Cambodian Certification" />
  </div>
</div>

        <!-- Column 3: Social Follow Channels -->
<div class="footer-col social-col">
    <h3 class="col-heading">FOLLOW US</h3>
    <ul class="contact-links">
      <li>
        <a href="https://facebook.com" target="_blank" rel="noopener" class="link-item">
          <!-- 🟢 Real Facebook SVG Icon -->
          <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
          Facebook
        </a>
      </li>
      <li>
        <a href="https://t.me" target="_blank" rel="noopener" class="link-item">
          <!-- 🟢 Real Telegram SVG Icon -->
          <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.7-2.46 2.75-2.67.01-.03.01-.14-.06-.2-.07-.06-.17-.04-.25-.02-.11.02-1.83 1.16-5.16 3.42-.49.34-.93.51-1.33.5-.44-.01-1.3-.25-1.93-.46-.78-.25-1.4-.39-1.35-.83.03-.23.35-.46.97-.71 3.8-1.65 6.34-2.74 7.61-3.25 3.63-1.48 4.38-1.74 4.87-1.75.11 0 .35.03.5.15.13.1.17.24.18.34.02.09.01.27-.01.4z"/>
          </svg>
          Telegram
        </a>
      </li>
      <li>
        <a href="https://youtube.com" target="_blank" rel="noopener" class="link-item">
          <!-- 🟢 Real Youtube SVG Icon -->
          <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Youtube
        </a>
      </li>
    </ul>
  </div>

  <!-- Column 4: Customer Relations Desk -->
  <div class="footer-col contact-col">
    <h3 class="col-heading">CONTACT US</h3>
    <ul class="contact-links">
      <li>
        <a href="tel:095737519" class="link-item">
          <!-- 🟢 Phone Outline SVG Icon -->
          <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          095 737 519
        </a>
      </li>
      <li>
        <a href="mailto:rakimlong@gmail.com" class="link-item">
          <!-- 🟢 Mail Outline SVG Icon -->
          <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          rakimlong@gmail.com
        </a>
      </li>
      <li class="link-item raw-text">
        <!-- 🟢 Clock/Time Outline SVG Icon -->
        <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        8AM-6PM
      </li>
    </ul>
  </div>

      </div>
    </div>

    <!-- Bottom Block: Compliance Slogan & Payment Strip (Green Base) -->
    <div class="footer-bottom">
      <div class="footer-container bottom-flex">
        <p class="slogan-text">ញ៉ាំតែជំនួយសុខភាព មិនមែនធ្វើអោយខូចសុខភាពនោះទេ</p>
        
        <!-- Payment Partners Aggregator Icons -->
        <div class="payment-row">
          <img :src="visa" alt="Visa" />
          <img :src="mastercard" alt="Mastercard" />
          <img :src="unionpay" alt="UnionPay" />
          <img :src="wing" alt="Wing Bank" />
          <img :src="aba" alt="ABA Bank" />
          <img :src="khqr" alt="KHQR standard payment" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.link-item {
  display: inline-flex;
  align-items: center;
  gap: 10px; /* Even spacing between icon and labels */
  text-decoration: none;
  transition: opacity 0.2s ease;
}

/* Base icon structural constraints */
.brand-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}

/* Match colors automatically to link states */
.link-item svg {
  color: inherit; 
}

.clickable-location {
  cursor: pointer;
  transition: color 0.2s ease;
}
.clickable-location:hover {
  color: #22c55e; /* Changes to green on hover */
  text-decoration: underline;
}
/* Master Structuring Base Rules */
.main-footer {
padding-top: 40px;
  width: 100%;
  font-family: 'Kantumruuy Pro', 'Khmer OS Battambang', system-ui, sans-serif;
  box-sizing: border-box;
}

.footer-container {
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  box-sizing: border-box;
}

/* --- 💛 TOP PANEL SECTION (YELLOW DESIGN) --- */
.footer-top {
  background-color: #f7e61c; /* Solid layout yellow match from image */
  padding: 50px 0;
  color: #000000;
}

.footer-col {
  flex: 1;
  min-width: 220px;
  text-align: left;
}

/* Brand Logo Layout */
.brand-col {
  max-width: 300px;
}

.brand-logo-card {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.brand-logo-img {
  width: 100%;
  display: block;
  object-fit: contain;
}

/* Outlets Directory Logic */
.partners-col {
  flex: 2;
  min-width: 320px;
}

.directory-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-align: center;
}

.bullet-grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.bullet-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.bullet-list li {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 12px;
  position: relative;
  padding-left: 18px;
}

.bullet-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #000000;
  font-size: 1.2rem;
}

/* Certification Icons Styling */
.certifications-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

.certifications-row img {
  height: 60px;
  width: 60px;
  background-color: #ffffff;
  border-radius: 6px;
  object-fit: contain;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Link Columns Configuration */
.col-heading {
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  letter-spacing: 0.5px;
}

.contact-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-links li {
  margin-bottom: 16px;
}

.link-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* Link Hover Interactions */
a.link-item:hover {
  transform: translateX(4px);
  opacity: 0.8;
}

.raw-text {
  cursor: default;
  font-weight: 600;
  font-size: 1.05rem;
}

.icon {
  font-size: 1.2rem;
  display: inline-block;
}

/* --- 💚 BOTTOM PANEL SECTION (GREEN DESIGN) --- */
.footer-bottom {
  background-color: #278e47; /* Saturated organic brand green match */
  padding: 20px 0;
  color: #ffffff;
}

.bottom-flex {
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.slogan-text {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.3px;
}

/* Payment Badges Strip Formatting */
.payment-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.payment-row img {
  height: 35px;
  width: auto;
  object-fit: contain;
  border-radius: 4px;
  transition: transform 0.2s ease;
}

.payment-row img:hover {
  transform: scale(1.1); /* Pop zoom interaction on micro payment tokens */
}

/* --- 📱 RESPONSIVE BREAKPOINTS ENGINE --- */
@media (max-width: 992px) {
  .footer-top {
    padding: 40px 0;
  }
  
  .bottom-flex {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 35px;
  }

  .footer-col {
    width: 100% !important;
    max-width: 100% !important;
    text-align: center;
  }

  .directory-title, .col-heading {
    text-align: center;
    margin-bottom: 15px;
  }

  .bullet-grid {
    max-width: 400px;
    margin: 0 auto 20px auto;
  }

  .bullet-list li {
    text-align: left;
  }

  .certifications-row, .payment-row {
    justify-content: center;
  }

  .brand-logo-card {
    max-width: 160px;
    margin: 0 auto;
  }

  .link-item {
    justify-content: center;
    width: 100%;
  }
  
  .slogan-text {
    font-size: 1rem;
  }
}
</style>