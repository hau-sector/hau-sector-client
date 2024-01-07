<script setup lang="ts">
import { computed } from 'vue'
import { useContactsStore } from '@/chat/stores/contacts'

const props = defineProps<{
  online: boolean
}>()

const { contacts } = useContactsStore()
const processed = computed(() => contacts.value
  .filter(({ online }) => online === props.online)
  .toSorted((a, b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0)),
)
const color = computed(() => props.online ? 'text-emerald-400' : 'text-rose-500')
</script>

<template>
  <div class="flex flex-col">
    <div v-for="contact of processed" :key="contact.id">
      <div
        class="flex gap-2 items-center px-6 h-14"
      >
        <div class="flex items-end mr-2 relative">
          <img :src="contact.avatar" class="w-8 rounded-full shadow-md">
          <i class="bi-circle-fill text-xs absolute left-7 top-5 drop-shadow-md" :class="color" />
        </div>
        <span>{{ contact.lastName }} {{ contact.firstName }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
