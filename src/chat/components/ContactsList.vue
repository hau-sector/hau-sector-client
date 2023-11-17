<script setup lang="ts">
import { computed } from 'vue'
import { useContactsStore } from '@/chat/stores/contacts'

const props = defineProps<{
  online: boolean
}>()

const { contacts } = useContactsStore()

const filteredContacts = computed(() => contacts.value.filter(({ online }) => online === props.online))
const color = computed(() => props.online ? 'text-emerald-400' : 'text-rose-500')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <div v-for="contact of filteredContacts" :key="contact.id">
        <div
          class="flex gap-2 items-center py-4 px-6"
        >
          <div class="flex items-end mr-2 relative">
            <img :src="contact.avatar" class="w-8 rounded-full shadow-md">
            <i class="pi bi-circle-fill text-xs absolute left-7 top-5 drop-shadow-md" :class="color" />
          </div>
          <span>{{ contact.surname }} {{ contact.name }}, кв. {{
            contact.flat
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
