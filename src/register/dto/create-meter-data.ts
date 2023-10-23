import type { MeterType } from '@/register/constants/meter-type'

export interface CreateMeterData {
  value: number
  type: MeterType
  buildingId: string
}
