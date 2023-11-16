import gql from 'graphql-tag'

export interface Contact {
  id: string
  name: string
  surname: string
  avatar: string
  online: boolean
  flat: number
  __typename: 'ContactObject'
}

export const CONTACT = gql`
  fragment Contact on ContactObject {
    id
    name
    surname
    avatar
    online
    flat
  }
`
