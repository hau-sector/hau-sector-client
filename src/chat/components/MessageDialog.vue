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
    <div class="flex items-end mr-2 relative">
      <img
        v-if="!props.message.mine" :src="props.message.sender.avatar"
        class="w-8 rounded-full shadow-md"
      >
      <i
        v-if="!props.message.mine"
        class="pi bi-circle-fill text-xs absolute left-7 top-5 drop-shadow-md"
        :class="props.message.sender.online ? 'text-emerald-400' : 'text-rose-500'"
      />
    </div>
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
