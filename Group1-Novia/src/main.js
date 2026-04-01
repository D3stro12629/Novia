import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css' // ✅ toast styles

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
<<<<<<< HEAD
import * as LucideIcons from "lucide-vue-next";

import 'bootstrap-icons/font/bootstrap-icons.css'

=======
 import 'bootstrap-icons/font/bootstrap-icons.css'
>>>>>>> 024adc2f26af7ace16df5ae648fa7bc5123cd2f9
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin) 

for (const [key, component] of Object.entries(LucideIcons)) {
  app.component(key, component);
}

app.mount('#app')
