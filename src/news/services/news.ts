import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { NEWS } from '@/news/dto/news'
import type { News } from '@/news/dto/news'

export const useNewsService = createGlobalState(() => ({
  getNews: (
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { news: News[] },
      { buildingId: string | undefined }
  >(gql`
      query GetNews($buildingId: String!) {
        news(buildingId: $buildingId) {
          ...News
        }
      }
      ${NEWS}
    `,
  () => ({
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),
}))
