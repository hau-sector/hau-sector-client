import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { MeterType } from '@/register/constants/meter-type'
import { useRegistratorStore } from '@/register/stores/registrator'

const resultMock = ref()
const mutateMock = vi.fn()
const updateMock = vi.fn()

vi.mock('@/register/services/meter-datas', () => ({
  useMeterDatasService: () => ({
    getCurrentMeterData: () => ({ result: resultMock }),
    createCurrentMeterData: () => ({ mutate: mutateMock }),
    updateCurrentMeterData: () => ({ update: updateMock }),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    flatId: ref(''),
  }),
}))

describe('useRegistratorStore', () => {
  let registratorStore: ReturnType<typeof useRegistratorStore>

  beforeEach(() => {
    registratorStore = useRegistratorStore()
  })

  it('should return ref value', () => {
    expect(registratorStore.currentData).toBeDefined()
    expect(isRef(registratorStore.currentData)).toBeTruthy()
  })

  it('should return create and update values', () => {
    expect(registratorStore.sendData).toBeDefined()
    expect(registratorStore.editData).toBeDefined()
  })

  describe('currentData', () => {
    it('should be undefined', () => {
      expect(registratorStore.currentData.value).toStrictEqual({
        [MeterType.GAS]: undefined,
        [MeterType.WATER]: undefined,
        [MeterType.ENERGY]: undefined,
      })
    })

    it('should contain result', async () => {
      resultMock.value = { currentMeterData: [{ id: 1 }] }
      await nextTick()

      Object.values(MeterType).forEach((type) => {
        expect(registratorStore.currentData.value[type]).toStrictEqual([{ id: 1 }])
      })
    })
  })
})
