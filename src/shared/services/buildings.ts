import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import { PROPERTY } from '@/shared/dto/property'
import type { Property } from '@/shared/dto/property'

export const useBuildingsService = createGlobalState(() => ({
  getMyProperties: () => useQuery<
    { myBuildings: Property[] }
  >(gql`
      query GetMyProperties {
        myBuildings {
          ...Property
        }
      }
      ${PROPERTY}
    `,
  ),
}))
