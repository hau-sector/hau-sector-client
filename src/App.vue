<script lang="ts" setup>
import { tryOnMounted } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { usePropertiesStore } from '@/shared/stores/properties'
import TheThemeInjector from '@/core/components/TheThemeInjector.vue'
import TheSideMenu from '@/core/components/TheSideMenu.vue'
import TheHeader from '@/core/components/TheHeader.vue'

const router = useRouter()
async function preload() {
  await Promise.all(router
    .getRoutes()
    .map(item => item.components?.default)
    .filter(fn => typeof fn === 'function')
    .map(fn => (fn as Function)()))
}
tryOnMounted(preload)

const { selectedId } = usePropertiesStore()
</script>

<template>
  <TheThemeInjector />

  <div class="w-full h-full bg-ground flex flex-col px-3 2xl:px-5">
    <TheHeader class="mb-3 shrink-0 2xl:mb-5" />

    <div v-if="selectedId" class="flex flex-1 gap-1 mb-3 2xl:mb-5 2xl:gap-4">
      <TheSideMenu />

      <RouterView v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="duration-200 ease-out"
          leave-active-class="duration-100 ease-in"
        >
          <component :is="Component" class="flex-1 px-2 h-[calc(100vh-6rem)]  2xl:h-[calc(100vh-7rem)] overflow-auto" />
        </transition>
      </RouterView>
    </div>

    <div v-else class="m-auto flex flex-col gap-5">
      <span class="text-xl">Для начала работы выберите объект собственности</span>
    </div>
  </div>
</template>
