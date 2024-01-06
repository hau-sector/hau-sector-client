import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { computed, ref, shallowReadonly } from 'vue'
import { useBuildingsService } from '@/shared/services/buildings'
import type { Flat } from '@/shared/dto/flat'

export const useFlatsStore = createGlobalState(() => {
  const flats = shallowRef<Flat[]>([])

  const buildingsService = useBuildingsService()
  const { result, loading } = buildingsService.getMyFlats()
  whenever(result, result => flats.value = result.myFlats)

  const flatId = ref<string>()
  const buildingId = computed(() => flats.value.find(({ id }) => id === flatId.value)?.building?.id)

  return {
    flatId,

    flats: shallowReadonly(flats),
    loading: shallowReadonly(loading),
    buildingId: shallowReadonly(buildingId),
  }
})
