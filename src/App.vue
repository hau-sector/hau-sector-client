<script lang="ts" setup>
import { tryOnMounted } from '@vueuse/core'
import Toast from 'primevue/toast'
import { useRouter } from 'vue-router'
import TheHeader from '@/core/components/TheHeader.vue'
import TheSideMenu from '@/core/components/TheSideMenu.vue'
import TheThemeInjector from '@/core/components/TheThemeInjector.vue'
import TransitionFade from '@/shared/components/TransitionFade.vue'
import { useFlatsStore } from '@/shared/stores/flats'

const router = useRouter()
async function preload() {
  await Promise.all(router
    .getRoutes()
    .map(item => item.components?.default)
    .filter(fn => typeof fn === 'function')
    .map(fn => (fn as Function)()))
}
tryOnMounted(preload)

const { flatId } = useFlatsStore()
</script>

<template>
  <Toast />
  <TheThemeInjector />

  <div class="w-full h-full bg-ground flex flex-col px-3 2xl:px-5 overflow-auto">
    <TheHeader class="mb-3 shrink-0 2xl:mb-5" />

    <TransitionFade>
      <div v-if="flatId" class="flex flex-1 gap-1 mb-3 2xl:mb-5 2xl:gap-4 overflow-auto">
        <TheSideMenu />

        <RouterView v-slot="{ Component }">
          <TransitionFade>
            <component :is="Component" class="flex-1 px-2 overflow-auto" />
          </TransitionFade>
        </RouterView>
      </div>

      <div v-else class="m-auto flex flex-col gap-5">
        <span class="text-xl">Для начала работы выберите объект собственности</span>
      </div>
    </TransitionFade>
  </div>
</template>
