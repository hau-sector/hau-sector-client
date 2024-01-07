import { useMutation, useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { Vote } from '@/votes/dto/vote'
import { VOTE } from '@/votes/dto/vote'
import type { VoteAnswer } from '@/votes/constants/vote-answer'

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

  setAnswer: () => useMutation<
    { setAnswer: Vote },
    { voteId: string; answer: VoteAnswer }
  >(
    gql`
      mutation SetVoteAnswer($voteId: String!, $answer: VoteAnswer!) {
        setAnswer(voteId: $voteId, answer: $answer) {
          ...Vote
        }
      }
      ${VOTE}
    `,
  ),
}))
