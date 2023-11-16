<script setup lang="ts">
import type { Message } from '@/chat/dto/message'

const props = defineProps<{
  message: Message
}>()
</script>

<template>
  <div class="flex items-end gap-4" :class="props.message.mine ? 'ml-auto' : 'mr-auto'">
    <img v-if="!props.message.mine" :src="props.message.sender.avatar" class="w-8 rounded-full shadow-md">
    <div
      :class="message.mine ? 'panel bg-emerald-50' : 'panel'"
      class="panel flex flex-col items-end justify-between px-4 py-2 min-w-[10rem] max-w-[30rem] xl:max-w-[50rem] rounded-xl"
    >
      <span class="break-words">{{ props.message.text }}</span>
      <span v-if="!props.message.mine" class="self-end text-slate-400">{{ props.message.sender.name }} {{ props.message.sender.surname }}, кв. {{ props.message.sender.flat }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
