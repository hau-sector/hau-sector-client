import type { MeterType } from '@/register/constants/meter-type'

export interface MeterData {
  id: string
  value: number
  accepted: boolean
  entered_at?: Date
  accepted_at?: Date
  updated_at?: Date
  user_id: string
  type: MeterType
}
