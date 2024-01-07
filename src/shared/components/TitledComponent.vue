<script setup lang="ts">
const props = defineProps<{
  title: string
  icon: string
  mini?: boolean
}>()
</script>

<template>
  <div class="flex flex-col overflow-auto">
    <div
      :class="props.mini ? 'my-3' : 'my-10'"
      class="flex gap-5 items-center justify-center"
    >
      <i class="text-3xl" :class="props.icon" />
      <span class="text-3xl">{{ props.title }}</span>
    </div>

    <slot />
  </div>
</template>
