import gql from 'graphql-tag'
import type { MeterType } from '@/register/constants/meter-type'

export interface MeterData {
  id: string
  value: number
  accepted: boolean
  enteredAt?: Date
  acceptedAt?: Date
  updatedAt?: Date
  userId: string
  type: MeterType
}

export const METER_DATA = gql`
    fragment MeterData on MeterDataObject {
      id
      value
      accepted
      entered_at
      accepted_at
      updated_at
      user_id
      type
    }
`
