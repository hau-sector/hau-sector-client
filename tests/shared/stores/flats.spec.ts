import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useFlatsStore } from '@/shared/stores/flats'

const resultMock = ref()
vi.mock('@/shared/services/buildings', () => ({
  useBuildingsService: () => ({
    getMyFlats: () => ({ result: resultMock, loading: ref(false) }),
  }),
}))

describe('useFlatsStore', () => {
  let flatsStore: ReturnType<typeof useFlatsStore>

  beforeEach(() => {
    flatsStore = useFlatsStore()
  })

  it('should return ref of properties array', () => {
    expect(flatsStore.flats).toBeDefined()
    expect(isRef((flatsStore.flats))).toBeTruthy()
    expect(Array.isArray(flatsStore.flats.value)).toBeTruthy()
  })

  it('should return flatId value', () => {
    expect(flatsStore.flatId).toBeDefined()
  })

  it('should return loading value', () => {
    expect(flatsStore.loading).toBeDefined()
    expect(flatsStore.loading.value).toBeTypeOf('boolean')
  })

  it('should return buildingId value', () => {
    expect(flatsStore.buildingId).toBeDefined()
  })

  describe('flats', () => {
    it('should contain empty array', () => {
      expect(flatsStore.flats.value).toStrictEqual([])
    })

    it('should contain result', async () => {
      resultMock.value = { myFlats: [{ id: 1 }] }
      await nextTick()

      expect(flatsStore.flats.value).toStrictEqual([{ id: 1 }])
    })
  })
})
