import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { usePropertiesStore } from '@/shared/stores/properties'

const resultMock = ref()
vi.mock('@/shared/services/buildings', () => ({
  useBuildingsService: () => ({
    getMyProperties: () => ({ result: resultMock, loading: ref(false) }),
  }),
}))

describe('usePropertiesStore', () => {
  let propertiesStore: ReturnType<typeof usePropertiesStore>

  beforeEach(() => {
    propertiesStore = usePropertiesStore()
  })

  it('should return ref of properties array', () => {
    expect(propertiesStore.properties).toBeDefined()
    expect(isRef((propertiesStore.properties))).toBeTruthy()
    expect(Array.isArray(propertiesStore.properties.value)).toBeTruthy()
  })

  it('should return selectedId value', () => {
    expect(propertiesStore.selectedId).toBeDefined()
  })

  it('should return loading value', () => {
    expect(propertiesStore.loading).toBeDefined()
    expect(propertiesStore.loading.value).toBeTypeOf('boolean')
  })

  describe('properties', () => {
    it('should contain empty array', () => {
      expect(propertiesStore.properties.value).toStrictEqual([])
    })

    it('should contain result', async () => {
      resultMock.value = { myBuildings: [{ id: 1 }] }
      await nextTick()

      expect(propertiesStore.properties.value).toStrictEqual([{ id: 1 }])
    })
  })
})
