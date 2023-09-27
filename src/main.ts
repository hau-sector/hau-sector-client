import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import App from '@/App.vue'
import { homeRoute } from '@/home/router'
import { primeVueConfig } from '@/core/constants/prime-vue-config'

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/soho-light/theme.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    homeRoute,
  ],
})
app.use(router)

app
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)

app.mount('#app')
