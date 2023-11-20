import { describe, expect, it } from 'vitest'
import { faker } from '@/shared/utils/faker'

describe('faker', () => {
  it('should be loaded', () => {
    expect(faker).toBeDefined()
  })
})
