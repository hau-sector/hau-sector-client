import gql from 'graphql-tag'

export interface VoteResult {
  voteId: string
  agree: number
  disagree: number
  avoid: number
  __typename: 'VoteResultObject'
}

export const VOTE_RESULT = gql`
    fragment VoteResult on VoteResultObject {
      voteId
      agree
      disagree
      avoid
    }
`
