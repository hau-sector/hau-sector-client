<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

defineSlots<{
  default: () => ComponentPublicInstance
}>()
</script>

<template>
  <transition
    mode="out-in"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="duration-200 ease-out"
    leave-active-class="duration-100 ease-in"
  >
    <slot name="default" />
  </transition>
</template>
