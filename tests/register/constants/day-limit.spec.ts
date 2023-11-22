import { describe, expect, it } from 'vitest'
import { DayLimit } from '@/register/constants/day-limit'

describe('day-limit', () => {
  it('should be define', () => {
    expect(DayLimit).toBeDefined()
  })

  it('should be equal to value', () => {
    expect(DayLimit.INPUT).toStrictEqual(25)
    expect(DayLimit.PAYMENT).toStrictEqual(29)
  })
})
