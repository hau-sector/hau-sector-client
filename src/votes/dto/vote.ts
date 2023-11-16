import gql from 'graphql-tag'
import type { VoteAnswer } from '@/votes/constants/vote-answer'
import type { VoteStatus } from '@/votes/constants/vote-status'

export interface Vote {
  id: string
  title: string
  content: string
  status: VoteStatus
  publishedAt: string
  answer?: VoteAnswer
  __typename: 'VoteObject'
}

export const VOTE = gql`
    fragment Vote on VoteObject {
      id
      title
      content
      status
      publishedAt
      answer
    }
`
