import type { MeterType } from '@/register/constants/meter-type'

export interface UpdateMeterData {
  value: number
  type: MeterType
}
