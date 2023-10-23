import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { readonly, ref } from 'vue'
import { useBuildingsService } from '@/shared/services/buildings'
import type { Property } from '@/shared/dto/property'

export const usePropertiesStore = createGlobalState(() => {
  const properties = shallowRef<Property[]>([])

  const buildingsService = useBuildingsService()
  const { result, loading } = buildingsService.getMyProperties()
  whenever(result, result => properties.value = result.myBuildings)

  const selectedId = ref<string>()

  return {
    properties: readonly(properties),
    selectedId,
    loading,
  }
})
