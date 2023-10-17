import { createGlobalState, tryOnMounted } from '@vueuse/core'
import { readonly, ref } from 'vue'
import { useMeterDatasService } from '@/register/services/meter-datas'
import { MeterType } from '@/register/constants/meter-type'
import type { MeterData } from '@/register/dto/meter-data'

export const useRegistratorStore = createGlobalState(() => {
  const currentData = ref<Record<MeterType, MeterData | undefined>>({
    [MeterType.GAS]: undefined,
    [MeterType.WATER]: undefined,
    [MeterType.ENERGY]: undefined,
  })

  const meterDatasService = useMeterDatasService()

  async function fetch() {
    await Promise.all(Object.values(MeterType).map(async (type) => {
      currentData.value[type] = await meterDatasService.getCurrent(type)
    }))
  }

  tryOnMounted(fetch)

  async function sendData(type: MeterType, value: number) {
    currentData.value[type] = await meterDatasService.createCurrent({ type, value })
  }
  async function editData(type: MeterType, value: number) {
    currentData.value[type] = await meterDatasService.updateCurrent(type, { value })
  }

  return {
    currentData: readonly(currentData),

    sendData,
    editData,
  }
})
