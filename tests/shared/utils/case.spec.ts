import { describe, expect, it } from 'vitest'
import { capCase } from '@/shared/utils/case'

describe('capCase', () => {
  it('should make first letter upper case', () => {
    const result = capCase('dmitriy')

    expect(result).toStrictEqual('Dmitriy')
  })

  it('should not throw when empty string passed', () => {
    expect(() => capCase('')).not.toThrow()
  })
})
