import { provideApolloClient } from '@vue/apollo-composable'
import moment from 'moment'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createAuth0 } from '@auth0/auth0-vue'
import type { Plugin } from 'vue'
import type { Auth0VueClientOptions } from '@auth0/auth0-vue/src/global'
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

const authOptions: Auth0VueClientOptions = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
}
app.use(createAuth0(authOptions) as unknown as Plugin)

app.mount('#app')
