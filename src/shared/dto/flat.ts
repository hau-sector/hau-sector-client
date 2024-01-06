import gql from 'graphql-tag'

export interface Flat {
  id: string
  flat: number
  building: {
    id: string
    street: string
    house: string
    __typename: 'BuildingObject'
  }
  __typename: 'FlatObject'
}

export const FLAT = gql`
  fragment Flat on FlatObject {
    id
    flat
    building {
      id
      street
      house
    }
  }
`
