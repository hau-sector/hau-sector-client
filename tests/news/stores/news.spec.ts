import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useNewsStore } from '@/news/stores/news'

const resultMock = ref()

vi.mock('@/news/services/news', () => ({
  useNewsService: () => ({
    getNews: () => ({ result: resultMock }),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    buildingId: ref(''),
  }),
}))

describe('useNewsStore', () => {
  let newsStore: ReturnType<typeof useNewsStore>

  beforeEach(() => {
    newsStore = useNewsStore()
  })

  it('should return ref of news array', () => {
    expect(newsStore.news).toBeDefined()
    expect(isRef(newsStore.news)).toBeTruthy()
    expect(Array.isArray(newsStore.news.value)).toBeTruthy()
  })

  describe('news', () => {
    it('should be empty array', () => {
      expect(newsStore.news.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { news: [{ id: 1 }] }
      await nextTick()

      expect(newsStore.news.value).toStrictEqual([{ id: 1 }])
    })
  })
})
