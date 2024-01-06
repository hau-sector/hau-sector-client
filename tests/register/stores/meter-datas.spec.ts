import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useMeterDatasStore } from '@/register/stores/meter-datas'

const resultMock = ref()
vi.mock('@/register/services/meter-datas', () => ({
  useMeterDatasService: () => ({
    getMeterDatas: () => ({ result: resultMock, loading: ref(false) }),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    flatId: ref(''),
  }),
}))

describe('useMeterDatasStore', () => {
  let meterDatasStore: ReturnType<typeof useMeterDatasStore>

  beforeEach(() => {
    meterDatasStore = useMeterDatasStore()
  })

  it('should return ref of meterdatas array', () => {
    expect(meterDatasStore.meterDatas).toBeDefined()
    expect(isRef(meterDatasStore.meterDatas)).toBeTruthy()
    expect(Array.isArray(meterDatasStore.meterDatas.value)).toBeTruthy()
  })

  it('should return loading value', () => {
    expect(meterDatasStore.loading).toBeDefined()
    expect(isRef(meterDatasStore.loading)).toBeTruthy()
    expect(meterDatasStore.loading.value).toBeTypeOf('boolean')
  })

  it('should return start and end ref values', () => {
    expect(meterDatasStore.start).toBeDefined()
    expect(isRef(meterDatasStore.start)).toBeTruthy()

    expect(meterDatasStore.end).toBeDefined()
    expect(isRef(meterDatasStore.end)).toBeTruthy()
  })

  describe('meterDatas', () => {
    it('should be empty array', () => {
      expect(meterDatasStore.meterDatas.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { meterDatas: [{ id: 1 }] }
      await nextTick()

      expect(meterDatasStore.meterDatas.value).toStrictEqual([{ id: 1 }])
    })
  })
})
