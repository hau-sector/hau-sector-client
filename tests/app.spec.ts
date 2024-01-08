import PrimeVue from 'primevue/config'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import { h, ref } from 'vue'
import { primeVueConfig } from '@/core/constants/prime-vue-config'
import App from '@/App.vue'
import { RouteName } from '@/shared/constants/route-name'

vi.mock('@/shared/stores/auth', () => ({
  useAuthStore: () => ({
    isLoading: ref(true),
  }),
}))
vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    flatId: ref('1'),
  }),
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: h('div') },
    ...Object.values(RouteName)
      .map(name => ({
        name,
        path: `/${name.toLowerCase()}`,
        component: h('div'),
      })),
  ],
})
describe('App', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    wrapper = shallowMount(App, {
      global: { plugins: [router, [PrimeVue, primeVueConfig]] },
    })
    await router.isReady()
  })

  it('should be visible', () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })
})
