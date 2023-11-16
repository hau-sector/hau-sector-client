<script setup lang="ts">
import { computed } from 'vue'
import { useContactsStore } from '@/chat/stores/contacts'

const props = defineProps<{
  online: boolean
}>()

const { contacts } = useContactsStore()

const filteredContacts = computed(() => contacts.value.filter(({ online }) => online === props.online))
const color = computed(() => props.online ? 'text-emerald-500' : 'text-rose-500')
const text = computed(() => props.online ? 'В сети' : 'Не в сети')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2 mx-2 mt-2 items-center justify-center">
      <i class="pi bi-circle-fill" :class="color" />
      <span class="text-xl">{{ text }}</span>
    </div>

    <div class="panel flex flex-col">
      <div v-for="contact of filteredContacts" :key="contact.id">
        <div
          class="flex gap-2 items-center py-4 px-6 hover:cursor-pointer hover:bg-slate-50"
        >
          <img :src="contact.avatar" class="w-8 mr-2 rounded-full">
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
