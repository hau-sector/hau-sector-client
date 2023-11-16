<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { watch } from 'vue'
import type { Property } from '@/shared/dto/property'
import { usePropertiesStore } from '@/shared/stores/properties'

const { properties, selectedId, loading } = usePropertiesStore()

// TODO: Удалить!
watch(properties, () => selectedId.value = properties.value[0].id)
function parseAddress(property?: Property) {
  if (!property)
    return ''

  const { building: { street, house }, flat } = property
  return `ул. ${street}, д. ${house}, кв. ${flat}`
}
</script>

<template>
  <Dropdown
    v-model="selectedId"
    :options="properties"
    option-value="id"
    :option-label="parseAddress"
    placeholder="Выберите адрес"
    :loading="loading"
    class="w-80"
  />
</template>

<style scoped>

</style>
