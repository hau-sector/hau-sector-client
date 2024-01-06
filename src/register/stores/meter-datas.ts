import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { ref, shallowReadonly } from 'vue'
import { useFlatsStore } from '@/shared/stores/flats'
import type { MeterType } from '@/register/constants/meter-type'
import type { MeterData } from '@/register/dto/meter-data'
import { useMeterDatasService } from '@/register/services/meter-datas'

export const useMeterDatasStore = createGlobalState(() => {
  const meterDatas = shallowRef<MeterData[]>([])
  const start = ref<Date>()
  const end = ref<Date>()
  const type = ref<MeterType>()

  const meterDatasService = useMeterDatasService()
  const { flatId } = useFlatsStore()
  const { result, loading } = meterDatasService.getMeterDatas(type, start, end, flatId)
  whenever(result, result => meterDatas.value = result.meterDatas)

  return {
    meterDatas: shallowReadonly(meterDatas),
    loading,
    start,
    end,
    type,
  }
})
