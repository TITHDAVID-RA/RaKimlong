<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../store/cart.js'

const router = useRouter()
const { cart, removeFromCart } = useCart()

// Payment Method Toggle ('khqr' or 'card')
const paymentMethod = ref('khqr')

// 🔍 ORDER ID LOOKUP & STATUS TRACKER STATE
const orderSearchQuery = ref('')
const searchedOrderResult = ref(null)
const searchErrorMessage = ref('')

// 🆕 NEW: CHECKOUT SUCCESS BANNER STATE
const checkoutSuccessResult = ref(null) 

const currentActiveStep = computed(() => {
  if (searchedOrderResult.value) {
    return searchedOrderResult.value.statusStep
  }
  return 1 
})

// Mock Database (Reactive array to store past and brand-new simulated orders)
const mockOrdersDatabase = ref([
  {
    id: 'RKL-9841',
    statusStep: 2, 
    date: '2026-07-10',
    items: [{ title: 'Kampot Pepper Infusion', variant: 'Standard', quantity: 2, price: 6.50 }],
    total: 15.00
  },
  {
    id: 'RKL-1234',
    statusStep: 3,
    date: '2026-07-11',
    items: [
      { title: 'Palm Sugar Jasmine Tea', variant: 'Premium', quantity: 1, price: 8.00 },
      { title: 'Ginger Honey Extract', variant: 'Standard', quantity: 2, price: 5.00 }
    ],
    total: 20.00
  }
])

// Shipping Form State
const form = ref({
  firstName: '', lastName: '', gender: '', cityProvince: '',
  districtKhan: '', communeSangkat: '', houseNumber: '', streetNumber: '', phoneNumber: ''
})

// Credit Card Form State
const cardForm = ref({
  holderName: '', cardNumber: '', expiry: '', cvv: ''
})

// Dynamic Store Calculations
const shippingFee = ref(2.00)
const discount = ref(0.00)

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const total = computed(() => {
  return cart.value.length > 0 ? (subtotal.value + shippingFee.value - discount.value) : 0
})

// --- FILE MANAGERS ---
const qrReceipt = ref(null)
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) qrReceipt.value = URL.createObjectURL(file)
}

const merchantQrImage = ref('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TithdavidRaShopPaymentGatewayToken')
const handleMerchantQrUpload = (event) => {
  const file = event.target.files[0]
  if (file) merchantQrImage.value = URL.createObjectURL(file)
}

// 🔍 TRACKING LOGIC CONTROLLER ACTION
function handleOrderLookup() {
  searchErrorMessage.value = ''
  searchedOrderResult.value = null
  checkoutSuccessResult.value = null // Close success box if they manually search

  if (!orderSearchQuery.value.trim()) {
    searchErrorMessage.value = 'សូមវាយបញ្ចូលលេខកូដកម្មង់! (Please enter an Order ID)'
    return
  }

  const foundOrder = mockOrdersDatabase.value.find(
    order => order.id.toUpperCase() === orderSearchQuery.value.trim().toUpperCase()
  )

  if (foundOrder) {
    searchedOrderResult.value = foundOrder
  } else {
    searchErrorMessage.value = 'រកមិនឃើញលេខកូដកម្មង់នេះទេ (Order ID not found. Try RKL-9841)'
  }
}

// 🆕 HELPER: Generate a Random Order ID
function generateRandomOrderID() {
  const randomNumbers = Math.floor(1000 + Math.random() * 9000)
  return `RKL-${randomNumbers}`
}

// 🚀 PROCESS PAYMENT (WITHOUT POPUP ALERTS)
function processPayment() {
  if (cart.value.length === 0) return
  
  if (paymentMethod.value === 'card') {
    if (!cardForm.value.cardNumber || !cardForm.value.holderName) {
      searchErrorMessage.value = 'សូមបំពេញព័ត៌មានកាតរបស់អ្នក! (Please complete your card details)'
      return
    }
  } else {
    if (!qrReceipt.value) {
      searchErrorMessage.value = 'សូមបញ្ជូនរូបភាពវិក្កយបត្រផ្ទេរប្រាក់! (Please upload your transfer receipt)'
      return
    }
  }
  
  const newOrderID = generateRandomOrderID()
  const currentItemsCloned = JSON.parse(JSON.stringify(cart.value))
  const finalPaidAmount = total.value

  const newOrderPayload = {
    id: newOrderID,
    statusStep: 1, // Phase 1: Preparing Order
    date: new Date().toISOString().split('T')[0],
    items: currentItemsCloned,
    total: finalPaidAmount
  }

  // 1. Commit payload inside our local tracking index
  mockOrdersDatabase.value.push(newOrderPayload)

  // 2. Load payload into UI success preview screen
  checkoutSuccessResult.value = newOrderPayload

  // 3. Clear shopping cart store if method exists (or simulate by wiping state items)
  // cart.value = [] (Uncomment if utilizing internal direct state control)
}

// Quick action link to auto-inject tracking status fields
function quickTrackNewOrder(id) {
  orderSearchQuery.value = id
  handleOrderLookup()
}
</script>

<template>
  <div class="cart-page-bg">
    <div class="cart-container">
      
      <!-- 🔍 MODULE 1: ORDER LOOKUP CONTROL STRIP -->
<div class="order-search-section">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            v-model="orderSearchQuery" 
            placeholder="Search Order ID... (e.g., RKL-9841)" 
            @keyup.enter="handleOrderLookup"
            class="order-search-input"
          />
          <button class="order-search-btn" @click="handleOrderLookup">
            🔍 ស្វែងរកការកម្មង់ (Track)
          </button>
        </div>
        <p v-if="searchErrorMessage" class="search-error-text">{{ searchErrorMessage }}</p>
      </div>

      <!-- 🟢 MODULE 2: STEP PROGRESS TRACKER -->
      <div class="progress-tracker-container">
        <div class="progress-track-bg">
          <div 
            class="progress-track-fill" 
            :style="{ width: currentActiveStep === 1 ? '0%' : currentActiveStep === 2 ? '50%' : '100%' }"
          ></div>
        </div>
        
        <div class="steps-row">
          <div class="step-item" :class="{ active: currentActiveStep >= 1 }">
            <div class="step-indicator"><span class="step-number">1</span></div>
            <div class="step-label-group">
              <span class="step-title-km">ខាងហាងកំពុងរៀបចំ</span>
              <span class="step-title-en">Preparing Order</span>
            </div>
          </div>
          <div class="step-item" :class="{ active: currentActiveStep >= 2 }">
            <div class="step-indicator"><span class="step-number">2</span></div>
            <div class="step-label-group">
              <span class="step-title-km">អ្នកដឹកជញ្ជូនដឹកចេញ</span>
              <span class="step-title-en">On The Way</span>
            </div>
          </div>
          <div class="step-item" :class="{ active: currentActiveStep >= 3 }">
            <div class="step-indicator"><span class="step-number">3</span></div>
            <div class="step-label-group">
              <span class="step-title-km">មកដល់</span>
              <span class="step-title-en">Arrived</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 🆕 MODULE 3: ON-SCREEN SUCCESS RECEIPT BOARD (Replaces old browser window alert) -->
      <div v-if="checkoutSuccessResult" class="success-receipt-card animate-pop">
        <div class="success-icon-badge">🎉</div>
        <h2 class="success-headline">ការបញ្ជាទិញទទួលបានជោគជ័យ!</h2>
        <p class="success-subline">Thank you for your purchase. Your order is processing smoothly.</p>
        
        <div class="generated-id-box">
          <span class="id-title">លេខកូដកម្មង់របស់អ្នក (YOUR ORDER ID)</span>
          <strong class="id-value">{{ checkoutSuccessResult.id }}</strong>
        </div>

        <div class="receipt-summary-block">
          <div class="receipt-row-item header-row"><span>Item Detail</span><span>Total Price</span></div>
          <div v-for="(item, idx) in checkoutSuccessResult.items" :key="idx" class="receipt-row-item">
            <span>{{ item.title }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="receipt-total-row">
            <span>Total Amount Paid:</span>
            <strong>${{ checkoutSuccessResult.total.toFixed(2) }}</strong>
          </div>
        </div>

        <div class="receipt-actions-group">
          <button class="action-btn track-now-btn" @click="quickTrackNewOrder(checkoutSuccessResult.id)">
            🚚 តាមដានការដឹកជញ្ជូនឥឡូវនេះ (Track Progress)
          </button>
          <button class="action-btn return-home-btn" @click="checkoutSuccessResult = null">
            Continue Shopping
          </button>
        </div>
      </div>

      <!-- MODULE 4: SEARCH LOOKUP ITEM RESULTS (OVERLAY MODE) -->
      <div v-else-if="searchedOrderResult" class="order-result-card animate-pop">
        <div class="result-header">
          <h3>📦 Order Found: {{ searchedOrderResult.id }}</h3>
          <span class="order-date">Date: {{ searchedOrderResult.date }}</span>
        </div>
        <div class="result-body">
          <div v-for="(item, i) in searchedOrderResult.items" :key="i" class="result-item-row">
            <span>{{ item.title }} <strong>({{ item.variant }})</strong> x{{ item.quantity }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="result-total">
            <span>Total Paid:</span>
            <strong>${{ searchedOrderResult.total.toFixed(2) }}</strong>
          </div>
        </div>
        <button class="clear-search-btn" @click="searchedOrderResult = null; orderSearchQuery = ''">
          Close Tracked View (បិទផ្ទាំងស្វែងរក)
        </button>
      </div>

      <div class="page-title-section">
        <h1 class="main-title">Your Cart (កន្ត្រករបស់អ្នក)</h1>
        <p class="subtitle-notice">សូមអ្នកទាំងអស់គ្នាបំពេញព័ត៌មានខាងក្រោមអោយបានត្រឹមត្រូវ</p>
      </div>

      <!-- MAIN CART APPLICATION GRID INTERFACE -->
      <div class="cart-grid" >
        
        <!-- LEFT COLUMN: KHMER EN SHIPMENT DIRECTORY FORM -->
        <div class="form-card">
          <div class="card-header form-header"><span class="header-icon">📍</span> ព័ត៌មានដឹកជញ្ជូន</div>
          <div class="form-body">
            <div class="input-row-twin">
              <div class="input-group">
                <label>First Name (ឈ្មោះ:)</label>
                <input type="text" v-model="form.firstName" />
              </div>
              <div class="input-group">
                <label>Last Name (នាមត្រកូល)</label>
                <input type="text" v-model="form.lastName" />
              </div>
            </div>
            
            <div class="input-group"><label>Gender (ភេទ)</label><input type="text" v-model="form.gender" /></div>
            <div class="input-group"><label>City/Province (ទីក្រុង/ខេត្ត)</label><input type="text" v-model="form.cityProvince" /></div>
            <div class="input-group"><label>District/Khan (ខណ្ឌ)</label><input type="text" v-model="form.districtKhan" /></div>
            <div class="input-group"><label>Commune/Sangkat (សង្កាត់)</label><input type="text" v-model="form.communeSangkat" /></div>
            
            <div class="input-row-twin">
              <div class="input-group"><label>House Number (លេខផ្ទះ:)</label><input type="text" v-model="form.houseNumber" /></div>
              <div class="input-group"><label>Street Number (លេខផ្លូវ)</label><input type="text" v-model="form.streetNumber" /></div>
            </div>
            
            <div class="input-group"><label>Phone Number (លេខទូរស័ព្ទ)</label><input type="tel" v-model="form.phoneNumber" /></div>
          </div>
        </div>

        <!-- RIGHT COLUMN: SHOPPING PREVIEW LIST & CONDITIONAL PAYMENTS -->
        <div class="summary-payment-column">
          
          <div class="summary-card">
            <div class="card-header summary-header"><span class="header-icon">🛍️</span> ការបញ្ជាទិញ</div>
            <div class="summary-body">
              <div v-if="cart.length === 0" class="empty-cart-msg">
                កន្ត្រករបស់អ្នកមិនទាន់មានទំនិញទេ (Your cart is empty)
                <button class="back-shop-btn" @click="router.push('/')">ទៅហាងទំនិញវិញ</button>
              </div>

              <div v-else class="cart-items-preview-list">
                <div v-for="(item, idx) in cart" :key="idx" class="preview-item-row">
                  <div class="item-meta">
                    <span class="item-name">{{ item.title }}</span>
                    <span class="item-variant">({{ item.variant }})</span>
                    <span class="item-qty">x{{ item.quantity }}</span>
                  </div>
                  <div class="item-pricing-action">
                    <span class="item-cost">${{ (item.price * item.quantity).toFixed(2) }}</span>
                    <button class="delete-item-btn" @click="removeFromCart(idx)">✕</button>
                  </div>
                </div>
              </div>

              <div class="pricing-divider"></div>
              <div class="financial-row"><span>Subtotal</span><span class="val">${{ subtotal.toFixed(2) }}</span></div>
              <div class="financial-row"><span>Shipping Fee</span><span class="val">${{ cart.length > 0 ? shippingFee.toFixed(2) : '0.00' }}</span></div>
              <div class="financial-row total-row"><span>Total</span><span class="val">${{ total.toFixed(2) }}</span></div>
            </div>
          </div>

          <!-- PAYMENT METHODS MULTI-TAB CONTROLS -->
          <div class="payment-method-selectors">
            <button :class="['method-tab', { active: paymentMethod === 'khqr' }]" @click="paymentMethod = 'khqr'">Scan KHQR</button>
            <button :class="['method-tab', { active: paymentMethod === 'card' }]" @click="paymentMethod = 'card'">Credit/Debit Card</button>
          </div>

          <!-- PAYMENT WINDOW SWITCH: SCAN OPTION -->
          <div v-if="paymentMethod === 'khqr'" class="khqr-card-wrapper">
            <div class="khqr-grid">
              
              <label class="receipt-upload-box">
                <input type="file" @change="handleFileUpload" accept="image/*" class="hidden-input" />
                <div class="upload-inner-prompt" v-if="!qrReceipt">
                  <span class="cloud-icon">📥</span>
                  <p class="khmer-prompt">ដាក់បញ្ចូលការផ្ទេរប្រាក់</p>
                  <p class="eng-prompt">Upload Receipt</p>
                </div>
                <img v-else :src="qrReceipt" alt="Receipt Preview" class="uploaded-receipt-img" />
              </label>

              <!-- INTERACTIVE MERCHANT QR BOX CONTAINER -->
              <div class="real-khqr-plate">
                <div class="khqr-brand-header"><span class="brand-text">KHQR</span></div>
                <div class="khqr-merchant-info"><span class="merchant-name">CHHAY CHENSIEVLY</span></div>
                
                <label class="qr-box-frame clickable-qr-trigger" title="Click to replace this QR picture">
                  <input type="file" @change="handleMerchantQrUpload" accept="image/*" class="hidden-input" />
                  <img :src="merchantQrImage" alt="Bakong KHQR" class="main-qr-code" />
                  <div class="bakong-center-logo"><div class="red-logo-dot"></div></div>
                  <div class="change-qr-overlay"><span>Change QR</span></div>
                </label>
                <!-- <p class="qr-helper-hint">Click QR Code to replace image</p> -->
              </div>

            </div>
          </div>

          <!-- PAYMENT WINDOW SWITCH: SECURE CARD OPTIONS -->
          <div v-else class="card-inputs-wrapper">
            <h3 class="payment-title">Secure Card Checkout</h3>
            <div class="card-form-grid">
              <div class="input-group text-left">
                <label>Cardholder Name (ឈ្មោះលើកាត)</label>
                <input type="text" v-model="cardForm.holderName" placeholder="JOHN DOE" />
              </div>
              <div class="input-group text-left">
                <label>Card Number (លេខកាត)</label>
                <input type="text" v-model="cardForm.cardNumber" placeholder="0000 0000 0000 0000" maxlength="19" />
              </div>
              <div class="input-row-twin">
                <div class="input-group text-left">
                  <label>Expiry Date</label>
                  <input type="text" v-model="cardForm.expiry" placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="input-group text-left">
                  <label>CVV / CVC</label>
                  <input type="password" v-model="cardForm.cvv" placeholder="123" maxlength="3" />
                </div>
              </div>
            </div>
          </div>

          <button :disabled="cart.length === 0" class="pay-submit-btn" @click="processPayment">
            Pay Now (${{ total.toFixed(2) }})
          </button>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- 🆕 SUCCESS RECEIPT CARD STYLING --- */
.success-receipt-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 30px;
  max-width: 600px;
  margin: 30px auto;
  text-align: center;
  border: 1px solid #e4e4e7;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
}

.success-icon-badge {
  font-size: 3.5rem;
  margin-bottom: 15px;
}

.success-headline {
  color: #16a34a;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 6px 0;
}

.success-subline {
  color: #71717a;
  font-size: 0.95rem;
  margin: 0 0 25px 0;
}

.generated-id-box {
  background-color: #f0fdf4;
  border: 2px dashed #22c55e;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.id-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #15803d;
  letter-spacing: 0.5px;
}

.id-value {
  font-size: 1.8rem;
  color: #111111;
  font-weight: 900;
  letter-spacing: 1px;
}

.receipt-summary-block {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  background-color: #fafafa;
  padding: 16px;
  margin-bottom: 25px;
  text-align: left;
}

.receipt-row-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  color: #52525b;
}

.receipt-row-item.header-row {
  font-weight: 700;
  border-bottom: 1px solid #e4e4e7;
  padding-bottom: 6px;
  margin-bottom: 6px;
  color: #111;
}

.receipt-total-row {
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #d4d4d8;
  padding-top: 10px;
  margin-top: 10px;
  font-size: 1.05rem;
  font-weight: bold;
  color: #111;
}

.receipt-actions-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  width: 100%;
  padding: 14px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-now-btn {
  background-color: #22c55e;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

.track-now-btn:hover {
  background-color: #16a34a;
}

.return-home-btn {
  background-color: #ffffff;
  color: #27272a;
  border: 1px solid #d4d4d8;
}

.return-home-btn:hover {
  background-color: #f4f4f5;
}
.cart-page-bg { background-color: #fdfbf7; min-height: 100vh; padding: 40px 20px; font-family: system-ui, sans-serif; text-align: left;}
.cart-container { max-width: 1100px; margin: 0 auto; }
.page-title-section { margin-bottom: 30px; }
.main-title { font-size: 1.8rem; font-weight: 800; color: #111; margin: 0; }
.subtitle-notice { margin: 5px 0 0 0; color: #71717a; font-size: 0.95rem; }

/* 🔍 ORDER SEARCH UTILITY BAR */
.order-search-section { max-width: 500px; margin: 0 auto 35px auto; text-align: center; }
.search-input-wrapper { display: flex; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04); border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7; background: #fff;}
.order-search-input { flex: 1; padding: 12px 16px; border: none; outline: none; font-size: 0.95rem; }
.order-search-btn { background-color: #111111; color: #ffffff; border: none; padding: 0 18px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
.order-search-btn:hover { background-color: #22c55e; }
.search-error-text { color: #ef4444; font-size: 0.85rem; margin: 6px 0 0 0; }

/* 🟢 REDESIGNED TIMELINE STEP ELEMENTS */
.progress-tracker-container { position: relative; max-width: 750px; margin: 0 auto 45px auto; padding: 0 10px; }
.progress-track-bg { position: absolute; top: 22px; left: 45px; right: 45px; height: 4px; background-color: #e4e4e7; border-radius: 2px; z-index: 1; }
.progress-track-fill { height: 100%; background-color: #22c55e; border-radius: 2px; transition: width 0.4s ease; }
.steps-row { display: flex; justify-content: space-between; position: relative; z-index: 2; }
.step-item { display: flex; flex-direction: column; align-items: center; flex: 1; }
.step-indicator { width: 44px; height: 44px; border-radius: 50%; background-color: #ffffff; border: 3px solid #e4e4e7; color: #71717a; font-weight: 700; font-size: 1rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04); }
.step-item.active .step-indicator { background-color: #22c55e; border-color: #bbf7d0; color: #ffffff; transform: scale(1.08); box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25); }
.step-label-group { margin-top: 14px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; }
.step-title-km { font-size: 0.95rem; font-weight: 700; color: #27272a; }
.step-title-en { font-size: 0.78rem; font-weight: 500; color: #71717a; }
.step-item.active .step-title-km { color: #16a34a; }

/* 📦 SEARCH TRACKING INTERFACING PANEL */
.order-result-card { background: #ffffff; border-radius: 12px; padding: 24px; margin: 20px auto; max-width: 600px; border: 2px solid #22c55e; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
.result-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e4e4e7; padding-bottom: 12px; margin-bottom: 14px; }
.result-header h3 { margin: 0; color: #111; }
.order-date { font-size: 0.85rem; color: #71717a; }
.result-item-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.95rem; color: #3f3f46; }
.result-total { display: flex; justify-content: space-between; border-top: 1px dashed #e4e4e7; margin-top: 12px; padding-top: 12px; font-weight: bold; font-size: 1.1rem; }
.clear-search-btn { width: 100%; margin-top: 16px; padding: 10px; border: 1px solid #d4d4d8; background: #f4f4f5; border-radius: 6px; cursor: pointer; font-weight: 600; }
.clear-search-btn:hover { background: #e4e4e7; }

/* GRID STRUCTURE */
.cart-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: start; }
.form-card, .summary-card { background-color: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.card-header { padding: 16px 20px; font-weight: bold; font-size: 1.1rem; border-bottom: 1px solid #e4e4e7; background: #fafafa; display: flex; align-items: center; gap: 8px; }
.form-body, .summary-body { padding: 24px; }

/* STANDARD FORMS MATRIX */
.input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.input-group label { font-size: 0.88rem; font-weight: 600; color: #374151; }
.input-group input { padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.95rem; width: 100%; box-sizing: border-box; }
.input-row-twin { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.text-left { text-align: left; }

/* SUMMARY AND PREVIEWS */
.cart-items-preview-list { display: flex; flex-direction: column; gap: 12px; max-height: 240px; overflow-y: auto; }
.preview-item-row { display: flex; justify-content: space-between; align-items: center; background: #f9f9f9; padding: 10px 14px; border-radius: 8px; }
.item-meta { display: flex; flex-direction: column; gap: 2px; }
.item-name { font-weight: 700; color: #111; font-size: 0.95rem; }
.item-variant { font-size: 0.78rem; color: #71717a; }
.item-qty { font-size: 0.85rem; font-weight: bold; color: #16a34a; }
.item-pricing-action { display: flex; align-items: center; gap: 12px; }
.item-cost { font-weight: 700; font-size: 0.95rem; }
.delete-item-btn { border: none; background: transparent; color: #a1a1aa; cursor: pointer; font-size: 0.9rem; }
.delete-item-btn:hover { color: #ef4444; }
.pricing-divider { height: 1px; background: #e4e4e7; margin: 16px 0; }
.financial-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.95rem; color: #52525b; }
.financial-row.total-row { font-size: 1.25rem; font-weight: 800; color: #111; margin-top: 12px; }
.empty-cart-msg { text-align: center; color: #71717a; padding: 20px 0; }
.back-shop-btn { width: 100%; margin-top: 12px; background: #111; color: #fff; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; }

/* 💳 TABS AND SWITCHING CONTAINERS */
.payment-method-selectors { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background-color: #e4e4e7; padding: 6px; border-radius: 8px; margin: 20px 0; }
.method-tab { padding: 12px; border: none; background: transparent; font-size: 0.95rem; font-weight: 700; color: #52525b; cursor: pointer; border-radius: 6px; transition: all 0.2s; }
.method-tab.active { background-color: #ffffff; color: #111111; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.card-inputs-wrapper { background-color: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e4e4e7; box-shadow: 0 4px 15px rgba(0,0,0,0.01); }
.payment-title { margin: 0 0 16px 0; font-size: 1.1rem; font-weight: 800; color: #111; }
.card-form-grid { display: flex; flex-direction: column; gap: 14px; }

/* KHQR CORE MODULE BLOCKS */
.khqr-card-wrapper { background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e4e4e7; }
.khqr-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 16px; align-items: center; }
.receipt-upload-box { border: 2px dashed #d4d4d8; height: 210px; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: #fafafa; overflow: hidden; position: relative; }
.receipt-upload-box:hover { border-color: #22c55e; background: #f0fdf4; }
.upload-inner-prompt { text-align: center; padding: 10px; }
.cloud-icon { font-size: 2rem; display: block; margin-bottom: 6px; }
.khmer-prompt { margin: 0; font-weight: bold; font-size: 0.88rem; color: #3f3f46; }
.eng-prompt { margin: 2px 0 0 0; font-size: 0.75rem; color: #71717a; }
.uploaded-receipt-img { width: 100%; height: 100%; object-fit: cover; }
.hidden-input { display: none; }

/* MERCHANT PLATFORM LAYOUT */
.real-khqr-plate { background: #e11d48; border-radius: 12px; padding: 14px; text-align: center; color: white; display: flex; flex-direction: column; align-items: center; }
.khqr-brand-header { font-weight: 900; font-size: 1.2rem; letter-spacing: 1px; margin-bottom: 2px; italic: true; }
.khqr-merchant-info { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; opacity: 0.9; margin-bottom: 10px; }
.qr-box-frame { background: white; padding: 10px; border-radius: 8px; display: inline-block; position: relative; width: 130px; height: 130px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
.main-qr-code { width: 100%; height: 100%; object-fit: contain; }
.bakong-center-logo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 22px; height: 22px; background: white; border-radius: 4px; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
.red-logo-dot { width: 12px; height: 12px; background: #e11d48; border-radius: 50%; }
.clickable-qr-trigger { cursor: pointer; overflow: hidden; transition: transform 0.2s; }
.change-qr-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.65); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 0.8rem; font-weight: bold; opacity: 0; transition: opacity 0.2s; border-radius: 8px; }
.clickable-qr-trigger:hover .change-qr-overlay { opacity: 1; }
.qr-helper-hint { font-size: 0.72rem; color: rgba(255,255,255,0.85); margin: 8px 0 0 0; font-weight: 500; }

/* ACTION MATRIX STRIPS */
.pay-submit-btn { width: 100%; margin-top: 20px; background-color: #16a34a; color: white; border: none; padding: 15px; font-size: 1.1rem; font-weight: bold; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2); transition: background 0.2s; }
.pay-submit-btn:hover { background-color: #15803d; }
.pay-submit-btn:disabled { background-color: #d1d5db; color: #9ca3af; cursor: not-allowed; box-shadow: none; }

.animate-pop { animation: pop 0.25s ease-out; }
@keyframes pop { 0% { transform: scale(0.96); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

/* RESPONSIVE MEDIA QUERIES */
@media (max-width: 900px) {
  .cart-grid { grid-template-columns: 1fr; gap: 24px; }
  .khqr-grid { grid-template-columns: 1fr; }
  .receipt-upload-box { height: 180px; }
}
@media (max-width: 640px) {
  .step-title-km { font-size: 0.82rem; }
  .step-title-en { display: none; }
  .step-indicator { width: 36px; height: 36px; font-size: 0.9rem; }
  .progress-track-bg { top: 18px; left: 30px; right: 30px; }
  .input-row-twin { grid-template-columns: 1fr; gap: 0; }
}
</style>