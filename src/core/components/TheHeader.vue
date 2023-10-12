<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import Dropdown from 'primevue/dropdown'
import Toolbar from 'primevue/toolbar'
import { computed } from 'vue'
import type { Property } from '@/core/dto/property'
import { usePropertiesStore } from '@/core/stores/properties'
import { useUserStore } from '@/core/stores/user'

const { user } = useUserStore()
const name = computed(() => {
  if (user.value) {
    const {
      firstName,
      lastName,
      middleName,
    } = user.value
    return `${lastName} ${firstName[0]}. ${middleName[0]}.`
  }
})

const { properties } = usePropertiesStore()
const selectedProperty = shallowRef<Property>()

function parseAddress({ street, house, flat }: Property) {
  return `ул. ${street}, дом. ${house}, кв. ${flat}`
}
</script>

<template>
  <Toolbar
    class="panel rounded-t-none border-t-0 py-3"
  >
    <template #start>
      <div v-if="user" class="flex gap-5 items-center">
        <img :src="user.avatar" class="w-10 h-10 rounded-lg object-cover object-center">
        <div class="text-lg">
          {{ name }}
        </div>
      </div>
    </template>

    <template #end>
      <div class="ml-auto">
        <Dropdown
          v-model="selectedProperty"
          :option-label="parseAddress"
          :option-value="parseAddress"
          :options="properties"
          placeholder="Выберите адрес"
          class="w-80"
        />
      </div>
    </template>
  </Toolbar>
</template>
