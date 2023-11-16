import gql from 'graphql-tag'

export interface PaymentData {
  id: string
  value: number
  paid: boolean
  paidAt?: string
  userId: string
  __typename: 'PaymentDataObject'
}

export const PAYMENT_DATA = gql`
fragment PaymentData on PaymentDataObject {
  id
  value
  paid
  paidAt
  userId
}
`
