import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css' // 🔥 Make sure this points to your global CSS file
import router from './router' // 🔥 Make sure this points to your router folder index file

const app = createApp(App)

app.use(router) // 🔥 THIS IS THE KEY STEP THAT TELLS VUE WHAT <router-view> IS!

app.mount('#app')