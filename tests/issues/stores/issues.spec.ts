import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useIssuesStore } from '@/issues/stores/issues'

const resultMock = ref()
const mutateMock = vi.fn()

vi.mock('@/issues/services/issues', () => ({
  useIssueService: () => ({
    getIssues: () => ({ result: resultMock }),
    createIssue: () => ({ mutate: mutateMock }),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    buildingId: ref(''),
  }),
}))

describe('useIssuesStore', () => {
  let issuesStore: ReturnType<typeof useIssuesStore>

  beforeEach(() => {
    issuesStore = useIssuesStore()
  })

  it('should return ref of issues array', () => {
    expect(issuesStore.issues).toBeDefined()
    expect(isRef(issuesStore.issues)).toBeTruthy()
    expect(Array.isArray(issuesStore.issues.value)).toBeTruthy()
  })

  it('should return create function', () => {
    expect(issuesStore.create).toBeDefined()
    expect(issuesStore.create).toBeTypeOf('function')
  })

  describe('issues', () => {
    it('should be empty array', () => {
      expect(issuesStore.issues.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { issues: [{ id: 1 }] }
      await nextTick()

      expect(issuesStore.issues.value).toStrictEqual([{ id: 1 }])
    })
  })

  describe('create', () => {
    it('should add new issue to array', async () => {
      mutateMock.mockReturnValueOnce({ data: { createIssue: { id: 1 } } })
      await nextTick()

      expect(issuesStore.issues.value.at(0)).toStrictEqual({ id: 1 })
    })
  })
})
