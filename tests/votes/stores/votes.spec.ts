import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useVotesStore } from '@/votes/stores/votes'

const resultMock = ref()
vi.mock('@/votes/services/votes', () => ({
  useVotesService: () => ({
    getVotes: () => ({ result: resultMock }),
    setAnswer: () => ({}),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    buildingId: ref(''),
  }),
}))

describe('useVotesStore', () => {
  let votesStore: ReturnType<typeof useVotesStore>

  beforeEach(() => {
    votesStore = useVotesStore()
  })

  it('should return ref of votes array', () => {
    expect(votesStore.votes).toBeDefined()
    expect(isRef(votesStore.votes)).toBeTruthy()
    expect(Array.isArray(votesStore.votes.value)).toBeTruthy()
  })

  describe('votes', () => {
    it('should be empty array', () => {
      expect(votesStore.votes.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { votes: [{ id: 1 }] }
      await nextTick()

      expect(votesStore.votes.value).toStrictEqual([{ id: 1 }])
    })
  })
})
