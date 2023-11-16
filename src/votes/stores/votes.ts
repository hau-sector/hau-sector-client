import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import { usePropertiesStore } from '@/shared/stores/properties'
import type { Vote } from '@/votes/dto/vote'
import { useVotesService } from '@/votes/services/votes'

export const useVotesStore = createGlobalState(() => {
  const votes = shallowRef<Vote[]>([])

  const votesService = useVotesService()
  const { selectedId } = usePropertiesStore()
  const { result } = votesService.getVotes(selectedId)
  whenever(result, result => votes.value = result.votes)

  return {
    votes: shallowReadonly(votes),
  }
})
