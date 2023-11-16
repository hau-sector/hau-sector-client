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

async function mock() {
  if (import.meta.env.DEV) {
    const { setupWorker } = await import('msw')
    const { meterDatasMock } = await import('@/register/mocks/meter-datas')
    const { paymentDatasMock } = await import('@/payments/mocks/payment-datas')
    const { userMock } = await import('@/shared/mocks/user')
    const { newsMock } = await import('@/news/mocks/news')
    const { votesMock } = await import('@/votes/mocks/votes')
    const { issuesMock } = await import('@/issues/mocks/issues')
    const { buildingsMock } = await import('@/shared/mocks/buildings')
    const { contactsMock } = await import('@/chat/mocks/contacts')
    const { messagesMock } = await import('@/chat/mocks/messages')

    const worker = setupWorker(
      ...meterDatasMock,
      ...paymentDatasMock,
      ...buildingsMock,
      ...userMock,
      ...newsMock,
      ...votesMock,
      ...issuesMock,
      ...contactsMock,
      ...messagesMock,
    )
    await worker.start({ serviceWorker: { url: `${location.origin}/mockServiceWorker.js` }, onUnhandledRequest: 'bypass' })
  }
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

async function bootstrap() {
  await mock()
  app.mount('#app')
}
void bootstrap()
