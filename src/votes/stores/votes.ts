import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import { useFlatsStore } from '@/shared/stores/flats'
import type { Vote } from '@/votes/dto/vote'
import { useVotesService } from '@/votes/services/votes'

export const useVotesStore = createGlobalState(() => {
  const votes = shallowRef<Vote[]>([])

  const votesService = useVotesService()
  const { buildingId } = useFlatsStore()
  const { result } = votesService.getVotes(buildingId)
  whenever(result, result => votes.value = result.votes)

  return {
    votes: shallowReadonly(votes),
  }
})
