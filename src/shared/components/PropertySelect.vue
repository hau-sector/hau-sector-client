<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { useFlatsStore } from '@/shared/stores/flats'
import type { Flat } from '@/shared/dto/flat'

const { flats, flatId, loading } = useFlatsStore()

function parseAddress(payload?: Flat) {
  if (!payload)
    return ''
  const { building: { street, house }, flat } = payload
  return `ул. ${street}, д. ${house}, кв. ${flat}`
}
</script>

<template>
  <Dropdown
    v-model="flatId"
    :options="flats"
    option-value="id"
    :option-label="parseAddress"
    placeholder="Выберите адрес"
    :loading="loading"
    class="w-80"
  />
</template>
