import { describe, expect, it } from 'vitest'
import { IssueStatus } from '@/issues/constants/issue-status'

describe('issue-status', () => {
  it('should be define', () => {
    expect(IssueStatus).toBeDefined()
  })

  it('should be equal to value', () => {
    expect(IssueStatus.SENT).toStrictEqual('SENT')
    expect(IssueStatus.DONE).toStrictEqual('DONE')
    expect(IssueStatus.PROGRESS).toStrictEqual('PROGRESS')
  })
})
