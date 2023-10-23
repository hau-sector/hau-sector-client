import { createGlobalState, whenever } from '@vueuse/core'
import { readonly, ref } from 'vue'
import { usePropertiesStore } from '@/shared/stores/properties'
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
  const { selectedId } = usePropertiesStore()

  Object.values(MeterType).forEach((type) => {
    const { result } = meterDatasService.getCurrentMeterData(type, selectedId)
    whenever(result, result => currentData.value[type] = result.currentMeterData)
  })

  const { mutate: createMutate } = meterDatasService.createCurrentMeterData()
  async function sendData(type: MeterType, value: number) {
    if (selectedId.value) {
      const result = await createMutate({
        payload: { type, value, buildingId: selectedId.value },
      })
      if (result?.data)
        currentData.value[type] = result.data.createCurrentMeterData
    }
  }

  const { mutate: updateMutate } = meterDatasService.updateCurrentMeterData()
  async function editData(type: MeterType, value: number) {
    if (selectedId.value) {
      const result = await updateMutate({
        payload: { type, value },
        buildingId: selectedId.value,
      })
      if (result?.data)
        currentData.value[type] = result.data.updateCurrentMeterData
    }
  }

  return {
    currentData: readonly(currentData),

    sendData,
    editData,
  }
})
