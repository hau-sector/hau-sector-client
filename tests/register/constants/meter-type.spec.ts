import { describe, expect, it } from 'vitest'
import { MeterType } from '@/register/constants/meter-type'

describe('meter-type', () => {
  it('should be define', () => {
    expect(MeterType).toBeDefined()
  })

  it ('should be equal to value', () => {
    expect(MeterType.GAS).toStrictEqual('GAS')
    expect(MeterType.ENERGY).toStrictEqual('ENERGY')
    expect(MeterType.WATER).toStrictEqual('WATER')
  })
})
