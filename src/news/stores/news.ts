import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import type { News } from '@/news/dto/news'
import { useNewsService } from '@/news/services/news'
import { usePropertiesStore } from '@/shared/stores/properties'

export const useNewsStore = createGlobalState(() => {
  const news = shallowRef<News[]>([])

  const newsService = useNewsService()
  const { selectedId } = usePropertiesStore()
  const { result } = newsService.getNews(selectedId)
  whenever(result, result => news.value = result.news)

  return {
    news: shallowReadonly(news),
  }
})
