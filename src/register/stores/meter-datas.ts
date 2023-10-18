import { shallowRef } from '@vue/reactivity'
import { createGlobalState, syncRefs } from '@vueuse/core'
import { ref, shallowReadonly } from 'vue'
import type { MeterType } from '@/register/constants/meter-type'
import type { MeterData } from '@/register/dto/meter-data'
import { useMeterDatasService } from '@/register/services/meter-datas'

export const useMeterDatasStore = createGlobalState(() => {
  const meterDatas = shallowRef<MeterData[]>([])
  const start = ref<Date>()
  const end = ref<Date>()
  const type = ref<MeterType>()

  const meterDatasService = useMeterDatasService()
  const { result, variables } = meterDatasService.meterDatas()
  syncRefs(() => ({ start: start.value, end: end.value, type: type.value }), variables)
  syncRefs(() => result.value?.meterDatas, meterDatas)

  return {
    meterDatas: shallowReadonly(meterDatas),
    start,
    end,
    type,
  }
})
