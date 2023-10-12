<script setup lang="ts">
const props = defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="my-10 flex gap-5 items-center justify-center">
      <i class="text-3xl" :class="props.icon" />
      <span class="text-3xl">{{ props.title }}</span>
    </div>

    <slot />
  </div>
</template>
