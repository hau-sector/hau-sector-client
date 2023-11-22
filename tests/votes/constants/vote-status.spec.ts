import { describe, expect, it } from 'vitest'
import { VoteStatus } from '@/votes/constants/vote-status'

describe('vote-status', () => {
  it('should be define', () => {
    expect(VoteStatus).toBeDefined()
  })

  it('should be equal to value', () => {
    expect(VoteStatus.NEW).toStrictEqual('NEW')
    expect(VoteStatus.COMPLETED).toStrictEqual('COMPLETED')
  })
})
