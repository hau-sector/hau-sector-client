import gql from 'graphql-tag'

export interface Property {
  id: string
  flat: number
  building: {
    street: string
    house: string
    __typename: 'BuildingObject'
  }
  __typename: 'FlatObject'
}

export const PROPERTY = gql`
  fragment Property on FlatObject {
    id
    flat
    building {
      street
      house
    }
  }
`
