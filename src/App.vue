<script lang="ts" setup>
import { useTitle } from '@vueuse/core'

useTitle('Hello, Vue')
</script>

<template>
  <div class="w-full h-full">
    <RouterView class="w-full h-full" />
  </div>
</template>
