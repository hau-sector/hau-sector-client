import { describe, expect, it } from 'vitest'
import { VoteAnswer } from '@/votes/constants/vote-answer'

describe('vote-answer', () => {
  it('should be define', () => {
    expect(VoteAnswer).toBeDefined()
  })

  it('should be equal to value', () => {
    expect(VoteAnswer.AVOID).toStrictEqual('AVOID')
    expect(VoteAnswer.AGREE).toStrictEqual('AGREE')
    expect(VoteAnswer.DISAGREE).toStrictEqual('DISAGREE')
  })
})
