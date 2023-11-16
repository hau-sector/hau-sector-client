import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { VOTE } from '@/votes/dto/vote'
import type { Vote } from '@/votes/dto/vote'

export const useVotesService = createGlobalState(() => ({
  getVotes: (
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { votes: Vote[] },
    { buildingId: string | undefined }
  >(gql`
      query GetVotes($buildingId: String!) {
        votes(buildingId: $buildingId) {
          ...Vote
        }
      }
      ${VOTE}
    `,
  () => ({
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),
}))
