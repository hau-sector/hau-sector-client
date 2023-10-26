<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import DarkTheme from 'primevue/resources/themes/viva-dark/theme.css?url'
import { ref, toRefs, watch } from 'vue'
import { useSettingsStore } from '@/shared/stores/settings'

const props = withDefaults(
  defineProps<{
    duration?: number
  }>(),
  {
    duration: 500,
  },
)

const { duration } = toRefs(props)

const { dark } = useSettingsStore()

const transition = ref(false)
const { start } = useTimeoutFn(() => transition.value = false, duration)
watch(dark, () => {
  transition.value = true
  start()
})
</script>

<template>
  <link
    v-if="dark"
    rel="stylesheet"
    type="text/css"
    :href="DarkTheme"
  >

  <Component is="style" v-if="transition">
    * {
    transition: all {{ duration / 1000 }}s linear 0s !important;
    }
  </Component>
</template>
