import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import type { News } from '@/news/dto/news'
import { useNewsService } from '@/news/services/news'
import { useFlatsStore } from '@/shared/stores/flats'

export const useNewsStore = createGlobalState(() => {
  const news = shallowRef<News[]>([])

  const newsService = useNewsService()
  const { buildingId } = useFlatsStore()
  const { result } = newsService.getNews(buildingId)
  whenever(result, result => news.value = result.news)

  return {
    news: shallowReadonly(news),
  }
})
