import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import type { Flat } from '@/shared/dto/flat'
import { FLAT } from '@/shared/dto/flat'

export const useBuildingsService = createGlobalState(() => ({
  getMyFlats: () => useQuery<
    { myFlats: Flat[] }
  >(gql`
      query GetMyFlats {
        myFlats {
          ...Flat
        }
      }
      ${FLAT}
    `,
  ),
}))
