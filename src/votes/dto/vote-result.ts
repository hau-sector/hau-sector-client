import gql from 'graphql-tag'

export interface VoteResult {
  id: string
  agree: string
  disagree: string
  avoid: string
  __typename: 'VoteResultObject'
}

export const VOTE_RESULT = gql`
    fragment VoteResult on VoteResultObject {
      id
      agree
      disagree
      avoid
    }
`
