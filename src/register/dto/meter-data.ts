import gql from 'graphql-tag'
import type { MeterType } from '@/register/constants/meter-type'

export interface MeterData {
  id: string
  value: number
  accepted: boolean
  enteredAt: Date
  acceptedAt?: Date
  updatedAt?: Date
  type: MeterType
  userId: string
  __typename: 'MeterDataObject'
}

export const METER_DATA = gql`
    fragment MeterData on MeterDataObject {
      id
      value
      accepted
      enteredAt
      acceptedAt
      updatedAt
      userId
      type
    }
`
