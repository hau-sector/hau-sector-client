import gql from 'graphql-tag'

export interface User {
  id: string
  firstName: string
  lastName: string
  middleName: string
  avatar: string
  __typename: 'UserObject'
}

export const USER = gql`
  fragment User on UserObject {
    id
    firstName
    lastName
    middleName
    avatar
  }
`
