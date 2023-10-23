import { provideApolloClient } from '@vue/apollo-composable'
import moment from 'moment'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import { chatRoute } from '@/chat/router'
import { apolloClient } from '@/core/utils/apollo-client'
import { primeVueConfig } from '@/core/constants/prime-vue-config'
import { homeRoute } from '@/home/router'
import { issuesRoute } from '@/issues/router'
import { newsRoute } from '@/news/router'
import { paymentsRoute } from '@/payments/router'
import { registerRoute } from '@/register/router'
import { votesRoute } from '@/votes/router'
import 'moment/dist/locale/ru'
import './index.css'

moment.locale('ru')

if (import.meta.env.DEV) {
  const { setupWorker } = await import('msw')
  const { meterDatasMock } = await import('@/register/mocks/meter-datas')
  const { userMock } = await import('@/shared/mocks/user')
  const { buildingsMock } = await import('@/shared/mocks/buildings')

  const worker = setupWorker(
    ...meterDatasMock,
    ...buildingsMock,
    ...userMock,
  )
  await worker.start({ onUnhandledRequest: 'bypass' })
}

provideApolloClient(apolloClient)

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    homeRoute,
    registerRoute,
    paymentsRoute,
    votesRoute,
    chatRoute,
    issuesRoute,
    newsRoute,
  ],
})
app.use(router)

app
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)

app.mount('#app')
