import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css' // ✅ toast styles

import App from './App.vue'
import router from './router'
<<<<<<< HEAD
=======
<<<<<<< HEAD

>>>>>>> 8095933eb0b8806bab3616198206a7e90866e0df
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import * as LucideIcons from "lucide-vue-next";

=======
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
>>>>>>> 26af8a96d27e778149f2c2c7cbe2a406f094b574
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin) 

for (const [key, component] of Object.entries(LucideIcons)) {
  app.component(key, component);
}

app.mount('#app')
