<script setup lang="ts">
import moment from 'moment/moment'
import { computed } from 'vue'
import type { Message } from '@/chat/dto/message'
import { useSettingsStore } from '@/shared/stores/settings'

const props = defineProps<{
  message: Message
}>()
const { dark } = useSettingsStore()
const time = computed(() => `${moment(props.message.time).hour()}:${moment(props.message.time).minute()}`)
</script>

<template>
  <div class="flex items-end gap-4" :class="props.message.mine ? 'ml-auto' : 'mr-auto'">
    <img v-if="!props.message.mine" :src="props.message.sender.avatar" class="w-8 rounded-full shadow-md">
    <div
      :class="[
        message.mine ? 'bg-emerald-100' : 'bg-white',
        dark ? 'text-black' : '',
      ]"
      class="panel flex flex-col items-end justify-between px-4 py-2 max-w-[30rem] xl:max-w-[50rem] rounded-xl"
    >
      <span class="break-words">{{ props.message.text }}</span>
      <div
        class="self-end text-slate-400"
      >
        <span v-if="!props.message.mine">
          {{ props.message.sender.name }} {{ props.message.sender.surname }},
        </span>
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
