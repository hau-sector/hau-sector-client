import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import { useFlatsStore } from '@/shared/stores/flats'
import type { Vote } from '@/votes/dto/vote'
import { useVotesService } from '@/votes/services/votes'
import type { VoteAnswer } from '@/votes/constants/vote-answer'

export const useVotesStore = createGlobalState(() => {
  const votes = shallowRef<Vote[]>([])

  const votesService = useVotesService()
  const { buildingId } = useFlatsStore()
  const { result } = votesService.getVotes(buildingId)
  whenever(result, result => votes.value = result.votes)

  const { mutate } = votesService.setAnswer()
  async function setAnswer(voteId: string, answer: VoteAnswer): Promise<void> {
    const result = await mutate({ voteId, answer })
    if (result?.data) {
      const index = votes.value.findIndex(({ id }) => id === voteId)
      votes.value = votes.value.toSpliced(index, 1, result.data.setAnswer)
    }
  }

  return {
    votes: shallowReadonly(votes),

    setAnswer,
  }
})
