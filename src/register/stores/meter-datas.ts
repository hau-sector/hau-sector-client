import { shallowRef } from '@vue/reactivity'
import { createGlobalState } from '@vueuse/core'
import { ref, shallowReadonly, watch } from 'vue'
import type { MeterType } from '@/register/constants/meter-type'
import type { MeterData } from '@/register/dto/meter-data'
import { useMeterDatasService } from '@/register/services/meter-datas'

export const useMeterDatasStore = createGlobalState(() => {
  const meterDatas = shallowRef<MeterData[]>([])
  const start = ref<Date>()
  const end = ref<Date>()
  const type = ref<MeterType>()

  const meterDatasService = useMeterDatasService()
  async function fetch() {
    if (type.value && start.value && end.value)
      meterDatas.value = await meterDatasService.getAll(type.value, start.value, end.value)
  }
  watch([start, end, type], fetch)

  return {
    meterDatas: shallowReadonly(meterDatas),
    start,
    end,
    type,
  }
})
