import { shallowRef } from '@vue/reactivity'
import {
  createGlobalState,
  tryOnMounted,
} from '@vueuse/core'
import { readonly } from 'vue'
import type { Property } from '@/core/dto/property'

export const usePropertiesStore = createGlobalState(() => {
  const properties = shallowRef<Property>([])

  async function load() {
    properties.value = [
      {
        id: 123,
        street: 'Лесная',
        house: 12,
        flat: 20,
      },
      {
        id: 222,
        street: 'Парковая',
        house: 1,
        flat: 15,
      },
    ]
  }

  tryOnMounted(load)

  return {
    properties: readonly(properties),
  }
})
