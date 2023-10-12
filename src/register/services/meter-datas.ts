import { faker } from '@faker-js/faker'
import { createGlobalState } from '@vueuse/core'
import moment from 'moment'
import type { MeterType } from '@/register/constants/meter-type'
import type { MeterData } from '@/register/dto/meter-data'

export const useMeterDatasService = createGlobalState(() => ({
  async getAll(type: MeterType, start: Date, end: Date): Promise<MeterData[]> {
    return Array.from(
      { length: moment(end).diff(start, 'months') },
      (_, i) => ({
        id: faker.string.uuid(),
        value: 10_000 + i * 220 + faker.number.float({ max: 100, precision: 0.001 }),
        accepted: true,
        entered_at: moment(start).add(i, 'months').toDate(),
        accepted_at: moment(start).add(i, 'months').toDate(),
        user_id: 'uuu',
      }),
    )
  },
}))
